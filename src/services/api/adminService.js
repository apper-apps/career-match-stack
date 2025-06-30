import { delay } from "@/utils/helpers";
// Mock admin metrics data
const mockMetrics = {
  newUsers: 247,
  newUsersTrend: 15.2,
  activeUsers: 1834,
  activeUsersTrend: 8.7,
  completionRate: 78,
  completionRateTrend: 5.3,
  apiCost: 2847,
  apiCostTrend: 12.4,
  successStories: 142,
  satisfactionScore: 4.6,
  systemUptime: 99.8
}

const mockTrends = {
  userAcquisition: {
    labels: ['Jan 1', 'Jan 5', 'Jan 10', 'Jan 15', 'Jan 20', 'Jan 25', 'Jan 30'],
    data: [12, 19, 15, 27, 32, 25, 35]
  },
  dropoutRate: {
    labels: ['Self Analysis', 'Recommendations', 'Documents', 'Mock Interview', 'Applications'],
    data: [5, 12, 18, 25, 8]
  }
}

const mockPopularJobTypes = [
  { name: 'Product Manager', count: 324, percentage: 18.7 },
  { name: 'Software Engineer', count: 298, percentage: 17.2 },
  { name: 'Data Scientist', count: 245, percentage: 14.1 },
  { name: 'UX Designer', count: 189, percentage: 10.9 },
  { name: 'Marketing Manager', count: 156, percentage: 9.0 }
]

const mockPopularIndustries = [
  { name: 'Technology', count: 567, percentage: 32.8 },
  { name: 'Healthcare', count: 234, percentage: 13.5 },
  { name: 'Finance', count: 198, percentage: 11.4 },
  { name: 'E-commerce', count: 176, percentage: 10.2 },
  { name: 'Education', count: 143, percentage: 8.3 }
]

const mockAlerts = [
  {
    Id: 1,
    type: 'warning',
    title: 'API Usage Alert',
    message: 'Current month API usage is at 85% of the allocated limit',
    timestamp: '2 hours ago',
    severity: 'medium'
  },
  {
    Id: 2,
    type: 'error',
    title: 'High Dropout Rate',
    message: 'Document creation step showing 25% dropout rate (above 20% threshold)',
    timestamp: '4 hours ago',
    severity: 'high'
  },
  {
    Id: 3,
    type: 'warning',
    title: 'System Performance',
    message: 'Response time has increased by 15% in the last 24 hours',
    timestamp: '6 hours ago',
    severity: 'medium'
  }
]

let alerts = [...mockAlerts]

// Mock current model configuration
let currentModelConfig = {
  model: 'gpt-4',
  provider: 'OpenAI',
  status: 'Active',
  lastUpdated: '2024-01-15 14:30:00',
  baseUrl: 'https://api.openai.com/v1',
  maxTokens: 4000,
  temperature: 0.7,
  apiKeyMasked: '****...xyz9',
  avgResponseTime: 850
}

// Mock available models
const mockAvailableModels = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: 'Most capable GPT model for complex tasks',
    maxTokens: 8192,
    pricing: '$0.03/1K tokens'
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    description: 'Fast and efficient for most tasks',
    maxTokens: 4096,
    pricing: '$0.002/1K tokens'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    description: 'Anthropic\'s most capable model',
    maxTokens: 200000,
    pricing: '$15/1M tokens'
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    description: 'Balanced performance and speed',
    maxTokens: 200000,
    pricing: '$3/1M tokens'
  }
]

const adminService = {
  async getDashboardMetrics() {
    await delay(800)
    
    return {
      metrics: mockMetrics,
      trends: mockTrends,
      popularJobTypes: mockPopularJobTypes,
      popularIndustries: mockPopularIndustries,
      alerts: [...alerts]
    }
  },

  async getMetrics() {
    await delay(400)
    return { ...mockMetrics }
  },

  async getTrends(timeRange = '30d') {
    await delay(600)
    return { ...mockTrends }
  },

  async getPopularJobTypes() {
    await delay(300)
    return [...mockPopularJobTypes]
  },

  async getPopularIndustries() {
    await delay(300)
    return [...mockPopularIndustries]
  },

  async getAlerts() {
    await delay(300)
    return [...alerts]
  },

  async acknowledgeAlert(alertId) {
    await delay(200)
    const index = alerts.findIndex(alert => alert.Id === parseInt(alertId))
    if (index === -1) {
      throw new Error('Alert not found')
    }
    
    alerts.splice(index, 1)
    return true
  },

  async getUserAnalytics(timeRange = '30d') {
    await delay(600)
    
    return {
      totalUsers: 2456,
      newUsers: mockMetrics.newUsers,
      activeUsers: mockMetrics.activeUsers,
      retentionRate: 67.3,
      averageSessionTime: '24m 15s',
      userGrowthRate: mockMetrics.newUsersTrend
    }
  },

  async getSystemMetrics() {
    await delay(500)
    
    return {
      uptime: mockMetrics.systemUptime,
      responseTime: 284,
      errorRate: 0.02,
      apiCalls: 45623,
      apiCost: mockMetrics.apiCost,
      storageUsed: '2.4 GB',
      bandwidthUsed: '156 GB'
    }
  },

  async getCompletionAnalytics() {
    await delay(500)
    
    return {
      overallCompletionRate: mockMetrics.completionRate,
      stepCompletionRates: {
        selfAnalysis: 95,
        recommendations: 82,
        documents: 75,
        mockInterview: 58,
        applications: 71
      },
      averageCompletionTime: '4.2 days',
      dropoutPoints: mockTrends.dropoutRate
}
  },

  // LLM Model Management Methods
  async getCurrentModelConfig() {
    await delay(300)
    return { ...currentModelConfig }
  },

  async getAvailableModels() {
    await delay(400)
    return [...mockAvailableModels]
  },

  async updateModelConfig(config) {
    await delay(800)
    
    // Validate required fields
    if (!config.model || !config.apiKey) {
      throw new Error('Model and API key are required')
    }
    
    // Find the selected model details
    const selectedModel = mockAvailableModels.find(model => model.id === config.model)
    if (!selectedModel) {
      throw new Error('Invalid model selected')
    }
    
    // Update configuration
    currentModelConfig = {
      ...currentModelConfig,
      model: config.model,
      provider: selectedModel.provider,
      status: 'Active',
      lastUpdated: new Date().toISOString().slice(0, 19).replace('T', ' '),
      baseUrl: config.baseUrl || currentModelConfig.baseUrl,
      maxTokens: config.maxTokens || currentModelConfig.maxTokens,
      temperature: config.temperature || currentModelConfig.temperature,
      apiKeyMasked: `****...${config.apiKey.slice(-4)}`
    }
    
    return { ...currentModelConfig }
  },

  async testModelConnection(config) {
    await delay(1500)
    
    // Simulate API connection test
    const success = Math.random() > 0.1 // 90% success rate
    
    if (!success) {
      throw new Error('Failed to connect to model API. Please check your configuration.')
    }
    
    return {
      success: true,
      responseTime: Math.floor(Math.random() * 1000) + 500,
      modelInfo: {
        name: config.model,
        version: '1.0.0',
        status: 'operational'
      }
    }
  },

  async getModelUsageStats(timeRange = '30d') {
    await delay(600)
    
    return {
      totalRequests: 15432,
      totalTokens: 2847293,
      averageResponseTime: currentModelConfig.avgResponseTime,
      errorRate: 0.8,
      costThisMonth: mockMetrics.apiCost,
      topEndpoints: [
        { endpoint: '/chat/completions', requests: 8234, percentage: 53.4 },
        { endpoint: '/analysis/generate', requests: 4821, percentage: 31.2 },
        { endpoint: '/recommendations/create', requests: 2377, percentage: 15.4 }
      ]
    }
  }
}

export default adminService