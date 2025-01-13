import productReducer from "./slice/productSlice"
import { configureStore } from "@reduxjs/toolkit"
import adminReducer from "./slice/adminSlice"
import orderReducer from "./slice/orderSlice"

const store = configureStore({
  reducer: {
    product: productReducer,
    admin: adminReducer,
    order: orderReducer,
  },
})

export default store
