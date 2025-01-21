import { useLocation, Link } from "react-router-dom"
import Icons from "./Icons"

function Sidebar() {
  const location = useLocation()
  const currentPath = location.pathname
  const links = [
    {
      label: "Dashboard",
      url: "/",
      icon: <Icons name="dashboard" size="size-6" />,
    },
    {
      label: "Products",
      url: "/products",
      icon: <Icons name="product" size="size-6" />,
    },
    {
      label: "Orders",
      url: "/orders",
      icon: <Icons name="order" size="size-6" />,
    },
    {
      label: "Analytic",
      url: "/analytic",
      icon: <Icons name="analytic" size="size-6" />,
    },
    {
      label: "Message",
      url: "/message",
      icon: <Icons name="message" size="size-6" />,
    },
  ]

  const RenderedLinks = () => {
    return links.map((value) => (
      <Link
        key={value.label}
        to={value.url}
        className={`flex gap-2 py-2.5 px-4 text-white font-semibold duration-150 ${
          value.url == currentPath && "ml-5"
        } hover:ml-5`}
      >
        {value.icon}
        {value.label}
      </Link>
    ))
  }

  return (
    <div className="relative w-52 bg-violet-600 text-white shadow-md rounded-r-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">ClothShop</h1>
      </div>
      <nav className="mt-6">
        <RenderedLinks />
      </nav>
      <button
        type="button"
        className="absolute bottom-5 left-3 right-3 flex justify-center items-center gap-2 font-semibold bg-violet-900 text-white px-3 py-2 rounded"
      >
        Logout{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default Sidebar
