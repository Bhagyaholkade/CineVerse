import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react'

export default function LoginPage({ onLogin, onNavigateToSignUp, onNavigateToForgotPassword, onBack }) {
  const [loginMethod, setLoginMethod] = useState('email') // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
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

  const validateForm = () => {
    const newErrors = {}

    if (loginMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required'
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    } else {
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required'
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number'
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
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
      email: true,
      phone: true,
      password: true
    })

    if (validateForm()) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        if (onLogin) {
          // Pass user data including email/phone as identifier
          const userData = {
            email: loginMethod === 'email' ? formData.email : null,
            phone: loginMethod === 'phone' ? formData.phone : null,
            identifier: loginMethod === 'email' ? formData.email : formData.phone
          }
          onLogin(userData)
        }
      }, 1500)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(80px, 15vh, 120px) 15px 40px'
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
          borderRadius: 'clamp(20px, 4vw, 30px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: 'clamp(30px, 6vw, 50px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(30px, 5vw, 40px)' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            style={{
              width: 'clamp(60px, 12vw, 80px)',
              height: 'clamp(60px, 12vw, 80px)',
              margin: '0 auto 20px',
              borderRadius: 'clamp(15px, 3vw, 20px)',
              background: 'linear-gradient(135deg, #ff006e, #8338ec)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(255, 0, 110, 0.4)'
            }}
          >
            <LogIn size={window.innerWidth < 480 ? 30 : 40} color="white" />
          </motion.div>
          <h1 style={{
            fontSize: 'clamp(28px, 7vw, 36px)',
            fontWeight: '800',
            marginBottom: '10px',
            fontFamily: "'Orbitron', sans-serif"
          }}>
            Welcome Back
          </h1>
          <p style={{ color: '#888', fontSize: 'clamp(13px, 2.5vw, 15px)' }}>
            Sign in to continue to CineVerse
          </p>
        </div>

        {/* Login Method Toggle */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '6px',
          borderRadius: '12px'
        }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setLoginMethod('email')
              setErrors({})
            }}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: loginMethod === 'email'
                ? 'linear-gradient(135deg, #ff006e, #8338ec)'
                : 'transparent',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            <Mail size={18} />
            Email
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setLoginMethod('phone')
              setErrors({})
            }}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: loginMethod === 'phone'
                ? 'linear-gradient(135deg, #ff006e, #8338ec)'
                : 'transparent',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            <Phone size={18} />
            Phone
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Email Input */}
            {loginMethod === 'email' && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                style={{ marginBottom: '25px' }}
              >
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
              </motion.div>
            )}

            {/* Phone Input */}
            {loginMethod === 'phone' && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                style={{ marginBottom: '25px' }}
              >
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Password Input */}
          <div style={{ marginBottom: '20px' }}>
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
                placeholder="Enter your password"
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

          {/* Forgot Password Link */}
          <div style={{ textAlign: 'right', marginBottom: '30px' }}>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              onClick={onNavigateToForgotPassword}
              style={{
                background: 'none',
                border: 'none',
                color: '#8338ec',
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                textDecoration: 'none'
              }}
            >
              Forgot Password?
            </motion.button>
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
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#888'
        }}>
          Don't have an account?{' '}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onNavigateToSignUp}
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
            Sign Up
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
