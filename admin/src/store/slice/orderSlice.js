import { createSlice } from "@reduxjs/toolkit"
import { getOrders } from "../thunk/orderThunk"

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    defaultOrders: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    sortOrders: (state, action) => {
      const { key, order } = action.payload // `key` untuk kolom, `order` bisa "asc" atau "desc"
      state.orders = state.orders.sort((a, b) => {
        console.log(a)
        if (order === "asc") {
          return a[key] > b[key] ? 1 : -1
        }
        return a[key] < b[key] ? 1 : -1
      })
    },
    filterOrders: (state, action) => {
      const filter = action.payload.filter
      if (filter !== "all")
        state.orders = state.defaultOrders.filter(
          (order) => order.status === filter
        )
      else state.orders = state.defaultOrders
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.orders = []
        state.defaultOrders = []
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload
        state.defaultOrders = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { sortOrders, filterOrders } = orderSlice.actions
export default orderSlice.reducer
