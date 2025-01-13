import { Line } from "react-chartjs-2"
import PropTypes from "prop-types"
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Chart = ({ labels, numbers, label }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: numbers,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Pendapatan (IDR)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Minggu",
        },
      },
    },
  }

  return (
    <div className="bg-white p-4 mt-3 rounded shadow">
      <h2 style={{ textAlign: "center" }}>Grafik Pendapatan Bulan Ini</h2>
      <Line data={data} options={options} height={90} />
    </div>
  )
}

Chart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  label: PropTypes.string.isRequired,
}

export default Chart
