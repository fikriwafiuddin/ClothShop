import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Login from "./pages/Login"
import Orders from "./pages/Orders"
import { useEffect } from "react"
import Spinner from "./components/Spinner"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { verifyToken } from "./store/thunk/authThunk"

function App() {
  const dispacth = useDispatch()
  const { isAuthenticated, isCheckingAuth } = useSelector((state) => state.auth)
  const token = localStorage.getItem("admin-clothshop")

  useEffect(() => {
    if (isCheckingAuth && token) {
      dispacth(verifyToken())
    }
  }, [isCheckingAuth, dispacth, token])

  if (isCheckingAuth && token) {
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
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/products"
          element={isAuthenticated ? <Products /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={isAuthenticated ? <Orders /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
