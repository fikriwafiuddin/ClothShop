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
