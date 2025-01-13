import { createSlice } from "@reduxjs/toolkit"
import { login } from "../thunk/adminThunk"

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    error: null,
    success: null,
  },
  extraReducer: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.success = null
      })
      .addCase(login.fullfield, (state, action) => {
        state.isLoading = false
        state.success = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default adminSlice.reducer
