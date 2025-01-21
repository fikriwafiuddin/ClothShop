import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { deliveredOrder } from "../store/thunk/orderThunk"

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch()

  const handleDelivered = () => {
    dispatch(deliveredOrder(order._id))
  }

  const colorStatus = (status) => {
    let color
    switch (status) {
      case "pending":
        color = "text-yellow-500"
        break
      case "failed":
        color = "text-red-500"
        break
      case "delivered":
      case "shipped":
      case "paid":
        color = "text-green-500"
        break
    }

    return color
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">Order ID: {order._id}</h2>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
        <p>
          <strong>Email:</strong> {order.address.email}
        </p>
        <p>
          <strong>Name:</strong> {order.address.first_name}{" "}
          {order.address.last_name}
        </p>
        <p>
          <strong>Phone:</strong> {order.address.phone}
        </p>
        <p>
          <strong>Address:</strong> {order.address.streat}, {order.address.city}
          ,{order.address.state}, {order.address.zip}, {order.address.country}
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Order Items</h3>
        <div className="space-y-4">
          {order.orderItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 border-b pb-4"
            >
              <img
                src={item.idProduct.image}
                alt={item.idProduct.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <p className="text-lg font-medium">{item.idProduct.name}</p>
                <p>Price: Rp {item.idProduct.price.toLocaleString()}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6 flex justify-between">
        <div>
          <p className="text-lg font-semibold">
            <strong>Total Amount:</strong> Rp {order.amount.toLocaleString()}
          </p>
          <p className={`text-lg font-semibold ${colorStatus(order.status)}`}>
            <strong>Status:</strong> {order.status}
          </p>
        </div>
        {order.status === "shipped" && (
          <button
            onClick={handleDelivered}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Delivered
          </button>
        )}
      </section>

      <section>
        <p className="text-sm text-gray-500">
          <strong>Order Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </section>
    </div>
  )
}

OrderDetails.propTypes = {
  order: PropTypes.object.isRequired,
}

export default OrderDetails
