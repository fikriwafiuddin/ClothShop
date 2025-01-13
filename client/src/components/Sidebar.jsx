import PropType from "prop-types"

function Sidebar({ handleCloseSidebar }) {
  return (
    <div className="fixed sm:hidden top-0 left-0 bottom-0 right-0 bg-black/50 flex justify-end z-40">
      <div className="bg-white w-1/2 h-full px-2 py-10 relative">
        <button
          type="button"
          className="absolute top-2 right-2 box-border text-gray-600 rounded-full"
          onClick={() => handleCloseSidebar(false)}
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
        <div className="flex flex-col items-start gap-3">
          <a href="/cart" className="text-sm text-gray-600">
            Cart
          </a>
          <a href="" className="text-sm text-gray-600">
            MyOrders
          </a>
          <button type="button" className="text-sm text-gray-600">
            Logout
          </button>
          <a
            className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            href="#"
          >
            Chat Admin
          </a>
        </div>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  handleCloseSidebar: PropType.func.isRequired,
}

export default Sidebar
