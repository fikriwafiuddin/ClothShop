import express from "express"
import {
  addProduct,
  deleteProduct,
  getProducts,
  restockProduct,
  updateProduct,
} from "./controllers/productController.js"
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
import { loginAdmin, verifyAdmin } from "./controllers/adminController.js"
import {
  deliveredOrder,
  getMyOrders,
  getOrders,
  sendOrder,
} from "./controllers/orderController.js"
import { verifyTokenAdmin } from "./middleware/adminMiddleware.js"

const route = express()

// admin
route.post("/admin/login", loginAdmin)

// user
route.post("/loginUser", loginUser)
route.post("/registerUser", registerUser)

// verify
route.post("/verifyUser", verifyUser)
route.post("/verifyAdmin", verifyAdmin)

// order
route.get("/getMyOrders", verifyToken, getMyOrders)
route.get("/getOrders", verifyTokenAdmin, getOrders)
route.patch("/sendOrder/:orderId", verifyTokenAdmin, sendOrder)
route.patch("/deliveredOrder/:orderId", verifyToken, deliveredOrder)

// cart
route.post("/addCart", verifyToken, addCart)
route.get("/getCart", verifyToken, getCart)
route.delete("/deleteItemCart/:idProduct", verifyToken, deleteItemCart)

// product
route.get("/products", getProducts)
route.post("/addProduct", verifyTokenAdmin, addProduct)
route.delete("/deleteProduct/:productId", verifyTokenAdmin, deleteProduct)
route.patch("/updateProduct/:productId", verifyTokenAdmin, updateProduct)
route.patch("/restockProduct/:productId", verifyTokenAdmin, restockProduct)

// transaction
route.post("/getTransaction", verifyToken, getTransaction)
route.post("/midtrans/callbackPayment", callbackPayment)

export default route
