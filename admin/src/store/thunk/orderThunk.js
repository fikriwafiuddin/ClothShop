import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../../API_URL"

const token = localStorage.getItem("admin-clothshop")
const headers = {
  Authorization: `Bearer ${token}`,
}

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const respone = await axios.get(`${API_URL}/getOrders`, { headers })
      return respone.data.orders
    } catch (error) {
      return rejectWithValue(error.respone.data.messaga)
    }
  }
)
