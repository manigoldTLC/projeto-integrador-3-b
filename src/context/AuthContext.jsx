import { createContext, useContext, useState, useCallback } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

// Credenciais de admin fictício
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'admin123'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try { return sessionStorage.getItem('portfolio_admin') === 'true' } catch { return false }
  })

  const login = useCallback((user, pass) => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setIsAdmin(true)
      try { sessionStorage.setItem('portfolio_admin', 'true') } catch {}
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAdmin(false)
    try { sessionStorage.removeItem('portfolio_admin') } catch {}
  }, [])

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth()
  const location = useLocation()

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}
