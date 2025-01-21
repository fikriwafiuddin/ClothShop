import productReducer from "./slice/productSlice"
import { configureStore } from "@reduxjs/toolkit"
import orderReducer from "./slice/orderSlice"
import authReducer from "./slice/authSlice"

const store = configureStore({
  reducer: {
    product: productReducer,
    order: orderReducer,
    auth: authReducer,
  },
})

export default store
