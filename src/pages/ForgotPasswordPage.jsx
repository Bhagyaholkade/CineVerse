import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, ArrowLeft, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ForgotPasswordPage({ onNavigateToLogin, onBack }) {
  const [method, setMethod] = useState('email') // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
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

    if (method === 'email') {
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

    // Mark fields as touched
    setTouched({
      email: true,
      phone: true
    })

    if (validateForm()) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        setIsSuccess(true)
      }, 1500)
    }
  }

  const handleBackToLogin = () => {
    setIsSuccess(false)
    if (onNavigateToLogin) {
      onNavigateToLogin()
    }
  }

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
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
                    background: 'linear-gradient(135deg, #8338ec, #3a86ff)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(131, 56, 236, 0.4)'
                  }}
                >
                  <ArrowLeft size={40} color="white" style={{ transform: 'rotate(180deg)' }} />
                </motion.div>
                <h1 style={{
                  fontSize: '36px',
                  fontWeight: '800',
                  marginBottom: '10px',
                  fontFamily: "'Orbitron', sans-serif"
                }}>
                  Forgot Password?
                </h1>
                <p style={{ color: '#888', fontSize: '15px', lineHeight: '1.6' }}>
                  No worries! Enter your {method === 'email' ? 'email address' : 'phone number'} and we'll send you instructions to reset your password.
                </p>
              </div>

              {/* Method Toggle */}
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
                    setMethod('email')
                    setErrors({})
                    setTouched({})
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: method === 'email'
                      ? 'linear-gradient(135deg, #8338ec, #3a86ff)'
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
                    setMethod('phone')
                    setErrors({})
                    setTouched({})
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: method === 'phone'
                      ? 'linear-gradient(135deg, #8338ec, #3a86ff)'
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
                  {method === 'email' && (
                    <motion.div
                      key="email"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      style={{ marginBottom: '30px' }}
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
                  {method === 'phone' && (
                    <motion.div
                      key="phone"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      style={{ marginBottom: '30px' }}
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
                      : 'linear-gradient(135deg, #8338ec, #3a86ff)',
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Reset Link
                    </>
                  )}
                </motion.button>
              </form>

              {/* Back to Login */}
              <div style={{ textAlign: 'center' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleBackToLogin}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#8338ec',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <ArrowLeft size={16} />
                  Back to Login
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
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ textAlign: 'center' }}
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                style={{
                  width: '100px',
                  height: '100px',
                  margin: '0 auto 30px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #06ffa5, #00d4ff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 40px rgba(6, 255, 165, 0.4)'
                }}
              >
                <CheckCircle size={60} color="white" />
              </motion.div>

              {/* Success Message */}
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                marginBottom: '15px',
                fontFamily: "'Orbitron', sans-serif"
              }}>
                Check Your {method === 'email' ? 'Email' : 'Phone'}!
              </h2>
              <p style={{
                color: '#b0b0b0',
                fontSize: '15px',
                lineHeight: '1.6',
                marginBottom: '30px'
              }}>
                We've sent password reset instructions to<br />
                <span style={{ color: 'white', fontWeight: '600' }}>
                  {method === 'email' ? formData.email : formData.phone}
                </span>
              </p>

              {/* Resend Timer Info */}
              <div style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '30px'
              }}>
                <p style={{
                  fontSize: '13px',
                  color: '#888',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Didn't receive the {method === 'email' ? 'email' : 'message'}? Check your spam folder or try again in a few minutes.
                </p>
              </div>

              {/* Back to Login Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBackToLogin}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #8338ec, #3a86ff)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <ArrowLeft size={20} />
                Back to Login
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
