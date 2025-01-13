import PropType from "prop-types"
import useLogout from "../hooks/useLogout"

function Header({ handleOpenSidebar }) {
  const token = localStorage.getItem("user-clothshop")
  const { logout } = useLogout()

  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-teal-600 font-bold text-lg" href="#">
          ClothShop
        </a>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-5">
          {token ? (
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
              <a
                href="/cart"
                className="hidden sm:inline text-sm text-gray-600"
              >
                Cart
              </a>
              <a
                href="/myOrders"
                className="text-sm hidden sm:inline text-gray-600"
              >
                MyOrders
              </a>
              <button
                onClick={logout}
                type="button"
                className="text-sm hidden sm:inline text-gray-600"
              >
                Logout
              </button>
              <a
                className="rounded-md hidden sm:inline bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                href="#"
              >
                Chat Admin
              </a>
            </>
          ) : (
            <>
              <a href="/login" className="text-sm text-gray-600">
                Login
              </a>
              <a
                href="/register"
                className="text-sm hidden sm:inline text-gray-600"
              >
                Register
              </a>
              <a
                className="rounded-md hidden sm:inline bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                href="#"
              >
                Chat Admin
              </a>
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
