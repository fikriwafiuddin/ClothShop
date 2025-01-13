import connectDB from "./utils/db.js"
import Product from "./models/productModels.js"
import "dotenv/config"
import Order from "./models/OrderModel.js"
import Admin from "./models/adminModel.js"
import bcrypt from "bcrypt"

connectDB()

const products = [
  {
    image:
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Black Shirt",
    price: 100000,
    quantity: 10,
  },
  {
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "White Neck",
    price: 150000,
    quantity: 20,
  },
  {
    image:
      "https://images.unsplash.com/photo-1618354691229-88d47f285158?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Black Shirt",
    price: 75000,
    quantity: 30,
  },
  {
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHNoaXJ0JTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    name: "White Shirt",
    price: 50000,
    quantity: 15,
  },
  {
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
    name: "Jacket",
    price: 200000,
    quantity: 13,
  },
  {
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Brown Jacket",
    price: 200000,
    quantity: 17,
  },
]

// Product.insertMany(products)
//   .then((res) => console.log({ message: "Success", res }))
//   .catch((err) => console.log(err))

// Product.deleteMany()
//   .then((res) => console.log({ message: "Success deleta all products", res }))
//   .catch((err) => console.log(err))

// Order.deleteMany()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err))

Admin.create({
  name: "Admin",
  email: "admin@gmail.com",
  password: bcrypt.hashSync("admin123", 10),
})
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
