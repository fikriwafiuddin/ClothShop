import { useNavigate } from "react-router-dom"
import Input from "../components/Input"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { deleteItemCart, getCart } from "../store/slice/cartSlice"
import Spinner from "../components/Spinner"
import axios from "axios"
import { API_URL } from "../../API_URL"
import formatCurrency from "../helpers/formatCurrency"
import { useState } from "react"

function Cart() {
  const navigate = useNavigate()
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false)
  const { isLoading, cart, error, isLoadingDelete } = useSelector(
    (state) => state.cart
  )
  const [first_name, setFirst_name] = useState("")
  const [last_name, setLast_name] = useState("")
  const [email, setEmail] = useState("")
  const [streat, setStreat] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [zip, setZip] = useState("")
  const dispatch = useDispatch()

  const token = localStorage.getItem("user-clothshop")

  const headers = {
    Authorization: `Bearer ${token}`,
  }

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  if (!token) navigate("/")

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey = import.meta.env.VITE_CLIENT_KEY

    const script = document.createElement("script")
    script.src = snapScript
    script.async = true
    script.setAttribute("data-client-key", clientKey)

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleCheckout = () => {
    setIsLoadingCheckout(true)
    axios
      .post(
        `${API_URL}/getTransaction`,
        {
          first_name,
          last_name,
          email,
          streat,
          phone,
          city,
          state,
          country,
          zip,
        },
        { headers }
      )
      .then((response) => {
        window.snap.pay(response.data.token, {
          onSuccess: (result) => {
            console.log(result)
            alert("Success")
          },
          onError: (error) => {
            console.log(error)
            alert("Error")
          },
        })
        setIsLoadingCheckout(false)
      })
      .catch((error) => {
        alert(error.response.data.message)
        setIsLoadingCheckout(false)
      })
  }

  const handleDeleteItem = (id) => {
    dispatch(deleteItemCart({ id }))
  }

  const RenderedCart = () => {
    if (error)
      return <div className="font-bold text-xl text-gray-400">{error}</div>

    if (cart.length == 0) {
      return (
        <div className="font-bold text-xl text-gray-400">Cart is empty</div>
      )
    }
    return cart.map((value) => (
      <li key={value.product._id} className="flex items-center gap-4">
        <img
          src={value.product.image}
          alt={value.product.name}
          className="size-16 rounded object-cover"
        />

        <div>
          <h3 className="text-sm text-gray-900">{value.product.name}</h3>

          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
            <dt className="inline">
              IDR {formatCurrency(value.product.price)}
            </dt>
          </dl>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <form>
            <label htmlFor="Line1Qty" className="sr-only">
              {" "}
              Quantity{" "}
            </label>

            <input
              type="number"
              min="1"
              value={value.quantity}
              readOnly
              id="Line1Qty"
              className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            />
          </form>

          <button
            onClick={() => handleDeleteItem(value.product._id)}
            disabled={isLoadingDelete}
            className="text-gray-600 transition hover:text-red-600"
          >
            <span className="sr-only">Remove item</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </li>
    ))
  }
  return (
    <>
      <header className="relative max-w-6xl mx-auto">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-2 left-2 border-2 rounded px-2 py-1"
        >
          {"<"} Back
        </button>
        <h1 className="text-center font-bold text-xl mt-3">Your Cart</h1>
      </header>
      <main className="sm:flex justify-between mt-5">
        <div className="px-2 w-full max-w-xl mx-auto">
          <h2 className="text-center font-bold mb-4">Address</h2>
          <form>
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={first_name}
                setValue={setFirst_name}
                id="first_name"
                label="First Name"
                type="text"
              />
              <Input
                value={last_name}
                setValue={setLast_name}
                id="last_name"
                label="Last Name"
                type="text"
              />
            </div>

            <Input
              value={email}
              setValue={setEmail}
              id="email"
              label="Email Address"
              type="email"
            />
            <Input
              value={streat}
              setValue={setStreat}
              id="streat"
              label="Streat"
              type="text"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={city}
                setValue={setCity}
                id="city"
                label="City"
                type="text"
              />
              <Input
                value={state}
                setValue={setState}
                id="state"
                label="State"
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={zip}
                setValue={setZip}
                id="zip"
                label="Zip Code"
                type="text"
              />
              <Input
                value={country}
                setValue={setCountry}
                id="country"
                label="Country"
                type="text"
              />
            </div>
            <Input
              value={phone}
              setValue={setPhone}
              id="phone"
              label="Phone Number"
              type="tel"
            />
          </form>
        </div>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 pb-4 pt-10 sm:pt-0 sm:px-6 lg:px-8">
            <h2 className="text-center font-bold mb-4">Products & Total</h2>
            <div className="mx-auto max-w-3xl">
              <div className="">
                {isLoading ? (
                  <div className="mt-10">
                    <Spinner />
                  </div>
                ) : (
                  <ul className="space-y-4">{cart && <RenderedCart />}</ul>
                )}

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700">
                      <div className="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        {cart ? (
                          <dd>
                            {cart.reduce((total, item) => {
                              return total + item.product.price * item.quantity
                            }, 0)}{" "}
                          </dd>
                        ) : (
                          <Spinner />
                        )}
                      </div>
                    </dl>

                    <div className="flex justify-end">
                      <button
                        onClick={handleCheckout}
                        disabled={isLoadingCheckout && isLoading}
                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                      >
                        {isLoading ? "Loading..." : "Checkout"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Cart
