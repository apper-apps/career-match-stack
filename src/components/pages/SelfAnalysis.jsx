import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import FormField from '@/components/molecules/FormField'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'

const SelfAnalysis = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const steps = [
    {
      title: "Personal Information",
      description: "Tell us about yourself",
      fields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true, icon: 'User' },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: 'Mail' },
        { name: 'phone', label: 'Phone Number', type: 'tel', icon: 'Phone' },
        { name: 'location', label: 'Current Location', type: 'text', icon: 'MapPin' }
      ]
    },
    {
      title: "Education & Experience",
      description: "Your academic and professional background",
      fields: [
        { name: 'education', label: 'Highest Education Level', type: 'select', required: true, options: ['High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD'] },
        { name: 'field', label: 'Field of Study', type: 'text', required: true },
        { name: 'experience', label: 'Years of Experience', type: 'number', required: true },
        { name: 'currentRole', label: 'Current Role', type: 'text' }
      ]
    },
    {
      title: "Skills & Interests",
      description: "What are you good at and passionate about?",
      fields: [
        { name: 'skills', label: 'Top 5 Skills (comma separated)', type: 'textarea', required: true },
        { name: 'interests', label: 'Career Interests', type: 'textarea', required: true },
        { name: 'strengths', label: 'Personal Strengths', type: 'textarea' },
        { name: 'goals', label: 'Career Goals', type: 'textarea' }
      ]
    },
    {
      title: "Work Preferences",
      description: "What's your ideal work environment?",
      fields: [
        { name: 'workStyle', label: 'Preferred Work Style', type: 'select', options: ['Remote', 'On-site', 'Hybrid', 'Flexible'] },
        { name: 'teamSize', label: 'Preferred Team Size', type: 'select', options: ['Small (2-10)', 'Medium (11-50)', 'Large (50+)', 'No preference'] },
        { name: 'industry', label: 'Preferred Industries', type: 'textarea' },
        { name: 'salary', label: 'Expected Salary Range', type: 'text' }
      ]
    }
  ]

  const handleInputChange = (value, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNext = () => {
    const currentStepFields = steps[currentStep].fields
    const requiredFields = currentStepFields.filter(field => field.required)
    
    // Validate required fields
    for (const field of requiredFields) {
      if (!formData[field.name]) {
        toast.error(`Please fill in ${field.label}`)
        return
      }
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      
      // Simulate webhook call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Self-analysis completed! Your profile has been analyzed.')
      
      // Reset form or navigate to results
      setFormData({})
      setCurrentStep(0)
      
    } catch (err) {
      toast.error('Failed to submit analysis. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const currentStepData = steps[currentStep]
  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Self Analysis</h1>
        <p className="text-gray-600 text-lg">
          Help us understand your background and goals to provide personalized career recommendations
        </p>
      </div>

      {/* Progress Bar */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium text-primary-600">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </Card>

      {/* Step Content */}
      <Card className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {currentStepData.title}
              </h2>
              <p className="text-gray-600">{currentStepData.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentStepData.fields.map((field) => (
                <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  {field.type === 'select' ? (
                    <div>
                      <label className="form-label">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <select
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(e.target.value, field.name)}
                        className="form-input"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : field.type === 'textarea' ? (
                    <div>
                      <label className="form-label">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <textarea
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(e.target.value, field.name)}
                        className="form-input h-32 resize-none"
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    </div>
                  ) : (
                    <FormField
                      label={field.label}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      required={field.required}
                      icon={field.icon}
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            icon="ChevronLeft"
          >
            Previous
          </Button>

          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep < steps.length - 1 ? (
            <Button
              variant="primary"
              onClick={handleNext}
              icon="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={handleSubmit}
              loading={submitting}
              icon="Check"
            >
              Complete Analysis
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

export default SelfAnalysis