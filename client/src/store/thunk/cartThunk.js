import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../../API_URL"
import { toast } from "react-toastify"

const token = localStorage.getItem("user-clothshop")

const headers = {
  Authorization: `Bearer ${token}`,
}

export const addCart = createAsyncThunk(
  "cart/addCart",
  async ({ id, quantity }) => {
    try {
      const response = await axios.post(
        `${API_URL}/addCart`,
        { id, quantity },
        { headers }
      )
      toast.success(response.data.message, {
        position: "top-center",
      })
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      })
    }
  }
)

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getCart`, { headers })
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const deleteItemCart = createAsyncThunk(
  "cart/deleteItemCart",
  async ({ id }) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteItemCart/${id}`, {
        headers,
      })
      toast.success(response.data.message, {
        position: "top-center",
      })
      return response.data.cart
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      })
    }
  }
)
