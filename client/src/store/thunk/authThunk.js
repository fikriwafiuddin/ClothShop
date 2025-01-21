import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../../API_URL"
import { toast } from "react-toastify"

const token = localStorage.getItem("user-clothshop")
const headers = {
  Authorization: `Bearer ${token}`,
}

export const verifyToken = createAsyncThunk("auth/verifyToken", async () => {
  try {
    await axios.post(`${API_URL}/verifyUser`, {}, { headers })
  } catch (error) {
    if (error.response.data.message == "Invalid token")
      localStorage.removeItem("user-clothshop")
    console.log(error)
  }
})

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/loginUser`, {
        email,
        password,
      })
      localStorage.setItem("user-clothshop", response.data.token)
      toast.success(response.data.message, {
        onClose: () => {
          window.location.href = "/"
        },
      })
    } catch (error) {
      alert(error.response.data.message)
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password, password2 }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/registerUser`, {
        username,
        email,
        password,
        password2,
      })
      localStorage.setItem("user-clothshop", response.data.token)
      toast.success(response.data.message, {
        onClose: () => {
          window.location.href = "/"
        },
      })
    } catch (error) {
      alert(error.response.data.message)
      return rejectWithValue(error.response.data.message)
    }
  }
)
