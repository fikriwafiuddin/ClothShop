import { useSelector } from "react-redux"
import CTAS from "../components/CTAS"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getProducts } from "../store/slice/productSlice"
import Spinner from "../components/Spinner"
import Product from "../components/Product"
import AddCart from "../components/AddCart"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"

function Home() {
  const [product, setProduct] = useState(null)
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  const { isLoading, products, error } = useSelector((state) => state.product)
  const token = localStorage.getItem("user-clothshop")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const renderedProducts = products.map((product) => {
    return (
      <Product key={product._id} product={product} handleClick={setProduct} />
    )
  })

  return (
    <>
      <Header handleOpenSidebar={setIsOpenSidebar} />
      <CTAS />

      {/* SIDEBAR */}
      {isOpenSidebar && <Sidebar handleCloseSidebar={setIsOpenSidebar} />}
      {/* END SIDEBAR */}

      {/* <!-- PRODUCTS --> */}
      <section className="container grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto px-2 py-4">
        {isLoading && <Spinner />}
        {products && renderedProducts}
        {error && <h1 className="text-xl text-center">{error}</h1>}
      </section>
      {/* <!-- END PRODUCTS --> */}

      {/* Add to Cart */}
      {product && <AddCart handleClose={setProduct} product={product} />}
      {/* END Add to Cart */}

      {token && (
        <button
          onClick={() => navigate("/cart")}
          type="button"
          className="sm:hidden fixed bg-teal-700 text-white bottom-24 right-5 p-5 rounded-full z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          </svg>
        </button>
      )}
      <Footer />
    </>
  )
}

export default Home
