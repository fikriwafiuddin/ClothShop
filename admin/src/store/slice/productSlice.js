import { createSlice } from "@reduxjs/toolkit"
import {
  addProduct,
  deleteProduct,
  getProducts,
  restockProduct,
  updateProduct,
} from "../thunk/productThunk"

const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    isLoadingAddProduct: false,
    isLoadingDeleteProduct: false,
    isLoadingUpdateProduct: false,
    isLoadingRestockProduct: false,
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
      .addCase(addProduct.pending, (state) => {
        state.isLoadingAddProduct = true
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoadingAddProduct = false
        state.products = [...state.products, action.payload]
      })
      .addCase(addProduct.rejected, (state) => {
        state.isLoadingAddProduct = false
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoadingDeleteProduct = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoadingDeleteProduct = false
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        )
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoadingDeleteProduct = false
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoadingUpdateProduct = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoadingUpdateProduct = false
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        )
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isLoadingUpdateProduct = false
      })
      .addCase(restockProduct.pending, (state) => {
        state.isLoadingRestockProduct = true
      })
      .addCase(restockProduct.fulfilled, (state, action) => {
        state.isLoadingRestockProduct = false
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        )
      })
      .addCase(restockProduct.rejected, (state) => {
        state.isLoadingRestockProduct = false
      })
  },
})

export default productSlice.reducer
