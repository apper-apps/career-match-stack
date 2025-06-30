import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation()
  
const navigation = [
    { name: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
    { name: 'Self Analysis', href: '/self-analysis', icon: 'UserCheck' },
    { name: 'Recommendations', href: '/recommendations', icon: 'Target' },
    { name: 'Documents', href: '/documents', icon: 'FileText' },
    { name: 'Mock Interview', href: '/mock-interview', icon: 'MessageSquare' },
    { name: 'Applications', href: '/applications', icon: 'Briefcase' },
    { name: 'Admin Panel', href: '/admin', icon: 'Shield' },
    { name: 'Settings', href: '/settings', icon: 'Settings' }
  ]

  return (
    <motion.div
      initial={false}
      animate={{
        width: isCollapsed ? 80 : 280
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white shadow-lg border-r border-gray-200 h-full flex flex-col"
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <motion.div
          className="flex items-center"
          animate={{
            justifyContent: isCollapsed ? 'center' : 'flex-start'
          }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <ApperIcon name="Brain" size={20} className="text-white" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="ml-3"
            >
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                CareerMatchAI
              </h1>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  className="flex items-center w-full"
                  whileHover={{ x: isActive ? 0 : 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ApperIcon
                    name={item.icon}
                    size={20}
                    className={`${isCollapsed ? 'mx-auto' : 'mr-3'} ${
                      isActive ? 'text-white' : 'text-gray-500'
                    }`}
                  />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </motion.div>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-gray-200">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ApperIcon
            name={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            size={20}
          />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Sidebar