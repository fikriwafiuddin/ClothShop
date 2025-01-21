import { createSlice } from "@reduxjs/toolkit"
import { login, register, verifyToken } from "../thunk/authThunk"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isAuthenticating: true,
    isLoadingLogin: false,
    isLoadingRegister: false,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      localStorage.removeItem("user-clothshop")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.isAuthenticating = true
      })
      .addCase(verifyToken.fulfilled, (state) => {
        state.isAuthenticated = true
        state.isAuthenticating = false
      })
      .addCase(verifyToken.rejected, (state) => {
        state.isAuthenticating = false
      })
      .addCase(login.pending, (state) => {
        state.isLoadingLogin = true
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoadingLogin = false
        state.isAuthenticated = true
        state.isAuthenticating = false
      })
      .addCase(login.rejected, (state) => {
        state.isLoadingLogin = false
      })
      .addCase(register.pending, (state) => {
        state.isLoadingRegister = true
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoadingRegister = false
        state.isAuthenticated = true
        state.isAuthenticating = false
      })
      .addCase(register.rejected, (state) => {
        state.isLoadingRegister = false
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
