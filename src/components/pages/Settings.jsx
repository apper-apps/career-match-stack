import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import FormField from '@/components/molecules/FormField'
import LanguageSelector from '@/components/molecules/LanguageSelector'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'

const Settings = () => {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', name: 'Profile', icon: 'User' },
    { id: 'preferences', name: 'Preferences', icon: 'Settings' },
    { id: 'notifications', name: 'Notifications', icon: 'Bell' },
    { id: 'webhooks', name: 'Integrations', icon: 'Zap' }
  ]

  const loadSettings = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockSettings = {
        profile: {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@example.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          bio: 'Experienced product manager with a passion for creating user-centered solutions.'
        },
        preferences: {
          language: 'en',
          timezone: 'America/Los_Angeles',
          dateFormat: 'MM/DD/YYYY',
          emailNotifications: true,
          pushNotifications: true
        },
        notifications: {
          applicationUpdates: true,
          interviewReminders: true,
          newRecommendations: true,
          weeklyDigest: true,
          marketingEmails: false
        },
        webhooks: {
          webhookUrl: '',
          apiKey: '',
          enableWebhooks: false,
          selectedAI: 'gpt-4'
        }
      }
      
      setSettings(mockSettings)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  const handleInputChange = (value, name, section) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Settings saved successfully!')
    } catch (err) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleTestWebhook = async () => {
    try {
      if (!settings.webhooks?.webhookUrl) {
        toast.error('Please enter a webhook URL first')
        return
      }

      toast.info('Testing webhook connection...')
      
      // Simulate webhook test
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Webhook test successful!')
    } catch (err) {
      toast.error('Webhook test failed')
    }
  }

  if (loading) {
    return <Loading type="card" count={3} />
  }

  if (error) {
    return <Error onRetry={loadSettings} />
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account preferences and integrations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ApperIcon name={tab.icon} size={16} className="mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <Card className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Full Name"
                  name="name"
                  value={settings.profile?.name || ''}
                  onChange={(value) => handleInputChange(value, 'name', 'profile')}
                  icon="User"
                />
                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={settings.profile?.email || ''}
                  onChange={(value) => handleInputChange(value, 'email', 'profile')}
                  icon="Mail"
                />
                <FormField
                  label="Phone Number"
                  name="phone"
                  value={settings.profile?.phone || ''}
                  onChange={(value) => handleInputChange(value, 'phone', 'profile')}
                  icon="Phone"
                />
                <FormField
                  label="Location"
                  name="location"
                  value={settings.profile?.location || ''}
                  onChange={(value) => handleInputChange(value, 'location', 'profile')}
                  icon="MapPin"
                />
              </div>
              <div className="mt-6">
                <label className="form-label">Bio</label>
                <textarea
                  value={settings.profile?.bio || ''}
                  onChange={(e) => handleInputChange(e.target.value, 'bio', 'profile')}
                  className="form-input h-32 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </Card>
          )}

          {activeTab === 'preferences' && (
            <Card className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h2>
              <div className="space-y-6">
                <div>
                  <label className="form-label">Language</label>
                  <LanguageSelector
                    value={settings.preferences?.language || 'en'}
                    onChange={(value) => handleInputChange(value, 'language', 'preferences')}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Timezone</label>
                    <select
                      value={settings.preferences?.timezone || ''}
                      onChange={(e) => handleInputChange(e.target.value, 'timezone', 'preferences')}
                      className="form-input"
                    >
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/New_York">Eastern Time</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="form-label">Date Format</label>
                    <select
                      value={settings.preferences?.dateFormat || ''}
                      onChange={(e) => handleInputChange(e.target.value, 'dateFormat', 'preferences')}
                      className="form-input"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.preferences?.emailNotifications || false}
                        onChange={(e) => handleInputChange(e.target.checked, 'emailNotifications', 'preferences')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Push Notifications</p>
                      <p className="text-sm text-gray-500">Receive push notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.preferences?.pushNotifications || false}
                        onChange={(e) => handleInputChange(e.target.checked, 'pushNotifications', 'preferences')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
              <div className="space-y-6">
                {Object.entries({
                  applicationUpdates: 'Application Updates',
                  interviewReminders: 'Interview Reminders',
                  newRecommendations: 'New Recommendations',
                  weeklyDigest: 'Weekly Digest',
                  marketingEmails: 'Marketing Emails'
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{label}</p>
                      <p className="text-sm text-gray-500">
                        {key === 'applicationUpdates' && 'Get notified when your applications are updated'}
                        {key === 'interviewReminders' && 'Receive reminders before interviews'}
                        {key === 'newRecommendations' && 'Get notified about new job recommendations'}
                        {key === 'weeklyDigest' && 'Receive weekly progress summary'}
                        {key === 'marketingEmails' && 'Receive product updates and tips'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications?.[key] || false}
                        onChange={(e) => handleInputChange(e.target.checked, key, 'notifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'webhooks' && (
            <Card className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Webhook Integration</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Enable Webhooks</p>
                    <p className="text-sm text-gray-500">Connect with external automation tools</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.webhooks?.enableWebhooks || false}
                      onChange={(e) => handleInputChange(e.target.checked, 'enableWebhooks', 'webhooks')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                {settings.webhooks?.enableWebhooks && (
                  <>
                    <FormField
                      label="Webhook URL"
                      name="webhookUrl"
                      value={settings.webhooks?.webhookUrl || ''}
                      onChange={(value) => handleInputChange(value, 'webhookUrl', 'webhooks')}
                      placeholder="https://hooks.zapier.com/hooks/catch/..."
                      icon="Link"
                    />

                    <div>
                      <label className="form-label">AI Model Selection</label>
                      <select
                        value={settings.webhooks?.selectedAI || 'gpt-4'}
                        onChange={(e) => handleInputChange(e.target.value, 'selectedAI', 'webhooks')}
                        className="form-input"
                      >
                        <option value="gpt-4">GPT-4</option>
                        <option value="claude">Claude</option>
                        <option value="gemini">Gemini</option>
                      </select>
                    </div>

                    <FormField
                      label="API Key"
                      name="apiKey"
                      type="password"
                      value={settings.webhooks?.apiKey || ''}
                      onChange={(value) => handleInputChange(value, 'apiKey', 'webhooks')}
                      placeholder="Enter your API key"
                      icon="Key"
                    />

                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        onClick={handleTestWebhook}
                        icon="Zap"
                      >
                        Test Connection
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Card>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={handleSave}
              loading={saving}
              icon="Save"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings