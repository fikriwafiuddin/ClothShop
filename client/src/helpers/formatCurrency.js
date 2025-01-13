export default function formatCurrency(amount) {
  if (isNaN(amount)) {
    return null
  }

  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
