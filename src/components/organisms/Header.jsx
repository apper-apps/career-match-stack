import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import LanguageSelector from '@/components/molecules/LanguageSelector'

const Header = ({ onMenuToggle }) => {
  const [language, setLanguage] = useState('en')
  const [showProfile, setShowProfile] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 px-6 flex items-center justify-between">
      {/* Left side - Menu toggle for mobile */}
      <div className="flex items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ApperIcon name="Menu" size={20} />
        </motion.button>
        
        <div className="ml-4 lg:ml-0">
          <h2 className="text-lg font-semibold text-gray-900">
            Welcome back, Sarah! 👋
          </h2>
          <p className="text-sm text-gray-500">
            Let's find your dream job today
          </p>
        </div>
      </div>

      {/* Right side - Language selector and profile */}
      <div className="flex items-center space-x-4">
        <LanguageSelector
          value={language}
          onChange={setLanguage}
        />
        
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative"
        >
          <ApperIcon name="Bell" size={20} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </motion.button>

        {/* Profile */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">S</span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium">Sarah Johnson</p>
              <p className="text-xs text-gray-500">Product Manager</p>
            </div>
            <ApperIcon name="ChevronDown" size={16} className="text-gray-400" />
          </motion.button>
        </div>
      </div>
    </header>
  )
}

export default Header