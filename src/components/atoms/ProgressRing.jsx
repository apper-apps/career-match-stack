import { motion } from 'framer-motion'

const ProgressRing = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = '#4F46E5',
  backgroundColor = '#E5E7EB',
  showText = true,
  children
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="progress-ring"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          className="progress-ring__circle"
          animate={{
            strokeDashoffset: offset
          }}
          transition={{
            duration: 1,
            ease: "easeInOut"
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (showText && (
          <span className="text-2xl font-bold text-gray-700">
            {Math.round(percentage)}%
          </span>
        ))}
      </div>
    </div>
  )
}

export default ProgressRing