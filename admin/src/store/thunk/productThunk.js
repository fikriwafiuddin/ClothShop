import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../../API_URL"

const token = localStorage.getItem("admin-clothshop")
const headers = {
  Authorization: `Bearer ${token}`,
}

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products`, { headers })
      return response.data.products
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async ({ image, name, price, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/addProduct`,
        {
          image,
          name,
          price,
          quantity,
        },
        { headers }
      )
      alert(response.data.message)
      return response.data.newProduct
    } catch (error) {
      alert(error.response.data.message)
      console.log(error)
      rejectWithValue(error.response.data.message)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id }) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteProduct/${id}`, {
        headers,
      })
      alert(response.data.message)
      return response.data.product
    } catch (error) {
      alert(error.response.data.message)
    }
  }
)

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, image, name, price, quantity }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/updateProduct/${id}`,
        {
          image,
          name,
          price,
          quantity,
        },
        { headers }
      )
      alert(response.data.message)
      return response.data.updatedProduct
    } catch (error) {
      alert(error.response.data.message)
      console.log(error)
    }
  }
)

export const restockProduct = createAsyncThunk(
  "product/restockProduct",
  async ({ id, quantity }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/restockProduct/${id}`,
        {
          quantity,
        },
        { headers }
      )
      alert(response.data.message)
      return response.data.updatedProduct
    } catch (error) {
      alert(error.response.data.message)
    }
  }
)
