import { createContext, useContext, useState, useEffect } from 'react'
import adminAuthService from '@/services/api/adminAuthService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkAuthStatus = async () => {
    try {
      const session = await adminAuthService.getCurrentSession()
      if (session) {
        setIsAuthenticated(true)
        setAdmin(session.admin)
      } else {
        setIsAuthenticated(false)
        setAdmin(null)
      }
    } catch (error) {
      setIsAuthenticated(false)
      setAdmin(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    const session = await adminAuthService.login(username, password)
    setIsAuthenticated(true)
    setAdmin(session.admin)
    return session
  }

  const logout = async () => {
    await adminAuthService.logout()
    setIsAuthenticated(false)
    setAdmin(null)
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const value = {
    isAuthenticated,
    admin,
    loading,
    login,
    logout,
    checkAuthStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}