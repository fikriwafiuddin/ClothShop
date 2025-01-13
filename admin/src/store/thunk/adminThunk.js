import { createAsyncThunk } from "@reduxjs/toolkit"
import { API_URL } from "../../../API_URL"
import axios from "axios"

export const login = createAsyncThunk(
  "admin/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/admin/login`, {
        email,
        password,
      })
      return response.data.message
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message)
    }
  }
)
