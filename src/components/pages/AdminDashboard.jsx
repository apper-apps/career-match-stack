import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Chart from "react-apexcharts";
import { useAuth } from "@/contexts/AuthContext";
import ApperIcon from "@/components/ApperIcon";
import Dashboard from "@/components/pages/Dashboard";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
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
  
  // Model configuration state
  const [modelConfig, setModelConfig] = useState(null)
  const [showModelConfig, setShowModelConfig] = useState(false)
  const [selectedModel, setSelectedModel] = useState('')
  const [availableModels, setAvailableModels] = useState([])
  const [apiConfig, setApiConfig] = useState({
    baseUrl: '',
    apiKey: '',
    maxTokens: 2048,
    temperature: 0.7
  })
  const [savingModel, setSavingModel] = useState(false)
const loadDashboard = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await adminService.getDashboardMetrics()
      setDashboardData(data)
      
      // Load model configuration if available
      if (data.modelConfig) {
        setModelConfig(data.modelConfig)
        setSelectedModel(data.modelConfig.model)
      }
      
      // Load available models
      if (data.availableModels) {
        setAvailableModels(data.availableModels)
      }
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
      updatedData.alerts = (updatedData.alerts || []).filter(alert => alert.Id !== alertId)
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

  const handleApiConfigChange = (field, value) => {
    setApiConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleModelChange = async () => {
    if (!selectedModel || !apiConfig.apiKey) {
      toast.error('Please select a model and provide API key')
      return
    }

    try {
      setSavingModel(true)
      const newConfig = {
        model: selectedModel,
        ...apiConfig
      }
      
      await adminService.updateModelConfig(newConfig)
      setModelConfig({
        ...newConfig,
        status: 'Active',
        lastUpdated: new Date().toLocaleDateString(),
        avgResponseTime: 150,
        provider: availableModels.find(m => m.id === selectedModel)?.provider || 'Unknown'
      })
      
      setShowModelConfig(false)
      toast.success('Model configuration updated successfully')
    } catch (err) {
      toast.error('Failed to update model configuration')
    } finally {
      setSavingModel(false)
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
      categories: dashboardData?.trends?.userAcquisition?.labels || [],
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
      categories: dashboardData?.trends?.dropoutRate?.labels || [],
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
if (!dashboardData) {
    return <Loading type="card" count={8} />
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
      {/* LLM Model Configuration Section */}
      {modelConfig && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">LLM Model Configuration</h3>
              <p className="text-sm text-gray-600 mt-1">Manage the base AI model used across the platform</p>
            </div>
            <Button
              variant="outline"
              icon="Settings"
              onClick={() => setShowModelConfig(!showModelConfig)}
            >
              {showModelConfig ? 'Hide Config' : 'Configure Model'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <ApperIcon name="Brain" size={18} className="text-blue-600" />
                <span className="font-medium text-gray-900">Current Model</span>
              </div>
              <p className="text-lg font-semibold text-blue-900">{modelConfig.model}</p>
              <p className="text-sm text-gray-600">{modelConfig.provider}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <ApperIcon name="Activity" size={18} className="text-green-600" />
                <span className="font-medium text-gray-900">Status</span>
              </div>
              <p className="text-lg font-semibold text-green-900">{modelConfig.status}</p>
              <p className="text-sm text-gray-600">Last updated: {modelConfig.lastUpdated}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <ApperIcon name="Zap" size={18} className="text-purple-600" />
                <span className="font-medium text-gray-900">Performance</span>
              </div>
              <p className="text-lg font-semibold text-purple-900">{modelConfig.avgResponseTime}ms</p>
              <p className="text-sm text-gray-600">Average response time</p>
            </div>
          </div>

          {showModelConfig && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t pt-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Model Selection</h4>
                  <div className="space-y-4">
                    <FormField
                      label="Available Models"
                      type="select"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      options={availableModels.map(model => ({
                        value: model.id,
                        label: `${model.name} (${model.provider})`
                      }))}
                    />
                    
                    <FormField
                      label="API Base URL"
                      type="text"
                      value={apiConfig.baseUrl}
                      onChange={(e) => handleApiConfigChange('baseUrl', e.target.value)}
                      placeholder="https://api.openai.com/v1"
                    />
                    
                    <FormField
                      label="API Key"
                      type="password"
                      value={apiConfig.apiKey}
                      onChange={(e) => handleApiConfigChange('apiKey', e.target.value)}
                      placeholder="Enter API key"
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Model Parameters</h4>
                  <div className="space-y-4">
                    <FormField
                      label="Max Tokens"
                      type="number"
                      value={apiConfig.maxTokens}
                      onChange={(e) => handleApiConfigChange('maxTokens', parseInt(e.target.value))}
                      min="1"
                      max="8192"
                    />
                    
                    <FormField
                      label="Temperature"
                      type="number"
                      value={apiConfig.temperature}
                      onChange={(e) => handleApiConfigChange('temperature', parseFloat(e.target.value))}
                      min="0"
                      max="2"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowModelConfig(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleModelChange}
                  disabled={savingModel || !selectedModel || !apiConfig.apiKey}
                  icon={savingModel ? "RefreshCw" : "Save"}
                >
                  {savingModel ? 'Saving...' : 'Save Configuration'}
                </Button>
              </div>
            </motion.div>
          )}
        </Card>
      )}
{/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="New Users (30d)"
          value={dashboardData?.metrics?.newUsers || 0}
          icon="UserPlus"
          color="primary"
          trend={dashboardData?.metrics?.newUsersTrend > 0 ? 'up' : 'down'}
          trendValue={`${Math.abs(dashboardData?.metrics?.newUsersTrend || 0)}%`}
        />
        <StatCard
          title="Active Users"
          value={dashboardData?.metrics?.activeUsers || 0}
          icon="Users"
          color="secondary"
          trend={dashboardData?.metrics?.activeUsersTrend > 0 ? 'up' : 'down'}
          trendValue={`${Math.abs(dashboardData?.metrics?.activeUsersTrend || 0)}%`}
        />
        <StatCard
          title="Completion Rate"
          value={`${dashboardData?.metrics?.completionRate || 0}%`}
          icon="CheckCircle"
          color="accent"
          trend={dashboardData?.metrics?.completionRateTrend > 0 ? 'up' : 'down'}
          trendValue={`${Math.abs(dashboardData?.metrics?.completionRateTrend || 0)}%`}
        />
        <StatCard
          title="API Usage Cost"
          value={`$${dashboardData?.metrics?.apiCost || 0}`}
          icon="DollarSign"
          color="warning"
          trend={dashboardData?.metrics?.apiCostTrend > 0 ? 'up' : 'down'}
          trendValue={`${Math.abs(dashboardData?.metrics?.apiCostTrend || 0)}%`}
        />
      </div>

{/* Additional Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Success Stories"
          value={dashboardData?.metrics?.successStories || 0}
          icon="Award"
          color="accent"
        />
        <StatCard
          title="Satisfaction Score"
          value={`${dashboardData?.metrics?.satisfactionScore || 0}/5`}
          icon="Star"
          color="secondary"
        />
        <StatCard
          title="System Uptime"
          value={`${dashboardData?.metrics?.systemUptime || 0}%`}
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
              data: dashboardData?.trends?.userAcquisition?.data || []
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
              data: dashboardData?.trends?.dropoutRate?.data || []
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
            {(dashboardData?.popularJobTypes || []).map((job, index) => (
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
            {(dashboardData?.popularIndustries || []).map((industry, index) => (
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
      {(dashboardData?.alerts || []).length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">System Alerts</h3>
          <div className="space-y-4">
            {(dashboardData?.alerts || []).map((alert) => (
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