import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import StatCard from '@/components/molecules/StatCard'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ProgressRing from '@/components/atoms/ProgressRing'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setDashboardData({
        stats: {
          totalApplications: 15,
          activeApplications: 8,
          interviews: 3,
          offers: 1
        },
        progress: {
          selfAnalysis: 100,
          recommendations: 75,
          documents: 60,
          interviews: 40
        },
        recentActivity: [
          { type: 'application', company: 'Google', action: 'Applied for Product Manager', time: '2 hours ago' },
          { type: 'interview', company: 'Microsoft', action: 'Interview scheduled', time: '1 day ago' },
          { type: 'document', company: 'Apple', action: 'Resume updated', time: '2 days ago' }
        ]
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  if (loading) {
    return <Loading type="card" count={6} />
  }

  if (error) {
    return <Error onRetry={loadDashboard} />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard')}</h1>
          <p className="text-gray-600 mt-2">{t('trackProgress')}</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
icon="Plus"
          onClick={() => navigate('/applications')}
        >
          {t('addApplication')}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('totalApplications')}
          value={dashboardData.stats.totalApplications}
          icon="FileText"
          color="primary"
        />
        <StatCard
          title={t('activeApplications')}
          value={dashboardData.stats.activeApplications}
          icon="Clock"
          color="warning"
        />
        <StatCard
          title={t('interviews')}
          value={dashboardData.stats.interviews}
          icon="MessageSquare"
          color="secondary"
        />
        <StatCard
          title={t('offers')}
          value={dashboardData.stats.offers}
          icon="Award"
          color="accent"
        />
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Journey Progress */}
<Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('journeyProgress')}</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <ApperIcon name="UserCheck" size={20} className="text-white" />
                </div>
<div>
                  <p className="font-medium text-gray-900">{t('selfAnalysis')}</p>
                  <p className="text-sm text-gray-500">{t('completeProfile')}</p>
                </div>
              </div>
              <ProgressRing
                percentage={dashboardData.progress.selfAnalysis}
                size={50}
                strokeWidth={4}
                showText={false}
              >
                <span className="text-xs font-bold text-gray-700">
                  {dashboardData.progress.selfAnalysis}%
                </span>
              </ProgressRing>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center">
                  <ApperIcon name="Target" size={20} className="text-white" />
                </div>
<div>
                  <p className="font-medium text-gray-900">{t('recommendations')}</p>
                  <p className="text-sm text-gray-500">{t('reviewMatches')}</p>
                </div>
              </div>
              <ProgressRing
                percentage={dashboardData.progress.recommendations}
                size={50}
                strokeWidth={4}
                showText={false}
              >
                <span className="text-xs font-bold text-gray-700">
                  {dashboardData.progress.recommendations}%
                </span>
              </ProgressRing>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center">
                  <ApperIcon name="FileText" size={20} className="text-white" />
                </div>
<div>
                  <p className="font-medium text-gray-900">{t('documents')}</p>
                  <p className="text-sm text-gray-500">{t('createDocuments')}</p>
                </div>
              </div>
              <ProgressRing
                percentage={dashboardData.progress.documents}
                size={50}
                strokeWidth={4}
                showText={false}
              >
                <span className="text-xs font-bold text-gray-700">
                  {dashboardData.progress.documents}%
                </span>
              </ProgressRing>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <ApperIcon name="MessageSquare" size={20} className="text-white" />
                </div>
<div>
                  <p className="font-medium text-gray-900">{t('mockInterview')}</p>
                  <p className="text-sm text-gray-500">{t('practiceAI')}</p>
                </div>
              </div>
              <ProgressRing
                percentage={dashboardData.progress.interviews}
                size={50}
                strokeWidth={4}
                showText={false}
              >
                <span className="text-xs font-bold text-gray-700">
                  {dashboardData.progress.interviews}%
                </span>
              </ProgressRing>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
<Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('recentActivity')}</h3>
          <div className="space-y-4">
            {dashboardData.recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ApperIcon
                    name={activity.type === 'application' ? 'Send' : activity.type === 'interview' ? 'MessageSquare' : 'FileText'}
                    size={16}
                    className="text-primary-600"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.company}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
<Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('quickActions')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="outline"
            icon="UserCheck"
            onClick={() => navigate('/self-analysis')}
className="h-20 flex-col"
        >
          <span className="mt-2">{t('completeAnalysis')}</span>
          </Button>
          <Button
            variant="outline"
            icon="Target"
            onClick={() => navigate('/recommendations')}
className="h-20 flex-col"
        >
          <span className="mt-2">{t('viewMatches')}</span>
          </Button>
          <Button
            variant="outline"
            icon="FileText"
            onClick={() => navigate('/documents')}
className="h-20 flex-col"
        >
          <span className="mt-2">{t('createResume')}</span>
          </Button>
          <Button
            variant="outline"
            icon="MessageSquare"
            onClick={() => navigate('/mock-interview')}
className="h-20 flex-col"
        >
          <span className="mt-2">{t('practiceInterview')}</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard