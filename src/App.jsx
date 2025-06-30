import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { AuthProvider } from '@/contexts/AuthContext'
import Layout from '@/components/organisms/Layout'
import Dashboard from '@/components/pages/Dashboard'
import SelfAnalysis from '@/components/pages/SelfAnalysis'
import Recommendations from '@/components/pages/Recommendations'
import Documents from '@/components/pages/Documents'
import MockInterview from '@/components/pages/MockInterview'
import Applications from '@/components/pages/Applications'
import Settings from '@/components/pages/Settings'
import AdminDashboard from '@/components/pages/AdminDashboard'
import AdminLogin from '@/components/pages/AdminLogin'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

function App() {
return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Admin Login Route - No Layout */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Main Application Routes */}
              <Route path="/" element={
                <Layout>
                  <Dashboard />
                </Layout>
              } />
              <Route path="/self-analysis" element={
                <Layout>
                  <SelfAnalysis />
                </Layout>
              } />
              <Route path="/recommendations" element={
                <Layout>
                  <Recommendations />
                </Layout>
              } />
              <Route path="/documents" element={
                <Layout>
                  <Documents />
                </Layout>
              } />
              <Route path="/mock-interview" element={
                <Layout>
                  <MockInterview />
                </Layout>
              } />
              <Route path="/applications" element={
                <Layout>
                  <Applications />
                </Layout>
              } />
              <Route path="/settings" element={
                <Layout>
                  <Settings />
                </Layout>
              } />
{/* Protected Admin Routes - Separate from main layout */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
            
            <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
theme="light"
            />
          </div>
        </AuthProvider>
      </Router>
    </I18nextProvider>
  )
}

export default App