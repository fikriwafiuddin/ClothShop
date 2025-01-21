import PropTypes from "prop-types"

const Table = ({ config, data }) => {
  const RenderedHeaders = () => {
    return config.map((col) => (
      <th key={col.label} className="py-2 px-4 border bg-indigo-800 text-white">
        {col.label}
      </th>
    ))
  }

  const RenderedRows = () => {
    return (
      <>
        {data.map((order) => {
          return (
            <tr key={order._id}>
              {config.map((col) => (
                <td
                  key={`${order._id}-${col.label}`}
                  className="py-2 px-4 border"
                >
                  {col.render(order)}{" "}
                </td>
              ))}
            </tr>
          )
        })}
      </>
    )
  }

  return (
    <table className="min-w-full bg-white rounded-md overflow-hidden">
      <thead>
        <tr>
          <RenderedHeaders />
        </tr>
      </thead>
      <tbody>
        <RenderedRows />
      </tbody>
    </table>
  )
}

Table.propTypes = {
  config: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.any,
      render: PropTypes.func.isRequired,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
}

export default Table
