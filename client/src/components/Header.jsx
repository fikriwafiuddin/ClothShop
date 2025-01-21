import PropType from "prop-types"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/slice/authSlice"

function Header({ handleOpenSidebar }) {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => dispatch(logout())

  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-teal-600 font-bold text-lg" href="#">
          ClothShop
        </a>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-5">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => handleOpenSidebar(true)}
                type="button"
                className="sm:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <Link
                to="/cart"
                className="hidden sm:inline text-sm text-gray-600"
              >
                Cart
              </Link>
              <Link
                to="/myOrders"
                className="text-sm hidden sm:inline text-gray-600"
              >
                MyOrders
              </Link>
              <button
                onClick={handleLogout}
                type="button"
                className="text-sm hidden sm:inline text-gray-600"
              >
                Logout
              </button>
              <Link
                className="rounded-md hidden sm:inline bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                to="#"
              >
                Chat Admin
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-600">
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm hidden sm:inline text-gray-600"
              >
                Register
              </Link>
              <Link
                className="rounded-md hidden sm:inline bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                to="#"
              >
                Chat Admin
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  handleOpenSidebar: PropType.func,
}

export default Header
