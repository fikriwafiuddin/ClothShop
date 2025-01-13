import { useEffect } from "react"
import MainLayout from "../layouts/MainLayout"
import { useDispatch, useSelector } from "react-redux"
import { getOrders } from "../store/thunk/orderThunk"
import Table from "../components/Table"
import Spinner from "../components/Spinner"
import { useState } from "react"
import Icons from "../components/Icons"

function Orders() {
  const { isLoading, error, orders, sortOrders } = useSelector(
    (state) => state.order
  )
  const dispatch = useDispatch()

  const handleSort = () => {
    dispatch(sortOrders({ key: "createdAt", order: "asc" }))
  }

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

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
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            All
          </button>
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Pending
          </button>
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Paid
          </button>
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Shipped
          </button>
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Delivered
          </button>
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Failed
          </button>
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
      {error && <div>{error}</div>}
    </MainLayout>
  )
}

export default Orders
