import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, Lock, Eye, EyeOff, User, UserPlus, AlertCircle, CheckCircle } from 'lucide-react'

export default function SignUpPage({ onSignUp, onNavigateToLogin, onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [touched, setTouched] = useState({})

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(phone.replace(/\s|-/g, ''))
  }

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return passwordRegex.test(password)
  }

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' }

    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[@$!%*?&#]/.test(password)) strength++

    if (strength <= 2) return { strength: 33, label: 'Weak', color: '#ff006e' }
    if (strength <= 4) return { strength: 66, label: 'Medium', color: '#ffbe0b' }
    return { strength: 100, label: 'Strong', color: '#06ffa5' }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name) {
      newErrors.name = 'Full name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true
    })

    if (validateForm()) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        if (onSignUp) {
          onSignUp({
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          })
        }
      }, 1500)
    }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 20px 40px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          borderRadius: '30px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '50px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 20px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #ff006e, #8338ec)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(255, 0, 110, 0.4)'
            }}
          >
            <UserPlus size={40} color="white" />
          </motion.div>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '800',
            marginBottom: '10px',
            fontFamily: "'Orbitron', sans-serif"
          }}>
            Create Account
          </h1>
          <p style={{ color: '#888', fontSize: '15px' }}>
            Join CineVerse for the ultimate movie experience
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#b0b0b0'
            }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <User
                size={20}
                color="#888"
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  borderRadius: '12px',
                  border: `1px solid ${touched.name && errors.name ? '#ff006e' : 'rgba(255, 255, 255, 0.1)'}`,
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'border-color 0.3s ease'
                }}
              />
            </div>
            <AnimatePresence>
              {touched.name && errors.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '8px',
                    color: '#ff006e',
                    fontSize: '13px'
                  }}
                >
                  <AlertCircle size={14} />
                  {errors.name}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Email Input */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#b0b0b0'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={20}
                color="#888"
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  borderRadius: '12px',
                  border: `1px solid ${touched.email && errors.email ? '#ff006e' : 'rgba(255, 255, 255, 0.1)'}`,
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'border-color 0.3s ease'
                }}
              />
            </div>
            <AnimatePresence>
              {touched.email && errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '8px',
                    color: '#ff006e',
                    fontSize: '13px'
                  }}
                >
                  <AlertCircle size={14} />
                  {errors.email}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Phone Input */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#b0b0b0'
            }}>
              Phone Number
            </label>
            <div style={{ position: 'relative' }}>
              <Phone
                size={20}
                color="#888"
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                placeholder="Enter your phone number"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  borderRadius: '12px',
                  border: `1px solid ${touched.phone && errors.phone ? '#ff006e' : 'rgba(255, 255, 255, 0.1)'}`,
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'border-color 0.3s ease'
                }}
              />
            </div>
            <AnimatePresence>
              {touched.phone && errors.phone && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '8px',
                    color: '#ff006e',
                    fontSize: '13px'
                  }}
                >
                  <AlertCircle size={14} />
                  {errors.phone}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#b0b0b0'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={20}
                color="#888"
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onBlur={() => handleBlur('password')}
                placeholder="Create a password"
                style={{
                  width: '100%',
                  padding: '14px 48px 14px 48px',
                  borderRadius: '12px',
                  border: `1px solid ${touched.password && errors.password ? '#ff006e' : 'rgba(255, 255, 255, 0.1)'}`,
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'border-color 0.3s ease'
                }}
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#888" />
                ) : (
                  <Eye size={20} color="#888" />
                )}
              </motion.button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginTop: '10px' }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '6px'
                }}>
                  <span style={{ fontSize: '12px', color: '#888' }}>
                    Password Strength
                  </span>
                  <span style={{ fontSize: '12px', color: passwordStrength.color, fontWeight: '600' }}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div style={{
                  height: '4px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${passwordStrength.strength}%` }}
                    transition={{ duration: 0.3 }}
                    style={{
                      height: '100%',
                      background: passwordStrength.color,
                      borderRadius: '2px'
                    }}
                  />
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {touched.password && errors.password && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '8px',
                    color: '#ff006e',
                    fontSize: '13px'
                  }}
                >
                  <AlertCircle size={14} />
                  {errors.password}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Confirm Password Input */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#b0b0b0'
            }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={20}
                color="#888"
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                placeholder="Confirm your password"
                style={{
                  width: '100%',
                  padding: '14px 48px 14px 48px',
                  borderRadius: '12px',
                  border: `1px solid ${
                    touched.confirmPassword && errors.confirmPassword
                      ? '#ff006e'
                      : touched.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword
                      ? '#06ffa5'
                      : 'rgba(255, 255, 255, 0.1)'
                  }`,
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'border-color 0.3s ease'
                }}
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#888" />
                ) : (
                  <Eye size={20} color="#888" />
                )}
              </motion.button>
              {touched.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    right: '50px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                >
                  <CheckCircle size={20} color="#06ffa5" />
                </motion.div>
              )}
            </div>
            <AnimatePresence>
              {touched.confirmPassword && errors.confirmPassword && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '8px',
                    color: '#ff006e',
                    fontSize: '13px'
                  }}
                >
                  <AlertCircle size={14} />
                  {errors.confirmPassword}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              background: isLoading
                ? 'rgba(255, 255, 255, 0.1)'
                : 'linear-gradient(135deg, #ff006e, #8338ec)',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontFamily: "'Poppins', sans-serif",
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%'
                  }}
                />
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Create Account
              </>
            )}
          </motion.button>
        </form>

        {/* Login Link */}
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#888'
        }}>
          Already have an account?{' '}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onNavigateToLogin}
            style={{
              background: 'none',
              border: 'none',
              color: '#ff006e',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              textDecoration: 'none'
            }}
          >
            Sign In
          </motion.button>
        </div>

        {/* Back to Home */}
        {onBack && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={onBack}
              style={{
                background: 'none',
                border: 'none',
                color: '#888',
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              ← Back to Home
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
