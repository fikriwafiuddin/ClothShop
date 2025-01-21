import { createSlice } from "@reduxjs/toolkit"
import { addCart, deleteItemCart, getCart } from "../thunk/cartThunk"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoadingAdd: false,
    isLoadingGet: false,
    isLoadingDelete: false,
    message: null,
    error: null,
    cart: [],
  },
  extraReducers: (reducer) => {
    reducer
      .addCase(addCart.pending, (state) => {
        state.isLoadingAdd = true
      })
      .addCase(addCart.fulfilled, (state) => {
        state.isLoadingAdd = false
      })
      .addCase(addCart.rejected, (state) => {
        state.isLoadingAdd = false
      })
      .addCase(getCart.pending, (state) => {
        state.isLoadingGet = true
        state.cart = []
        state.error = null
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoadingGet = false
        state.cart = action.payload.cart
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoadingGet = false
        state.error = action.payload
      })
      .addCase(deleteItemCart.pending, (state) => {
        state.isLoadingDelete = true
      })
      .addCase(deleteItemCart.fulfilled, (state, action) => {
        state.isLoadingDelete = false
        state.cart = action.payload
      })
      .addCase(deleteItemCart.rejected, (state) => {
        state.isLoadingDelete = false
      })
  },
})

export default cartSlice.reducer
