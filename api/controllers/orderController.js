import Order from "../models/OrderModel.js"
import User from "../models/userModel.js"

export const getMyOrders = async (req, res) => {
  const id = req.id
  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ message: "User not found" })

    const orders = await Order.find({ idUser: id }).populate(
      "orderItems.idProduct"
    )
    if (!orders) return res.status(404).json({ message: "No orders found" })

    return res.status(200).json({ message: "Orders found", orders })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "System error" })
  }
}

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    if (!orders) return res.status(404).json({ message: "No orders found" })

    return res.status(200).json({ message: "Orders found", orders })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "System error" })
  }
}

export const sendOrder = async (req, res) => {
  const orderId = req.params.orderId
  try {
    const order = await Order.findById(orderId)
    if (!order) return res.status(404).json({ message: "Order not found" })

    order.status = "shipped"
    await order.save()

    return res.status(200).json({ message: "Order shipped" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "System error" })
  }
}

export const deliveredOrder = async (req, res) => {
  const orderId = req.params.orderId
  try {
    const order = await Order.findById(orderId).populate("orderItems.idProduct")
    if (!order) return res.status(404).json({ message: "Order not found" })

    if (order.status !== "shipped")
      return res.status(400).json({ message: "Order not shipped" })

    order.status = "delivered"
    const updatedOrder = await order.save()

    return res
      .status(200)
      .json({ message: "Order delivered", order: updatedOrder })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "System error" })
  }
}
