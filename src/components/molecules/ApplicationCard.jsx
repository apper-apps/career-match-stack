import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import { format } from 'date-fns'

const ApplicationCard = ({
  companyName,
  position,
  status,
  appliedDate,
  deadline,
  nextStep,
  onStatusChange,
  onEdit,
  className = ''
}) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'applied': return 'info'
      case 'screening': return 'warning'
      case 'interview': return 'primary'
      case 'final': return 'secondary'
      case 'offer': return 'success'
      case 'rejected': return 'error'
      default: return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'applied': return 'Send'
      case 'screening': return 'FileText'
      case 'interview': return 'MessageCircle'
      case 'final': return 'Users'
      case 'offer': return 'CheckCircle'
      case 'rejected': return 'XCircle'
      default: return 'Circle'
    }
  }

  return (
    <Card className={`${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{position}</h3>
          <p className="text-gray-600 mb-2">{companyName}</p>
          <Badge variant={getStatusVariant(status)} size="sm">
            <ApperIcon name={getStatusIcon(status)} size={14} className="mr-1" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            <ApperIcon name="Edit" size={16} />
          </motion.button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Applied:</span>
          <span className="font-medium">{format(new Date(appliedDate), 'MMM dd, yyyy')}</span>
        </div>
        
        {deadline && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Deadline:</span>
            <span className="font-medium text-orange-600">
              {format(new Date(deadline), 'MMM dd, yyyy')}
            </span>
          </div>
        )}
        
        {nextStep && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-1">Next Step:</p>
            <p className="text-sm text-blue-800">{nextStep}</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
          >
            View Details
          </motion.button>
        </div>
        
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="applied">Applied</option>
          <option value="screening">Screening</option>
          <option value="interview">Interview</option>
          <option value="final">Final Round</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </Card>
  )
}

export default ApplicationCard