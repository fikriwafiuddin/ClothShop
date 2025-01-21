import { createSlice } from "@reduxjs/toolkit"
import { deliveredOrder, getOrders } from "../thunk/orderThunk"

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: null,
    error: null,
    isLoadingDelivered: false,
    isLoadingGet: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deliveredOrder.pending, (state) => {
        state.isLoadingDelivered = true
      })
      .addCase(deliveredOrder.fulfilled, (state, action) => {
        state.isLoadingDelivered = false
        state.orders = state.orders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order
        )
      })
      .addCase(deliveredOrder.rejected, (state) => {
        state.isLoadingDelivered = false
      })
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoadingGet = true
        state.error = null
        state.orders = null
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoadingGet = false
        state.orders = action.payload.orders
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoadingGet = false
        state.error = action.payload
      })
  },
})

export default orderSlice.reducer
