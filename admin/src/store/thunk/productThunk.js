import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../../API_URL"

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products`)
      return response.data.products
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message)
    }
  }
)
