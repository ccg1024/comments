import { createContext, useContext, useState } from 'react'
import { Navigate, redirect, useLocation, useNavigate } from 'react-router-dom'
import { getUserFromCookie } from '../hooks/useUser'

const AuthContext = createContext(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

export function getUserInfo(token) {
  if (token) {
    return {
      userid: token.split('; ')[0],
      username: token.split('; ')[1]
    }
  }

  return {}
}

function initialToken() {
  const user = getUserFromCookie()

  if (user.id && user.name) {
    return user.id + '; ' + user.name
  }
  return null
}

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(initialToken)

  const handleLogin = newToken => {
    setToken(newToken)
    navigate('/')
  }
  const handleLogout = () => {
    setToken(null)
  }

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  const location = useLocation()

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />
  }
  return children
}

export const JumpedRoute = ({ children }) => {
  const { token } = useAuth()

  if (token) {
    return redirect('/')
  }

  return children
}

export default AuthProvider
