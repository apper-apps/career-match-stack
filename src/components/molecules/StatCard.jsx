import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  color = 'primary',
  className = ''
}) => {
  const colors = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    accent: 'from-accent-500 to-accent-600',
    warning: 'from-yellow-500 to-yellow-600',
    error: 'from-red-500 to-red-600'
  }

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <ApperIcon
                name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'}
                size={16}
                className={`mr-1 ${trend === 'up' ? 'text-accent-500' : 'text-red-500'}`}
              />
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-accent-500' : 'text-red-500'}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-full bg-gradient-to-r ${colors[color]}`}>
          <ApperIcon name={icon} size={24} className="text-white" />
        </div>
      </div>
      
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${colors[color]} opacity-5`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    </Card>
  )
}

export default StatCard