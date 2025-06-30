import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import ProgressRing from '@/components/atoms/ProgressRing'
const RecommendationCard = ({
  title,
  type,
  matchScore,
  reasons,
  company,
  salary,
  location,
  onClick,
className = ''
}) => {
  const { t } = useTranslation();
  
  const getMatchColor = (score) => {
    if (score >= 80) return '#10B981'
    if (score >= 60) return '#F59E0B'
    return '#EF4444'
  }

  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <Badge variant="primary" size="sm" className="mb-2">
            {type}
          </Badge>
          {company && (
            <p className="text-sm text-gray-600 mb-1">{company}</p>
          )}
          {location && (
            <p className="text-sm text-gray-500 flex items-center">
              <ApperIcon name="MapPin" size={14} className="mr-1" />
              {location}
            </p>
          )}
        </div>
        
        <div className="flex flex-col items-center">
          <ProgressRing
            percentage={matchScore}
            size={60}
            strokeWidth={4}
            color={getMatchColor(matchScore)}
            showText={false}
          >
            <span className="text-sm font-bold text-gray-700">
              {matchScore}%
            </span>
          </ProgressRing>
          <span className="text-xs text-gray-500 mt-1">Match</span>
        </div>
      </div>
      
      {salary && (
        <div className="flex items-center mb-3">
          <ApperIcon name="DollarSign" size={16} className="text-accent-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">{salary}</span>
        </div>
      )}
      
<div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">{t('whyMatches')}</p>
        <ul className="space-y-1">
          {reasons.slice(0, 3).map((reason, index) => (
            <li key={index} className="flex items-start">
              <ApperIcon name="Check" size={14} className="text-accent-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">{reason}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <motion.div
        className="mt-4 flex items-center text-primary-600 text-sm font-medium"
whileHover={{ x: 5 }}
      >
        <span>{t('viewDetails')}</span>
        <ApperIcon name="ArrowRight" size={16} className="ml-1" />
      </motion.div>
    </Card>
  )
}

export default RecommendationCard