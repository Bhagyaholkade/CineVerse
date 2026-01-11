import { motion } from 'framer-motion'
import { CheckCircle, Download, Home, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function BookingConfirmation({ movie, seats, showtime, totalPrice, onBackHome }) {
  const [confetti, setConfetti] = useState([])

  useEffect(() => {
    const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20,
      rotation: Math.random() * 360,
      color: ['#ff006e', '#8338ec', '#3a86ff', '#FFD700'][Math.floor(Math.random() * 4)]
    }))
    setConfetti(confettiPieces)
  }, [])

  const bookingId = `BK${Date.now().toString().slice(-8)}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Confetti */}
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: piece.x,
            y: piece.y,
            rotate: piece.rotation,
            opacity: 1
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: piece.rotation + 360,
            opacity: 0
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            ease: 'linear'
          }}
          style={{
            position: 'fixed',
            width: '10px',
            height: '10px',
            background: piece.color,
            borderRadius: '2px',
            zIndex: 1000
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        style={{
          maxWidth: '600px',
          width: '100%',
          padding: '50px',
          borderRadius: '30px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '30px'
          }}
        >
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff006e, #8338ec)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 60px rgba(255, 0, 110, 0.4)'
          }}>
            <CheckCircle size={60} color="white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: '42px',
            fontWeight: '800',
            marginBottom: '15px',
            background: 'linear-gradient(135deg, #ff006e, #8338ec)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: "'Orbitron', sans-serif"
          }}
        >
          Booking Confirmed!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            color: '#888',
            fontSize: '16px',
            marginBottom: '40px'
          }}
        >
          Your tickets have been successfully booked
        </motion.p>

        {/* Booking Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            padding: '30px',
            borderRadius: '20px',
            background: 'rgba(0, 0, 0, 0.3)',
            marginBottom: '30px',
            textAlign: 'left'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <span style={{ color: '#888' }}>Booking ID</span>
            <span style={{
              fontWeight: '600',
              fontFamily: "'Orbitron', sans-serif",
              color: '#fff'
            }}>
              {bookingId}
            </span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '15px'
          }}>
            <span style={{ color: '#888' }}>Movie</span>
            <span style={{ fontWeight: '600', color: '#fff' }}>{movie.title}</span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '15px'
          }}>
            <span style={{ color: '#888' }}>Showtime</span>
            <span style={{ fontWeight: '600', color: '#fff' }}>{showtime}</span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '15px'
          }}>
            <span style={{ color: '#888' }}>Seats</span>
            <span style={{ fontWeight: '600', color: '#fff' }}>{seats.join(', ')}</span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <span style={{ color: '#888', fontSize: '18px' }}>Total Paid</span>
            <span style={{
              fontSize: '28px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #ff006e, #8338ec)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ${totalPrice}
            </span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            display: 'flex',
            gap: '15px',
            marginBottom: '20px'
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              flex: 1,
              padding: '15px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            <Download size={20} />
            Download Ticket
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              flex: 1,
              padding: '15px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            <Mail size={20} />
            Email Ticket
          </motion.button>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBackHome}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #ff006e, #8338ec)',
            color: 'white',
            fontWeight: '600',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            fontFamily: "'Poppins', sans-serif",
            boxShadow: '0 10px 30px rgba(255, 0, 110, 0.4)'
          }}
        >
          <Home size={20} />
          Back to Home
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: '30px',
            color: '#666',
            fontSize: '13px'
          }}
        >
          A confirmation email has been sent to your registered email address
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
