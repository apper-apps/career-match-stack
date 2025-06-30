import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Loading from '@/components/ui/Loading'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <Loading type="page" />
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute