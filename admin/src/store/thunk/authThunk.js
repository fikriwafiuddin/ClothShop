import { createAsyncThunk } from "@reduxjs/toolkit"
import { API_URL } from "../../../API_URL"
import axios from "axios"

const token = localStorage.getItem("admin-clothshop")
const headers = {
  Authorization: `Bearer ${token}`,
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/admin/login`, {
        email,
        password,
      })
      alert(response.data.message)
      localStorage.setItem("admin-clothshop", response.data.token)
      return response.data.message
    } catch (error) {
      alert(error.response.data.message)
      console.log(error)
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/verifyAdmin`, {}, { headers })
      return true
    } catch (error) {
      console.log(error)
      if (error.response.data.message == "Invalid token") {
        localStorage.removeItem("admin-clothshop")
        return rejectWithValue(false)
      }
    }
  }
)
