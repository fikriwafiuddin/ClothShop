import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./thunk/productsThunk"
import cartReducer from "./slice/cartSlice"
import authReducer from "./slice/authSlice"
import orderReducer from "./slice/orderSlice"

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
  },
})

export default store
