import { useSelector } from "react-redux"
import Table from "../components/Table"
import MainLayout from "../layouts/MainLayout"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getProducts } from "../store/thunk/productThunk"

function Products() {
  const { isLoading, products } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  console.log(products)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const config = [
    {
      label: "Name",
      render: (data) => data.name,
    },
    {
      label: "Price",
      render: (data) => `IDR ${data.price.toLocaleString()}`,
    },
    {
      label: "Quantity",
      render: (data) => data.quantity,
    },
    {
      label: "",
      render: () => "delete",
    },
  ]
  return (
    <MainLayout title="Products">
      <button
        type="button"
        className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 mb-2 font-semibold rounded"
      >
        + Add products
      </button>
      {isLoading && <h1 className="text-center">Loading</h1>}
      {products && <Table config={config} data={products} />}
    </MainLayout>
  )
}

export default Products
