import { createAsyncThunk } from "@reduxjs/toolkit"
import { API_URL } from "../../../API_URL"
import axios from "axios"

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products`)
      return response.data.products
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response.data.message)
    }
  }
)
