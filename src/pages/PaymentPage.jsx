import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, CreditCard, Wallet, Building2, CheckCircle2 } from 'lucide-react'

export default function PaymentPage({ movie, bookingDetails, onBack, onPaymentSuccess }) {
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [processing, setProcessing] = useState(false)

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', name: 'UPI', icon: Wallet },
    { id: 'netbanking', name: 'Net Banking', icon: Building2 }
  ]

  const handlePayment = () => {
    setProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      onPaymentSuccess()
    }, 2000)
  }

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '')
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned
    return formatted.slice(0, 19) // 16 digits + 3 spaces
  }

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
    }
    return cleaned
  }

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: 'clamp(100px, 15vh, 140px)',
      paddingBottom: 'clamp(20px, 5vw, 40px)',
      paddingLeft: '15px',
      paddingRight: '15px',
      color: 'white'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ArrowLeft size={24} color="white" />
          </motion.button>
          <div>
            <h1 style={{
              fontSize: 'clamp(24px, 5vw, 32px)',
              fontWeight: '700',
              fontFamily: "'Orbitron', sans-serif",
              marginBottom: '5px'
            }}>
              Payment
            </h1>
            <p style={{ color: '#888', fontSize: 'clamp(12px, 2vw, 14px)' }}>Complete your booking</p>
          </div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '30px'
        }}
          className="payment-grid-responsive"
        >
          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Payment Method Selection */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '30px',
              marginBottom: '20px'
            }}>
              <h2 style={{
                fontSize: 'clamp(18px, 3vw, 20px)',
                fontWeight: '600',
                marginBottom: '20px'
              }}>
                Select Payment Method
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '12px'
              }}>
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPayment(method.id)}
                      style={{
                        flex: 1,
                        padding: '20px',
                        borderRadius: '12px',
                        border: selectedPayment === method.id
                          ? '2px solid #ff006e'
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        background: selectedPayment === method.id
                          ? 'rgba(255, 0, 110, 0.1)'
                          : 'rgba(255, 255, 255, 0.03)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                        color: 'white'
                      }}
                    >
                      <Icon size={28} color={selectedPayment === method.id ? '#ff006e' : '#fff'} />
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {method.name}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Card Details Form */}
            {selectedPayment === 'card' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '30px'
                }}
              >
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>
                  Card Details
                </h2>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: '#aaa'
                  }}>
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '16px',
                      fontFamily: "'Poppins', sans-serif"
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: '#aaa'
                  }}>
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="JOHN DOE"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '16px',
                      fontFamily: "'Poppins', sans-serif",
                      textTransform: 'uppercase'
                    }}
                  />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      color: '#aaa'
                    }}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      maxLength="5"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'white',
                        fontSize: '16px',
                        fontFamily: "'Poppins', sans-serif"
                      }}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      color: '#aaa'
                    }}>
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      placeholder="123"
                      maxLength="3"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'white',
                        fontSize: '16px',
                        fontFamily: "'Poppins', sans-serif"
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* UPI */}
            {selectedPayment === 'upi' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '30px'
                }}
              >
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>
                  UPI Payment
                </h2>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: '#aaa'
                  }}>
                    UPI ID
                  </label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '16px',
                      fontFamily: "'Poppins', sans-serif"
                    }}
                  />
                </div>
              </motion.div>
            )}

            {/* Net Banking */}
            {selectedPayment === 'netbanking' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '30px'
                }}
              >
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>
                  Select Your Bank
                </h2>
                <select
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '16px',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  <option value="">Select Bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                </select>
              </motion.div>
            )}
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '30px',
              height: 'fit-content'
            }}
          >
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '20px'
            }}>
              Booking Summary
            </h2>

            <div style={{
              marginBottom: '20px',
              paddingBottom: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                {movie.title}
              </h3>
              <p style={{ color: '#888', fontSize: '14px' }}>
                {Array.isArray(movie.genre) ? movie.genre.join(', ') : (movie.genre || movie.category || 'Event')}
              </p>
            </div>

            <div style={{
              marginBottom: '20px',
              paddingBottom: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <span style={{ color: '#aaa' }}>Seats</span>
                <span style={{ fontWeight: '600' }}>
                  {bookingDetails.seats.join(', ')}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <span style={{ color: '#aaa' }}>Showtime</span>
                <span style={{ fontWeight: '600' }}>{bookingDetails.showtime}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span style={{ color: '#aaa' }}>Theatre</span>
                <span style={{ fontWeight: '600' }}>{bookingDetails.theatre}</span>
              </div>
            </div>

            <div style={{
              marginBottom: '30px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <span style={{ color: '#aaa' }}>Tickets ({bookingDetails.seats.length})</span>
                <span>₹{bookingDetails.seatsTotal}</span>
              </div>
              {bookingDetails.foodTotal > 0 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}>
                  <span style={{ color: '#aaa' }}>Food & Beverages</span>
                  <span>₹{bookingDetails.foodTotal}</span>
                </div>
              )}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <span style={{ color: '#aaa' }}>Convenience Fee</span>
                <span>₹{Math.round(bookingDetails.totalPrice * 0.02)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '15px',
                marginTop: '15px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '20px',
                fontWeight: '700'
              }}>
                <span>Total</span>
                <span style={{ color: '#ff006e' }}>
                  ₹{bookingDetails.totalPrice + Math.round(bookingDetails.totalPrice * 0.02)}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              disabled={processing}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: 'none',
                background: processing
                  ? 'rgba(100, 100, 100, 0.5)'
                  : 'linear-gradient(135deg, #ff006e, #8338ec)',
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                cursor: processing ? 'not-allowed' : 'pointer',
                fontFamily: "'Poppins', sans-serif",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              {processing ? (
                <>Processing...</>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  Pay ₹{bookingDetails.totalPrice + Math.round(bookingDetails.totalPrice * 0.02)}
                </>
              )}
            </motion.button>

            <p style={{
              marginTop: '15px',
              fontSize: '12px',
              color: '#666',
              textAlign: 'center'
            }}>
              By proceeding, you agree to our Terms & Conditions
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
