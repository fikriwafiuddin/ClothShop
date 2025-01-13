import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../../API_URL"

export const register = createAsyncThunk(
  "user/register",
  async ({ username, email, password, password2 }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/registerUser`, {
        username,
        email,
        password,
        password2,
      })
      localStorage.setItem("user-clothshop", response.data.token)
      return response.data.message
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/loginUser`, {
        email,
        password,
      })
      localStorage.setItem("user-clothshop", response.data.token)
      console.log(response.data)
      return response.data.message
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message)
    }
  }
)
