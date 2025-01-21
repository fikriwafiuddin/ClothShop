import { useEffect } from "react"
import MainLayout from "../layouts/MainLayout"
import { useDispatch, useSelector } from "react-redux"
import { getOrders } from "../store/thunk/orderThunk"
import Table from "../components/Table"
import Spinner from "../components/Spinner"
import Icons from "../components/Icons"
import axios from "axios"
import { API_URL } from "../../API_URL"
import { useState } from "react"
import { filterOrders, sortOrders } from "../store/slice/orderSlice"

function Orders() {
  const { isLoading, error, orders } = useSelector((state) => state.order)
  const [isSelectedFilter, setIsSelectedFilter] = useState("all")
  const dispatch = useDispatch()

  const handleSort = () => {
    dispatch(sortOrders({ key: "createdAt", order: "asc" }))
  }

  const token = localStorage.getItem("admin-clothshop")
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const handleSendOrder = (id) => {
    axios
      .patch(`${API_URL}/sendOrder/${id}`, {}, { headers })
      .then(() => dispatch(getOrders()))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  const handleFilter = (filter) => {
    setIsSelectedFilter(filter)
    dispatch(filterOrders({ filter }))
  }

  const filterStatus = [
    "all",
    "pending",
    "paid",
    "shipped",
    "delivered",
    "failed",
  ]

  const colorStatus = (status) => {
    let color
    switch (status) {
      case "delivered":
        color = "text-green-500"
        break
      case "pending":
        color = "text-yellow-500"
        break
      case "failed":
        color = "text-red-500"
        break
      case ("shipped", "paid"):
        color = "text-blue-500"
        break
    }

    return color
  }

  const config = [
    {
      label: "Order ID",
      render: (data) => data._id,
    },
    {
      label: "Amount",
      render: (data) => `Rp ${data.amount.toLocaleString()}`,
    },
    {
      label: "Status",
      render: (data) => (
        <span className={colorStatus(data.status)}>{data.status}</span>
      ),
    },
    {
      label: (
        <span className="flex items-center">
          Date
          <button type="button" onClick={handleSort}>
            <Icons name="arrow-down" size="size-5" />
          </button>
        </span>
      ),
      render: (data) => new Date(data.createdAt).toLocaleString(),
    },
    {
      label: "Action",
      render: (data) => (
        <>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Reject
          </button>
          {data.status == "paid" && (
            <button
              onClick={() => handleSendOrder(data._id)}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Send
            </button>
          )}
        </>
      ),
    },
  ]
  return (
    <MainLayout title="Orders">
      <div className="flex justify-between">
        <div className="flex">
          {filterStatus.map((value) => (
            <button
              onClick={() => handleFilter(value)}
              key={value}
              type="button"
              className={`${
                isSelectedFilter == value
                  ? "text-blue-700 bg-gray-100"
                  : "text-gray-900 bg-white"
              } py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
            >
              {value
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <form className="max-w-sm">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>year</option>
              <option value="US">2024</option>
              <option value="CA">2025</option>
            </select>
          </form>
          <form className="max-w-sm">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>months</option>
              <option value="US">January</option>
              <option value="CA">February</option>
              <option value="FR">March</option>
              <option value="DE">April</option>
              <option value="DE">May</option>
              <option value="DE">June</option>
              <option value="DE">July</option>
              <option value="DE">August</option>
              <option value="DE">September</option>
              <option value="DE">October</option>
              <option value="DE">November</option>
              <option value="DE">December</option>
            </select>
          </form>
          <form className="max-w-sm">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="US">24 hours</option>
              <option value="CA">1 week</option>
              <option value="FR">1 month</option>
              <option value="DE">6 moths</option>
              <option value="DE">12 moths</option>
              <option value="DE">All</option>
            </select>
          </form>
        </div>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        orders && <Table data={orders} config={config} />
      )}
      {!error && orders.length == 0 && (
        <p className="text-center text-xl text-gray-600 mt-5">
          Orders not found
        </p>
      )}
      {error && <div>{error}</div>}
    </MainLayout>
  )
}

export default Orders
