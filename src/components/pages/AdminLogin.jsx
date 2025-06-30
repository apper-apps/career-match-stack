import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useAuth } from '@/contexts/AuthContext'
import Card from '@/components/atoms/Card'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const AdminLogin = () => {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors below')
      return
    }
    
    setLoading(true)
    
    try {
      await login(formData.username, formData.password)
      toast.success('Login successful! Welcome to Admin Dashboard')
      navigate('/admin')
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Shield" size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Access the administration dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              error={errors.username}
              icon="User"
              required
              disabled={loading}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              icon="Lock"
              required
              disabled={loading}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={loading}
              icon="LogIn"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h3>
              <div className="text-xs text-blue-700 space-y-1">
                <div><strong>Username:</strong> admin</div>
                <div><strong>Password:</strong> admin123</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center space-x-2"
          >
            <ApperIcon name="ArrowLeft" size={16} />
            <span>Back to Main Application</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin