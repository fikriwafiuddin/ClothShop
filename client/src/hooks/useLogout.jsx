function useLogout() {
  const logout = () => {
    localStorage.removeItem("user-clothshop")
  }
  return { logout }
}

export default useLogout
