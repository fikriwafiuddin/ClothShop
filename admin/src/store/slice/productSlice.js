import { createSlice } from "@reduxjs/toolkit"
import { getProducts } from "../thunk/productThunk"

const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    products: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
        state.products = []
        state.error = null
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default productSlice.reducer
