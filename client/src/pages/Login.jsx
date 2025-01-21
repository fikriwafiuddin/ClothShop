import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "../components/Spinner"
import { login } from "../store/thunk/authThunk"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { isLoadingLogin } = useSelector((state) => state.auth)
  const dispacth = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()
    dispacth(login({ email, password }))
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <a
          className="block text-teal-600 font-bold text-3xl text-center"
          href="#"
        >
          ClothShop
        </a>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-600">
          Login your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              disabled={isLoadingLogin}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoadingLogin ? <Spinner /> : "Login"}
            </button>
          </div>
        </form>
        <p className="text-center mt-5 text-sm text-gray-700">
          {"Don't"} have an account yet?{" "}
          <a href="/register" className="text-blue-700 underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
