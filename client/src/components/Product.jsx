import PropTypes from "prop-types"
import formatCurrency from "../helpers/formatCurrency"

function Product({ product, handleClick }) {
  return (
    <div className="group relative block overflow-hidden">
      <img
        src={`${product.image}`}
        alt=""
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />

      <div className="relative border border-gray-100 bg-white p-6">
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          {product.name}
        </h3>

        <p className="mt-1.5 text-sm text-gray-700">
          IDR {formatCurrency(product.price)}
        </p>
        <button
          onClick={() => handleClick(product)}
          className="block mt-4 w-full rounded text-white bg-teal-600 p-4 text-sm font-medium transition hover:scale-105"
        >
          Buy
        </button>
      </div>
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  handleClick: PropTypes.func,
}

export default Product
