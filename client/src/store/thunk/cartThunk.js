import { createSlice } from "@reduxjs/toolkit"
import { addCart, deleteItemCart, getCart } from "../slice/cartSlice"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    isLoadingDelete: false,
    message: null,
    error: null,
    cart: null,
  },
  extraReducers: (reducer) => {
    reducer
      .addCase(addCart.pending, (state) => {
        state.isLoading = true
        state.message = null
        state.error = null
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(addCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true
        state.cart = null
        state.error = null
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.cart = action.payload.cart
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(deleteItemCart.pending, (state) => {
        state.isLoadingDelete = true
        state.message = null
        state.error = null
      })
      .addCase(deleteItemCart.fulfilled, (state, action) => {
        state.isLoadingDelete = false
        state.message = action.payload.message
        state.cart = action.payload.cart
      })
      .addCase(deleteItemCart.rejected, (state, action) => {
        state.isLoadingDelete = false
        state.error = action.payload
      })
  },
})

export default cartSlice.reducer
