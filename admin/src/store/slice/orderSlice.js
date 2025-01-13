import { createSlice } from "@reduxjs/toolkit"
import { getOrders } from "../thunk/orderThunk"

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    sortOrders: (state, action) => {
      const { key, order } = action.payload // `key` untuk kolom, `order` bisa "asc" atau "desc"
      state.orders = state.orders.sort((a, b) => {
        if (order === "asc") {
          return a[key] > b[key] ? 1 : -1
        }
        return a[key] < b[key] ? 1 : -1
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.orders = []
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { sortOrders } = orderSlice.actions
export default orderSlice.reducer
