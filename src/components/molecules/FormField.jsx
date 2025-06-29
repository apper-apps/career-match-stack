import Input from '@/components/atoms/Input'
import { motion } from 'framer-motion'

const FormField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  icon,
  helper,
  className = ''
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value, name)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Input
        label={label}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
        required={required}
        icon={icon}
        helper={helper}
      />
    </motion.div>
  )
}

export default FormField