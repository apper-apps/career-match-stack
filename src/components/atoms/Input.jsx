import { useState, forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = forwardRef(({ 
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  helper,
  required = false,
  disabled = false,
  className = '',
  ...props 
}, ref) => {
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const isPasswordField = type === 'password'
  const inputType = isPasswordField && showPassword ? 'text' : type

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <ApperIcon
              name={icon}
              size={18}
              className="text-gray-400"
            />
          </div>
        )}
<input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className={`
            form-input
            ${icon ? 'pl-10' : ''}
            ${isPasswordField ? 'pr-10' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${focused ? 'ring-2 ring-primary-500 border-transparent' : ''}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          `}
          {...props}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            disabled={disabled}
          >
            <ApperIcon
              name={showPassword ? 'EyeOff' : 'Eye'}
              size={18}
            />
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <ApperIcon name="AlertCircle" size={16} className="mr-1" />
          {error}
        </p>
      )}
      
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500">{helper}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input