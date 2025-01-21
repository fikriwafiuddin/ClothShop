import PropTypes from "prop-types"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { addCart } from "../store/thunk/cartThunk"
import formatCurrency from "../helpers/formatCurrency"

function AddCart({ product, handleClose }) {
  const [quantity, setQuantity] = useState(1)
  const { isLoadingAdd } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    if (e.target.value >= 1 && e.target.value <= product.quantity)
      setQuantity(e.target.value)
  }
  const handleIncrement = () => {
    if (quantity < product.quantity) setQuantity(() => quantity + 1)
  }
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(() => quantity - 1)
  }

  const handleAddCart = () => {
    dispatch(addCart({ id: product._id, quantity }))
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 flex justify-center items-center z-10">
      <div className="bg-white rounded px-2 pt-2 pb-6 relative">
        <button
          type="button"
          className="absolute top-2 right-2 box-border text-gray-600 rounded-full"
          onClick={() => handleClose(null)}
        >
          <div className="relative z-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
            <div className="bg-white w-2 h-2 absolute top-2 right-2 -z-10"></div>
          </div>
        </button>
        <img
          className="size-64 rounded"
          src={product.image}
          alt={product.name}
        />
        <div className="flex justify-between mt-1">
          <h2 className="font-bold text-lg">{product.name}</h2>
          <h3>IDR {formatCurrency(product.price)}</h3>
        </div>
        <div>
          <label htmlFor="Quantity" className="sr-only">
            {" "}
            Quantity{" "}
          </label>

          <div className="flex justify-between gap-2 items-center rounded mt-3">
            <button
              onClick={handleDecrement}
              type="button"
              className="size-10 leading-10 bg-teal-600 text-white rounded transition hover:opacity-75"
            >
              &minus;
            </button>

            <input
              type="number"
              id="Quantity"
              value={quantity}
              onChange={handleChange}
              className="h-10 w-36 border border-gray-200 rounded text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            />

            <button
              onClick={handleIncrement}
              type="button"
              className="size-10 leading-10 bg-teal-600 text-white rounded transition hover:opacity-75"
            >
              +
            </button>
          </div>
        </div>
        <p className="mt-5 text-xs font-bold text-gray-600">
          Maximum {product.quantity}
        </p>
        <button
          disabled={isLoadingAdd}
          onClick={handleAddCart}
          type="button"
          className="w-full py-3 rounded text-white bg-teal-600"
        >
          {isLoadingAdd ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  )
}

AddCart.propTypes = {
  product: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default AddCart
