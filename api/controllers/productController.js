import Product from "../models/productModels.js"

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    if (!products)
      return res.status(404).json({ message: "Products not found" })

    return res.status(200).json({ message: "Success", products })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "System error" })
  }
}

export const addProduct = async (req, res) => {
  const { name, price, image, quantity } = req.body
  try {
    if (!name || !price || !image || !quantity)
      return res.status(400).json({ message: "Please fill all fields" })

    const product = await Product.findOne({ name })
    if (product)
      return res.status(400).json({ message: "Product already exists" })

    const checkPrice = () => {
      const regex = /^[0-9]+$/
      return regex.test(price)
    }
    if (!checkPrice)
      return res.status(400).json({ message: "Price must be a number" })

    const checkQuantity = () => {
      const regex = /^[0-9]+$/
      return regex.test(quantity)
    }
    if (!checkQuantity)
      return res.status(400).json({ message: "Quantity must be a number" })

    const priceToInt = parseInt(price)
    const quantityToInt = parseInt(quantity)

    if (priceToInt < 0)
      return res
        .status(400)
        .json({ message: "Price cannot be less than or equal to 0" })
    if (quantityToInt < 0)
      return res
        .status(400)
        .json({ message: "Quantity cannot be less than or equal to 0" })

    const newProduct = await Product.create({
      name,
      price: priceToInt,
      image,
      quantity: quantityToInt,
    })

    return res.status(200).json({ message: "Success add product", newProduct })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "System error" })
  }
}

export const deleteProduct = async (req, res) => {
  const productId = req.params.productId
  try {
    const product = await Product.findByIdAndDelete(productId)
    if (!product) return res.status(404).json({ message: "Product not found" })

    return res.status(200).json({ message: "Success delete product", product })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "System error" })
  }
}

export const updateProduct = async (req, res) => {
  const productId = req.params.productId
  const { name, price, image, quantity } = req.body
  try {
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: "Product not found" })

    if (price) {
      const checkPrice = () => {
        const regex = /^[0-9]+$/
        return regex.test(price)
      }
      if (!checkPrice)
        return res.status(400).json({ message: "Price must be a number" })

      const priceToInt = parseInt(price)
      if (priceToInt < 0)
        return res
          .status(400)
          .json({ message: "Price cannot be less than or equal to 0" })
    }

    if (quantity) {
      const checkQuantity = () => {
        const regex = /^[0-9]+$/
        return regex.test(quantity)
      }
      if (!checkQuantity)
        return res.status(400).json({ message: "Quantity must be a number" })

      const quantityToInt = parseInt(quantity)
      if (quantityToInt < 0)
        return res
          .status(400)
          .json({ message: "Quantity cannot be less than or equal to 0" })
    }

    product.name = name || product.name
    product.price = price || product.price
    product.image = image || product.image
    product.quantity = quantity || product.quantity

    const updatedProduct = await product.save()
    return res
      .status(200)
      .json({ message: "Success update product", updatedProduct })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "System error" })
  }
}

export const restockProduct = async (req, res) => {
  const productId = req.params.productId
  const quantity = req.body.quantity
  try {
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: "Product not found" })

    const checkQuantity = () => {
      const regex = /^[0-9]+$/
      return regex.test(quantity)
    }
    if (!checkQuantity)
      return res.status(400).json({ message: "Quantity must be a number" })

    const quantityToInt = parseInt(quantity)
    if (quantityToInt < 0)
      return res
        .status(400)
        .json({ message: "Quantity cannot be less than or equal to 0" })

    product.quantity += quantityToInt
    const updatedProduct = await product.save()

    return res
      .status(200)
      .json({ message: "Success restock product", updatedProduct })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "System error" })
  }
}
