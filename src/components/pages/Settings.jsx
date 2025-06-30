import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import LanguageSelector from "@/components/molecules/LanguageSelector";
import FormField from "@/components/molecules/FormField";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
const Settings = () => {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
const tabs = [
    { id: 'profile', name: t('profile'), icon: 'User' },
    { id: 'preferences', name: t('preferences'), icon: 'Settings' },
    { id: 'notifications', name: t('notifications'), icon: 'Bell' },
    { id: 'webhooks', name: t('integrations'), icon: 'Zap' }
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
toast.success(t('settingsSaved'))
    } catch (err) {
      toast.error(t('settingsSaveFailed'))
    } finally {
      setSaving(false)
    }
  }

  const handleTestWebhook = async () => {
try {
      if (!settings.webhooks?.webhookUrl) {
        toast.error(t('enterWebhookUrl'))
        return
      }

toast.info(t('testingWebhook'))
      
      // Simulate webhook test
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success(t('webhookTestSuccess'))
    } catch (err) {
      toast.error(t('webhookTestFailed'))
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
        <h1 className="text-3xl font-bold text-gray-900">{t('settings')}</h1>
        <p className="text-gray-600 mt-2">
          {t('settingsDesc')}
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
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('profileInformation')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<FormField
                  label={t('fullName')}
                  name="name"
                  value={settings.profile?.name || ''}
                  onChange={(value) => handleInputChange(value, 'name', 'profile')}
                  icon="User"
                />
<FormField
                  label={t('emailAddress')}
                  name="email"
                  type="email"
                  value={settings.profile?.email || ''}
                  onChange={(value) => handleInputChange(value, 'email', 'profile')}
                  icon="Mail"
                />
<FormField
                  label={t('phoneNumber')}
                  name="phone"
                  value={settings.profile?.phone || ''}
                  onChange={(value) => handleInputChange(value, 'phone', 'profile')}
                  icon="Phone"
                />
<FormField
                  label={t('location')}
                  name="location"
                  value={settings.profile?.location || ''}
                  onChange={(value) => handleInputChange(value, 'location', 'profile')}
                  icon="MapPin"
                />
              </div>
<div className="mt-6">
                <label className="form-label">{t('bio')}</label>
                <textarea
                  value={settings.profile?.bio || ''}
                  onChange={(e) => handleInputChange(e.target.value, 'bio', 'profile')}
                  className="form-input h-32 resize-none"
                  placeholder={t('tellAboutYourself')}
                />
              </div>
            </Card>
          )}

          {activeTab === 'preferences' && (
<Card className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('preferences')}</h2>
              <div className="space-y-6">
                <div>
                  <label className="form-label">{t('language')}</label>
                  <LanguageSelector
                    value={settings.preferences?.language || i18n.language}
                    onChange={(value) => {
                      handleInputChange(value, 'language', 'preferences')
                      i18n.changeLanguage(value)
                    }}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
                    <label className="form-label">{t('timezone')}</label>
                    <select
                      value={settings.preferences?.timezone || ''}
                      onChange={(e) => handleInputChange(e.target.value, 'timezone', 'preferences')}
                      className="form-input"
>
                      <option value="America/Los_Angeles">{t('pacificTime')}</option>
                      <option value="America/Denver">{t('mountainTime')}</option>
                      <option value="America/Chicago">{t('centralTime')}</option>
                      <option value="America/New_York">{t('easternTime')}</option>
                    </select>
                  </div>
                  
<div>
                    <label className="form-label">{t('dateFormat')}</label>
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
                      <p className="font-medium text-gray-900">{t('emailNotifications')}</p>
                      <p className="text-sm text-gray-500">{t('emailNotificationsDesc')}</p>
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
                      <p className="font-medium text-gray-900">{t('pushNotifications')}</p>
                      <p className="text-sm text-gray-500">{t('pushNotificationsDesc')}</p>
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
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('notificationSettings')}</h2>
              <div className="space-y-6">
{Object.entries({
                  applicationUpdates: t('applicationUpdates'),
                  interviewReminders: t('interviewReminders'),
                  newRecommendations: t('newRecommendations'),
                  weeklyDigest: t('weeklyDigest'),
                  marketingEmails: t('marketingEmails')
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
<p className="font-medium text-gray-900">{label}</p>
                      <p className="text-sm text-gray-500">
                        {key === 'applicationUpdates' && t('applicationUpdatesDesc')}
                        {key === 'interviewReminders' && t('interviewRemindersDesc')}
                        {key === 'newRecommendations' && t('newRecommendationsDesc')}
                        {key === 'weeklyDigest' && t('weeklyDigestDesc')}
                        {key === 'marketingEmails' && t('marketingEmailsDesc')}
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
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('webhookIntegration')}</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
<div>
                      <p className="font-medium text-gray-900">{t('enableWebhooks')}</p>
                      <p className="text-sm text-gray-500">{t('enableWebhooksDesc')}</p>
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
                      label={t('webhookUrl')}
                      name="webhookUrl"
                      value={settings.webhooks?.webhookUrl || ''}
                      onChange={(value) => handleInputChange(value, 'webhookUrl', 'webhooks')}
                      placeholder="https://hooks.zapier.com/hooks/catch/..."
                      icon="Link"
                    />

<div>
                      <label className="form-label">{t('aiModelSelection')}</label>
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
                      label={t('apiKey')}
                      name="apiKey"
                      type="password"
                      value={settings.webhooks?.apiKey || ''}
                      onChange={(value) => handleInputChange(value, 'apiKey', 'webhooks')}
                      placeholder={t('enterApiKey')}
                      icon="Key"
                    />

                    <div className="flex space-x-3">
                      <Button
variant="outline"
                      onClick={handleTestWebhook}
                      icon="Zap"
                    >
                      {t('testConnection')}
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
              {t('saveChanges')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings