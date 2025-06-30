import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Chart from "react-apexcharts";
import { useAuth } from "@/contexts/AuthContext";
import ApperIcon from "@/components/ApperIcon";
import Dashboard from "@/components/pages/Dashboard";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import StatCard from "@/components/molecules/StatCard";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import adminService from "@/services/api/adminService";
const AdminDashboard = () => {
  const { admin, logout } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await adminService.getDashboardMetrics()
      setDashboardData(data)
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load admin dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    try {
      setRefreshing(true)
      const data = await adminService.getDashboardMetrics()
      setDashboardData(data)
      toast.success('Dashboard refreshed successfully')
    } catch (err) {
      toast.error('Failed to refresh dashboard')
    } finally {
      setRefreshing(false)
    }
  }

  const handleAlertAcknowledge = async (alertId) => {
    try {
      await adminService.acknowledgeAlert(alertId)
      const updatedData = { ...dashboardData }
      updatedData.alerts = updatedData.alerts.filter(alert => alert.Id !== alertId)
      setDashboardData(updatedData)
      toast.success('Alert acknowledged')
} catch (err) {
      toast.error('Failed to acknowledge alert')
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Error during logout')
    }
  }

  useEffect(() => {
    loadDashboard()
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(loadDashboard, 300000)
    return () => clearInterval(interval)
  }, [])
  if (loading) {
    return <Loading type="card" count={8} />
  }

  if (error) {
    return <Error onRetry={loadDashboard} />
  }

  // Chart configurations
  const userAcquisitionOptions = {
    chart: {
      type: 'area',
      height: 300,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif'
    },
    colors: ['#3B82F6'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1
      }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    xaxis: {
      categories: dashboardData.trends.userAcquisition.labels,
      labels: { style: { colors: '#6B7280' } }
    },
    yaxis: {
      labels: { style: { colors: '#6B7280' } }
    },
    grid: { borderColor: '#E5E7EB' },
    tooltip: {
      y: { formatter: (val) => `${val} users` }
    }
  }

  const dropoutRateOptions = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif'
    },
    colors: ['#EF4444'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: dashboardData.trends.dropoutRate.labels,
      labels: { style: { colors: '#6B7280' } }
    },
    yaxis: {
      labels: { 
        style: { colors: '#6B7280' },
        formatter: (val) => `${val}%`
      }
    },
    grid: { borderColor: '#E5E7EB' },
    tooltip: {
      y: { formatter: (val) => `${val}%` }
    }
  }
return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {admin?.name} • Monitor system metrics and user analytics
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <Button
            variant="outline"
            icon="RefreshCw"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          <Button
            variant="ghost"
            icon="LogOut"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="New Users (30d)"
          value={dashboardData.metrics.newUsers}
          icon="UserPlus"
          color="primary"
          trend={dashboardData.metrics.newUsersTrend > 0 ? 'up' : 'down'}
          trendValue={`${Math.abs(dashboardData.metrics.newUsersTrend)}%`}
        />
        <StatCard
          title="Active Users"
          value={dashboardData.metrics.activeUsers}
          icon="Users"
          color="secondary"
          trend={dashboardData.metrics.activeUsersTrend > 0 ? 'up' : 'down'}
          trendValue={`${Math.abs(dashboardData.metrics.activeUsersTrend)}%`}
        />
        <StatCard
          title="Completion Rate"
          value={`${dashboardData.metrics.completionRate}%`}
          icon="CheckCircle"
          color="accent"
          trend={dashboardData.metrics.completionRateTrend > 0 ? 'up' : 'down'}
          trendValue={`${Math.abs(dashboardData.metrics.completionRateTrend)}%`}
        />
        <StatCard
          title="API Usage Cost"
          value={`$${dashboardData.metrics.apiCost}`}
          icon="DollarSign"
          color="warning"
          trend={dashboardData.metrics.apiCostTrend > 0 ? 'up' : 'down'}
          trendValue={`${Math.abs(dashboardData.metrics.apiCostTrend)}%`}
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Success Stories"
          value={dashboardData.metrics.successStories}
          icon="Award"
          color="accent"
        />
        <StatCard
          title="Satisfaction Score"
          value={`${dashboardData.metrics.satisfactionScore}/5`}
          icon="Star"
          color="secondary"
        />
        <StatCard
          title="System Uptime"
          value={`${dashboardData.metrics.systemUptime}%`}
          icon="Activity"
          color="primary"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Acquisition Trend */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">User Acquisition (Last 30 Days)</h3>
          <Chart
            options={userAcquisitionOptions}
            series={[{
              name: 'New Users',
              data: dashboardData.trends.userAcquisition.data
            }]}
            type="area"
            height={300}
          />
        </Card>

        {/* Dropout Rate by Step */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Dropout Rate by Step</h3>
          <Chart
            options={dropoutRateOptions}
            series={[{
              name: 'Dropout Rate',
              data: dashboardData.trends.dropoutRate.data
            }]}
            type="bar"
            height={300}
          />
        </Card>
      </div>

      {/* Popular Job Types & Industries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Popular Job Types</h3>
          <div className="space-y-4">
            {dashboardData.popularJobTypes.map((job, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <ApperIcon name="Briefcase" size={16} className="text-primary-600" />
                  </div>
                  <span className="font-medium text-gray-900">{job.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-gray-900">{job.count}</span>
                  <span className="text-sm text-gray-500 ml-1">({job.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Popular Industries</h3>
          <div className="space-y-4">
            {dashboardData.popularIndustries.map((industry, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                    <ApperIcon name="Building2" size={16} className="text-secondary-600" />
                  </div>
                  <span className="font-medium text-gray-900">{industry.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-gray-900">{industry.count}</span>
                  <span className="text-sm text-gray-500 ml-1">({industry.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Alerts Section */}
      {dashboardData.alerts.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">System Alerts</h3>
          <div className="space-y-4">
            {dashboardData.alerts.map((alert) => (
              <motion.div
                key={alert.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-lg admin-alert-card admin-alert-${alert.type}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <ApperIcon
                      name={alert.type === 'warning' ? 'AlertTriangle' : alert.type === 'error' ? 'AlertCircle' : 'CheckCircle'}
                      size={20}
                      className={
                        alert.type === 'warning' ? 'text-yellow-600' :
                        alert.type === 'error' ? 'text-red-600' : 'text-green-600'
                      }
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAlertAcknowledge(alert.Id)}
                  >
                    Acknowledge
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export default AdminDashboard