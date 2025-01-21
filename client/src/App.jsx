import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import Thanks from "./pages/Thanks"
import MyOrder from "./pages/MyOrder"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { verifyToken } from "./store/thunk/authThunk"
import Spinner from "./components/Spinner"
import { ToastContainer } from "react-toastify"

function App() {
  const { isAuthenticated, isAuthenticating } = useSelector(
    (state) => state.auth
  )
  const token = localStorage.getItem("user-clothshop")
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuthenticating && token) {
      dispatch(verifyToken())
    }
  }, [isAuthenticating, token, dispatch])

  if (isAuthenticating && token) {
    return (
      <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
        <div className="max-w-sm text-center pt-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-56 h-24">
          <h1 className="mb-2 font-semibold">Verifying</h1>
          <Spinner />
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={isAuthenticated ? <Cart /> : <Login />} />
        <Route
          path="/myOrders"
          element={isAuthenticated ? <MyOrder /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
