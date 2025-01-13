import { createSlice } from "@reduxjs/toolkit"
import { getProducts } from "../slice/productSlice"

const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    products: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.products = []
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
        state.error = null
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ? action.payload : action.error.message
        state.products = []
      })
  },
})

export default productSlice.reducer
