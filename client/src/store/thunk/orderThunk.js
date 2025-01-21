import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"
import { API_URL } from "../../../API_URL"

const token = localStorage.getItem("user-clothshop")
const headers = {
  Authorization: `Bearer ${token}`,
}

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getMyOrders`, { headers })
      return response.data
    } catch (error) {
      console.log(error)
      rejectWithValue(error.response.data.message)
    }
  }
)

export const deliveredOrder = createAsyncThunk(
  "order/deliveredOrder",
  async (orderId) => {
    try {
      const response = await axios.patch(
        `${API_URL}/deliveredOrder/${orderId}`,
        {},
        { headers }
      )
      toast.success(response.data.message)
      return response.data
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
)
