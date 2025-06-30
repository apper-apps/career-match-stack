import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import Layout from '@/components/organisms/Layout'
import Dashboard from '@/components/pages/Dashboard'
import SelfAnalysis from '@/components/pages/SelfAnalysis'
import Recommendations from '@/components/pages/Recommendations'
import Documents from '@/components/pages/Documents'
import MockInterview from '@/components/pages/MockInterview'
import Applications from '@/components/pages/Applications'
import Settings from '@/components/pages/Settings'
import AdminDashboard from '@/components/pages/AdminDashboard'
function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/self-analysis" element={<SelfAnalysis />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/documents" element={<Documents />} />
<Route path="/mock-interview" element={<MockInterview />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Layout>
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
</Router>
    </I18nextProvider>
  )
}

export default App