import { useContext } from "react"
import Spinner from "../components/Spinner"
import { AuthContext } from "../context/AuthContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../../API_URL"

function Verify() {
  const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const token = localStorage.getItem("user-clothshop")

  useEffect(() => {
    setTimeout(() => {
      if (isAuthenticated) navigate("/")
    }, 3000)
  }, [isAuthenticated, navigate])

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    if (token) {
      axios
        .post(`${API_URL}/verifyUser`, {}, { headers })
        .then(() => {})
        .catch((err) => {
          if (err.response.data.message === "Invalid token") {
            localStorage.removeItem("user-clothshop")
          }
        })
    }
    setIsAuthenticated(true)
  }, [navigate, setIsAuthenticated, token])

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="max-w-sm text-center pt-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-56 h-24">
        <h1 className="mb-2 font-semibold">Verifying</h1>
        {isAuthenticated ? (
          <Spinner />
        ) : (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
        )}
      </div>
    </main>
  )
}

export default Verify
