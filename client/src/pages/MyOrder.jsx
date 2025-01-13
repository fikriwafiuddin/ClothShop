import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import OrderDetails from "../components/OrderDetails"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import Spinner from "../components/Spinner"
import { API_URL } from "../../API_URL"

function MyOrder() {
  const navigate = useNavigate()
  const token = localStorage.getItem("user-clothshop")
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!token) navigate("/")

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const fetchOrder = async () => {
      setLoading(true)
      setError(null)
      setOrders([])
      try {
        const response = await axios.get(`${API_URL}/getMyOrders`, { headers })
        setOrders(response.data.orders)
      } catch (error) {
        setError(error.response.data.message)
      }
      setLoading(false)
    }
    fetchOrder()
  }, [token])

  const OrderList = () => {
    return (
      <div>
        {orders.map((order) => (
          <OrderDetails key={order._id} order={order} />
        ))}
      </div>
    )
  }
  return (
    <>
      <Header />
      <main className="px-4">
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-center my-6">My Orders</h1>
          <p>{error && error}</p>
          {loading && <Spinner />}
          {orders && <OrderList />}
        </div>
      </main>
    </>
  )
}

export default MyOrder
