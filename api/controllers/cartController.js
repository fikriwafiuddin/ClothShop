import Product from "../models/productModels.js"
import User from "../models/userModel.js"

export const addCart = async (req, res) => {
  const { id: idProduct, quantity } = req.body
  const idUser = req.id
  try {
    if (!idProduct) return res.status(400).json({ message: "No id" })
    if (quantity <= 0)
      return res.status(400).json({ message: "Quantity is not valid" })

    const user = await User.findById(idUser)
    if (!user) return res.status(404).json({ message: "User not found" })

    const product = await Product.findById(idProduct)
    if (!product) return res.status(404).json({ message: "Product not found" })

    if (quantity > product.quantity)
      return res.status(400).json({ message: "Quantity exceeds stock" })

    const productInCart = user.cart.find(
      (value) => value.product.toString() == idProduct
    )
    if (!productInCart) {
      user.cart.push({ product: product._id, quantity })
    } else {
      productInCart.quantity += quantity
      if (productInCart.quantity > product.quantity) {
        return res.status(400).json({ message: "Quantity exceeds stock" })
      }
    }

    await user.save()
    return res.status(200).json({ message: "Product successfully added" })
  } catch (error) {
    console.log(error)
    return res.status(500).json("System error")
  }
}

export const getCart = async (req, res) => {
  const id = req.id
  try {
    const user = await User.findById(id).populate("cart.product")

    if (!user) return res.status(404).json({ message: "User not found" })

    const cart = user.cart.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }))

    return res
      .status(200)
      .json({ message: "Cart successfully retrieved", cart })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "System error" })
  }
}

export const deleteItemCart = async (req, res) => {
  const id = req.id
  const idProduct = req.params.idProduct
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $pull: {
          cart: { product: idProduct },
        },
      },
      { new: true }
    ).populate("cart.product")
    if (!user) return res.status(404).json({ message: "User not found" })

    return res
      .status(200)
      .json({ message: "Product successfully removed", cart: user.cart })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "System error" })
  }
}
