import { Link } from "react-router-dom"

function Thanks() {
  return (
    <div className="flex items-center flex-col gap-10">
      <h1 className="font-bold text-5xl mt-24">Thanks You</h1>
      <Link className="underline text-blue-500 text-xl" to="/">
        Back
      </Link>
    </div>
  )
}

export default Thanks
