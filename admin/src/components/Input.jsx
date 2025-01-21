import PropTypes from "prop-types"

function Input({ type, id, value, onChange, label }) {
  const handleChangeInputNumber = (e) => {
    let value = e.target.value
    if (value.length > 1 && value.startsWith("0")) {
      value = value.replace(/^0+/, "")
    }
    onChange(value)
  }

  if (type === "text") {
    return (
      <div>
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          id={id}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
    )
  }

  if (type == "number") {
    return (
      <div>
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          value={value}
          onChange={(e) => handleChangeInputNumber(e)}
          type="number"
          id={id}
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="90210"
          required
        />
      </div>
    )
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string || PropTypes.number,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default Input
