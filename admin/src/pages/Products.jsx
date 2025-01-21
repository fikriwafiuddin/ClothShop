import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import Table from "../components/Table"
import MainLayout from "../layouts/MainLayout"
import {
  addProduct,
  deleteProduct,
  getProducts,
  restockProduct,
  updateProduct,
} from "../store/thunk/productThunk"
import { useState } from "react"
import Input from "../components/Input"
import Icons from "../components/Icons"

function Products() {
  const {
    isLoading,
    products,
    isLoadingDeleteProduct,
    isLoadingRestockProduct,
  } = useSelector((state) => state.product)
  const [isAddProduct, setIsAddProduct] = useState(false)
  const [isEditProduct, setIsEditProduct] = useState(false)
  const [image, setImage] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [id, setId] = useState("")
  const [isRestock, setIsRestock] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const handleOpenFormAdd = () => {
    setIsAddProduct(true)
    setImage("")
    setName("")
    setPrice(0)
    setQuantity(0)
  }

  const handleOpenFormEdit = (data) => {
    setIsEditProduct(true)
    setImage(data.image)
    setName(data.name)
    setPrice(parseInt(data.price))
    setId(data._id)
  }

  const handleCloseForm = () => {
    setIsAddProduct(false)
    setIsEditProduct(false)
  }

  const handleOpenRestock = (data) => {
    setIsRestock(true)
    setName(data.name)
    setQuantity(0)
    setId(data._id)
  }

  const handleCloseRestock = () => setIsRestock(false)

  const handleAddProduct = (e) => {
    e.preventDefault()
    dispatch(addProduct({ image, name, price, quantity }))
  }

  const handleDeleteProdcut = (id) => {
    dispatch(deleteProduct({ id }))
  }

  const handleUpdateProduct = (e) => {
    e.preventDefault()
    dispatch(updateProduct({ id, image, name, price, quantity }))
  }

  const handleRestockProduct = (e) => {
    e.preventDefault()
    dispatch(restockProduct({ id, quantity }))
  }

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
      render: (data) => data.quantity.toLocaleString(),
    },
    {
      label: "",
      render: (data) => (
        <div className="flex gap-3">
          <button
            disabled={isLoadingDeleteProduct}
            onClick={() => handleDeleteProdcut(data._id)}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            {isLoadingDeleteProduct ? "Loading" : "Delete"}
          </button>
          <button
            onClick={() => handleOpenFormEdit(data)}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => handleOpenRestock(data)}
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Restock
          </button>
        </div>
      ),
    },
  ]

  return (
    <MainLayout title="Products">
      <button
        onClick={
          isAddProduct || isEditProduct ? handleCloseForm : handleOpenFormAdd
        }
        type="button"
        className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 mb-2 font-semibold rounded"
      >
        {isAddProduct || isEditProduct ? "Close" : "+ Add products"}
      </button>
      {/* component restock */}
      {isRestock && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center px-2">
          <div className="relative py-5 px-10 w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <button
              onClick={handleCloseRestock}
              type="button"
              className="absolute top-1 right-1 text-gray-500"
            >
              <Icons name="x-circle" size="size-6" />
            </button>
            <h1 className="mb-5 font-semibold text-center">Restock {name}</h1>
            <form onSubmit={handleRestockProduct}>
              <div className="mb-6">
                <Input
                  id="quantity-restock"
                  label="Quantity"
                  value={quantity}
                  type="number"
                  onChange={setQuantity}
                />
              </div>
              <button
                disabled={isLoadingRestockProduct}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {isLoadingRestockProduct ? "Loading..." : "Restock product"}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* end component restock */}
      {!isAddProduct && !isEditProduct && (
        <>
          {isLoading && <h1 className="text-center">Loading</h1>}
          {products && <Table config={config} data={products} />}
        </>
      )}
      {isAddProduct && (
        <form onSubmit={handleAddProduct}>
          <div className="grid gap-4 mb-6">
            <Input
              type="text"
              label="Link image"
              id="image"
              onChange={setImage}
              value={image}
            />
            <Input
              type="text"
              label="Name"
              id="name"
              onChange={setName}
              value={name}
            />
            <Input
              type="number"
              label="Price"
              id="price"
              onChange={setPrice}
              value={price}
            />
            <Input
              type="number"
              label="Quantity"
              id="quantity"
              onChange={setQuantity}
              value={quantity}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      )}
      {isEditProduct && (
        <form onSubmit={handleUpdateProduct}>
          <div className="grid gap-4 mb-6">
            <Input
              type="text"
              label="Link image"
              id="image"
              onChange={setImage}
              value={image}
            />
            <Input
              type="text"
              label="Name"
              id="name"
              onChange={setName}
              value={name}
            />
            <Input
              type="number"
              label="Price"
              id="price"
              onChange={setPrice}
              value={price}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Update
          </button>
        </form>
      )}
    </MainLayout>
  )
}

export default Products
