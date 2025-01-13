import generateSHA512Hash from "../helpers/generateSHA512Hash.js"
import Order from "../models/OrderModel.js"
import Product from "../models/productModels.js"
import User from "../models/userModel.js"
import midtransClient from "midtrans-client"

export const getTransaction = async (req, res) => {
  const id = req.id
  const {
    first_name,
    last_name,
    email,
    phone,
    streat,
    city,
    state,
    zip,
    country,
  } = req.body
  try {
    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone ||
      !streat ||
      !city ||
      !state ||
      !zip ||
      !country
    ) {
      return res.status(400).json({ message: "Please fill all the fields" })
    }

    const user = await User.findById(id).populate("cart.product")
    if (!user) return res.status(404).json({ message: "User not found" })

    const cart = user.cart // get the cart from the user

    // get amount from cart
    const amount = cart.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)

    // create order
    const order = await Order.create({
      idUser: id,
      address: {
        first_name,
        last_name,
        email,
        phone,
        streat,
        city,
        state,
        zip,
        country,
      },
      orderItems: cart.map((item) => {
        return {
          idProduct: item.product._id,
          quantity: item.quantity,
        }
      }),
      amount,
    })

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    })

    const item_details = cart.map((item) => {
      return {
        id: item.product._id,
        price: item.product.price,
        quantity: item.quantity,
        name: item.product.name,
      }
    })

    let parameter = {
      transaction_details: {
        order_id: order._id,
        gross_amount: amount,
      },
      credit_card: {
        secure: true,
      },
      item_details,
      customer_details: {
        first_name,
        last_name,
        email,
        phone,
      },
    }
    const token = await snap.createTransactionToken(parameter) // create token
    return res.status(200).json({ message: "Transaction created", token })
  } catch (error) {
    console.log(error)
    return res.status(500).json("Sytem error")
  }
}

export const callbackPayment = async (req, res) => {
  try {
    const data = req.body
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    })

    const response = await snap.transaction.notification(data)
    const orderId = response.order_id
    const statusCode = response.status_code
    const grossAmount = response.gross_amount
    const transactionStatus = response.transaction_status
    const signatureKey = response.signature_key

    const hashKey = generateSHA512Hash(
      orderId + statusCode + grossAmount + process.env.SERVER_KEY
    )
    if (hashKey !== signatureKey)
      return res.status(403).json({ message: "Unauthorized" })

    const order = await Order.findById(orderId)
      .populate("idUser")
      .populate("orderItems.idProduct")
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    const orderItems = order.orderItems

    if (transactionStatus == "capture" || transactionStatus == "settlement") {
      for (const product of orderItems) {
        await Product.findByIdAndUpdate(product.idProduct, {
          $inc: { quantity: -product.quantity },
        })
      }

      const updateUser = await User.findByIdAndUpdate(
        order.idUser,
        { $set: { cart: [] } },
        { new: true }
      )

      order.status = "paid"
      await order.save()
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      order.status = "failed"
      await order.save()
    }

    return res.status(200).json({ status: "Success", message: "OK" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "System error" })
  }
}
