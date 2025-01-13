import { useState, useEffect, createContext } from "react"
import PropTypes from "prop-types"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const token = localStorage.getItem("user-clothshop")

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.any,
}

export { AuthContext, AuthProvider }
