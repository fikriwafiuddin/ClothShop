const products = [
  {
    img: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Black Shirt",
    price: "100.000",
  },
  {
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "White Neck",
    price: "150.000",
  },
  {
    img: "https://images.unsplash.com/photo-1618354691229-88d47f285158?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Black Shirt",
    price: "75.000",
  },
  {
    img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHNoaXJ0JTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    name: "White Shirt",
    price: "50.000",
  },
  {
    img: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
    name: "Jacket",
    price: "200.000",
  },
  {
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Brown Jacket",
    price: "200.000",
  },
]

const listProduct = document.getElementById("list_products")

products.map((value) => {
  listProduct.innerHTML += `<a href="#" class="group relative block overflow-hidden">
            <button
              class="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
            >
              <span class="sr-only">Wishlist</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>

            <img
              src="${value.img}"
              alt=""
              class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div class="relative border border-gray-100 bg-white p-6">
              <h3 class="mt-4 text-lg font-medium text-gray-900">${value.name}</h3>

              <p class="mt-1.5 text-sm text-gray-700">Rp ${value.price}</p>

              <form class="mt-4">
                <button
                  class="block w-full rounded text-white bg-teal-600 p-4 text-sm font-medium transition hover:scale-105"
                >
                  Buy
                </button>
              </form>
            </div>
          </a>`
})
