import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import OrderDetails from "../components/OrderDetails"
import { useEffect } from "react"
import Spinner from "../components/Spinner"
import { useDispatch, useSelector } from "react-redux"
import { getOrders } from "../store/thunk/orderThunk"

function MyOrder() {
  const { isLoadingGet, orders, error } = useSelector((state) => state.order)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])
  console.log(orders)

  const OrderList = () => {
    const reversedOrders = [...orders].reverse()
    return (
      <div>
        {reversedOrders.map((order) => (
          <OrderDetails key={order._id} order={order} />
        ))}
      </div>
    )
  }
  return (
    <>
      <Header />
      <main className="px-4">
        <div className="relative max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute top-2 left-2 border-2 rounded px-2 py-1"
          >
            {"<"} Back
          </button>
          <h1 className="text-3xl font-bold text-center my-6">My Orders</h1>
          <p>{error && error}</p>
          {isLoadingGet && <Spinner />}
          {orders && <OrderList />}
          {orders?.length === 0 && (
            <p className="text-center text-gray-500 text-xl">No orders found</p>
          )}
        </div>
      </main>
    </>
  )
}

export default MyOrder
