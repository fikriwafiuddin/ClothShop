import PropTypes from "prop-types"

const OrderDetails = ({ order }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">Order ID: {order._id}</h2>

      {/* Alamat Pengiriman */}
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

      {/* Daftar Item Pesanan */}
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

      {/* Jumlah Total dan Status */}
      <section className="mb-6">
        <p className="text-lg font-semibold">
          <strong>Total Amount:</strong> Rp {order.amount.toLocaleString()}
        </p>
        <p
          className={`text-lg font-semibold ${
            order.status === "pending" ? "text-yellow-500" : "text-green-500"
          }`}
        >
          <strong>Status:</strong> {order.status}
        </p>
      </section>

      {/* Tanggal Pemesanan */}
      <section>
        <p className="text-sm text-gray-500">
          <strong>Order Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </section>
    </div>
  )
}

// Komponen untuk menampilkan daftar pesanan

OrderDetails.propTypes = {
  order: PropTypes.object.isRequired,
}

export default OrderDetails
