import express from "express"
import { getProducts } from "./controllers/productController.js"
import {
  loginUser,
  registerUser,
  verifyUser,
} from "./controllers/userController.js"
import {
  addCart,
  deleteItemCart,
  getCart,
} from "./controllers/cartController.js"
import { verifyToken } from "./middleware/authMiddleware.js"
import {
  callbackPayment,
  getTransaction,
} from "./controllers/transactionController.js"
import { loginAdmin } from "./controllers/adminController.js"
import { getMyOrders, getOrders } from "./controllers/orderController.js"

const route = express()

// admin
route.post("/admin/login", loginAdmin)

// user
route.post("/loginUser", loginUser)
route.post("/registerUser", registerUser)

// verify
route.post("/verifyUser", verifyUser)

// order
route.get("/getMyOrders", verifyToken, getMyOrders)
route.get("/getOrders", getOrders)

// cart
route.post("/addCart", verifyToken, addCart)
route.get("/getCart", verifyToken, getCart)
route.delete("/deleteItemCart/:idProduct", verifyToken, deleteItemCart)

// product
route.get("/products", getProducts)

// transaction
route.post("/getTransaction", verifyToken, getTransaction)
route.post("/midtrans/callbackPayment", callbackPayment)

export default route
