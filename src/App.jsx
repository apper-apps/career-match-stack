import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Dashboard from '@/components/pages/Dashboard'
import SelfAnalysis from '@/components/pages/SelfAnalysis'
import Recommendations from '@/components/pages/Recommendations'
import Documents from '@/components/pages/Documents'
import MockInterview from '@/components/pages/MockInterview'
import Applications from '@/components/pages/Applications'
import Settings from '@/components/pages/Settings'

function App() {
  return (
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
  )
}

export default App