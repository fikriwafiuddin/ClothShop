import { createSlice } from "@reduxjs/toolkit"
import { login, verifyToken } from "../thunk/authThunk"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoadingLogin: false,
    isAuthenticated: false,
    isCheckingAuth: true,
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.isCheckingAuth = true
        state.isAuthenticated = false
      })
      .addCase(verifyToken.fulfilled, (state) => {
        state.isCheckingAuth = false
        state.isAuthenticated = true
      })
      .addCase(verifyToken.rejected, (state) => {
        state.isCheckingAuth = false
      })
      .addCase(login.pending, (state) => {
        state.isLoadingLogin = true
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoadingLogin = false
      })
      .addCase(login.rejected, (state) => {
        state.isLoadingLogin = false
      })
  },
})

export default authSlice.reducer
