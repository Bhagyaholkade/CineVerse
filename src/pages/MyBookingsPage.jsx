import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowLeft, Calendar, Clock, MapPin, Users, Ticket, Download, QrCode } from 'lucide-react'

export default function MyBookingsPage({ onBack, user }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('upcoming') // 'upcoming' or 'past'

  useEffect(() => {
    // Simulate fetching bookings from localStorage or API
    const fetchBookings = () => {
      try {
        const savedBookings = localStorage.getItem('userBookings')
        if (savedBookings) {
          setBookings(JSON.parse(savedBookings))
        }
      } catch (error) {
        console.error('Error loading bookings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const upcomingBookings = bookings.filter(b => new Date(b.showtime) >= new Date())
  const pastBookings = bookings.filter(b => new Date(b.showtime) < new Date())

  const displayBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        paddingTop: 'clamp(100px, 15vh, 140px)',
        paddingBottom: '50px'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(15px, 4vw, 40px)'
      }}>
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'transparent',
            border: 'none',
            color: '#888',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '30px',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          <ArrowLeft size={20} />
          Back to Home
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            marginBottom: '40px'
          }}
        >
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: '700',
            marginBottom: '10px',
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(135deg, #ff006e, #8338ec)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            My Bookings
          </h1>
          <p style={{ color: '#888', fontSize: '16px' }}>
            View and manage your movie bookings
          </p>
        </motion.div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '30px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '10px'
        }}>
          {['upcoming', 'past'].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === tab
                  ? 'linear-gradient(135deg, #ff006e, #8338ec)'
                  : 'transparent',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                textTransform: 'capitalize'
              }}
            >
              {tab} ({tab === 'upcoming' ? upcomingBookings.length : pastBookings.length})
            </motion.button>
          ))}
        </div>

        {/* Bookings List */}
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#888'
          }}>
            Loading your bookings...
          </div>
        ) : displayBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Ticket size={60} color="#444" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#888' }}>
              No {activeTab} bookings
            </h3>
            <p style={{ color: '#666', fontSize: '14px' }}>
              {activeTab === 'upcoming' 
                ? 'Book your next movie experience!' 
                : 'Your past bookings will appear here'}
            </p>
          </motion.div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '20px'
          }}>
            {displayBookings.map((booking, index) => (
              <BookingCard key={index} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function BookingCard({ booking }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: window.innerWidth <= 768 ? '20px' : '30px',
        display: 'grid',
        gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'auto 1fr auto',
        gap: '20px',
        alignItems: 'center'
      }}
    >
      {/* Movie Poster */}
      <img
        src={booking.movie?.poster || '/placeholder.jpg'}
        alt={booking.movie?.title}
        style={{
          width: window.innerWidth <= 768 ? '100%' : '120px',
          height: window.innerWidth <= 768 ? '200px' : '180px',
          borderRadius: '15px',
          objectFit: 'cover'
        }}
      />

      {/* Booking Details */}
      <div>
        <h3 style={{
          fontSize: 'clamp(18px, 3vw, 24px)',
          fontWeight: '700',
          marginBottom: '15px',
          fontFamily: "'Orbitron', sans-serif"
        }}>
          {booking.movie?.title || 'Movie Title'}
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888' }}>
            <MapPin size={16} />
            <span style={{ fontSize: '14px' }}>{booking.theatre?.name || 'Theatre'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888' }}>
            <Calendar size={16} />
            <span style={{ fontSize: '14px' }}>{booking.date || 'Date'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888' }}>
            <Clock size={16} />
            <span style={{ fontSize: '14px' }}>{booking.showtime || 'Time'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888' }}>
            <Users size={16} />
            <span style={{ fontSize: '14px' }}>{booking.seats?.length || 0} Seats: {booking.seats?.join(', ')}</span>
          </div>
        </div>

        <div style={{
          marginTop: '15px',
          padding: '10px 15px',
          borderRadius: '10px',
          background: 'rgba(255, 0, 110, 0.1)',
          border: '1px solid rgba(255, 0, 110, 0.3)',
          display: 'inline-block'
        }}>
          <span style={{ color: '#ff006e', fontWeight: '700', fontSize: '18px' }}>
            ₹{booking.totalPrice || 0}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        flexDirection: window.innerWidth <= 768 ? 'row' : 'column',
        gap: '10px'
      }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '12px 20px',
            borderRadius: '12px',
            border: '1px solid rgba(131, 56, 236, 0.5)',
            background: 'rgba(131, 56, 236, 0.1)',
            color: '#8338ec',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          <QrCode size={18} />
          View Ticket
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '12px 20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          <Download size={18} />
          Download
        </motion.button>
      </div>
    </motion.div>
  )
}
