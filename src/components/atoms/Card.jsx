import { motion } from 'framer-motion'

const Card = ({
  children,
  hover = true,
  className = '',
  onClick,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.01 } : {}}
      className={`
        card p-6
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card