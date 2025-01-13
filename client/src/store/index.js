import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./thunk/productsThunk"
import userReducer from "./thunk/userThunk"
import cartReducer from "./thunk/cartThunk"

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
  },
})

export default store
