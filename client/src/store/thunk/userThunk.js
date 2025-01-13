import { createSlice } from "@reduxjs/toolkit"
import { login, register } from "../slice/userSlice"

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    message: null,
    error: null,
  },
  extraReducers: (reducer) => {
    reducer
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.message = null
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ? action.payload : action.error.message
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.message = null
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ? action.payload : action.error.message
      })
  },
})

export default userSlice.reducer
