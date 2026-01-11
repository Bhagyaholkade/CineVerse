import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, Users, Calendar, Clock, MapPin } from 'lucide-react'

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const SEATS_PER_ROW = 12

function Seat({ row, number, isSelected, isOccupied, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  const getColor = () => {
    if (isOccupied) return '#444'
    if (isSelected) return 'linear-gradient(135deg, #ff006e, #8338ec)'
    return 'rgba(255, 255, 255, 0.1)'
  }

  return (
    <motion.div
      whileHover={!isOccupied ? { scale: 1.2, z: 20 } : {}}
      whileTap={!isOccupied ? { scale: 0.9 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => !isOccupied && onClick()}
      animate={{
        background: getColor(),
        rotateX: isHovered && !isOccupied ? -15 : 0,
        boxShadow: isSelected
          ? '0 10px 30px rgba(255, 0, 110, 0.6)'
          : isHovered && !isOccupied
          ? '0 5px 15px rgba(131, 56, 236, 0.4)'
          : '0 2px 5px rgba(0, 0, 0, 0.3)'
      }}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px 8px 12px 12px',
        cursor: isOccupied ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        fontWeight: '600',
        color: isOccupied ? '#666' : 'white',
        border: isSelected ? '2px solid #ff006e' : '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'all 0.3s ease'
      }}
    >
      {row}{number}
    </motion.div>
  )
}

export default function SeatSelection({ movie, theatre, onBack, onConfirm }) {
  const [selectedSeats, setSelectedSeats] = useState([])

  // Use theatre data if available, otherwise use defaults
  const screenSeats = theatre?.screen?.seats || []
  const occupiedSeats = screenSeats.filter(seat => seat.isOccupied).map(seat => seat.id) || ['A5', 'A6', 'B7', 'C4', 'C5', 'C6', 'D8', 'E5', 'F6', 'F7']

  // Get the format from the selected screen type
  const selectedFormat = theatre?.screen?.type || movie.formats[0]

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    )
  }

  const pricePerSeat = movie.price[selectedFormat] || Object.values(movie.price)[0]
  const totalPrice = selectedSeats.length * pricePerSeat

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        paddingTop: '100px',
        paddingBottom: '50px'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px'
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
          Back to Movies
        </motion.button>

        {/* Movie Info */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            display: 'flex',
            gap: '30px',
            marginBottom: '50px',
            padding: '30px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <img
            src={movie.poster}
            alt={movie.title}
            style={{
              width: '150px',
              height: '220px',
              borderRadius: '15px',
              objectFit: 'cover'
            }}
          />
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '10px',
              fontFamily: "'Orbitron', sans-serif"
            }}>
              {movie.title}
            </h1>
            <p style={{ color: '#888', marginBottom: '15px' }}>
              {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre} • {movie.duration}
            </p>

            {/* Theatre & Showtime Info */}
            {theatre && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <MapPin size={18} color="#888" />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>
                      {theatre.theatre.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#888' }}>
                      {theatre.screen.name} • {theatre.screen.type}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <Calendar size={18} color="#888" />
                    <div>
                      <div style={{ fontSize: '12px', color: '#888' }}>Date</div>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>
                        {theatre.date}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <Clock size={18} color="#888" />
                    <div>
                      <div style={{ fontSize: '12px', color: '#888' }}>Time</div>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>
                        {theatre.showtime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Screen */}
        <motion.div
          initial={{ scaleX: 0.5, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            marginBottom: '60px'
          }}
        >
          <div style={{
            height: '8px',
            background: 'linear-gradient(90deg, transparent, #fff, transparent)',
            borderRadius: '50%',
            marginBottom: '10px',
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)'
          }} />
          <p style={{
            textAlign: 'center',
            color: '#888',
            fontSize: '14px'
          }}>
            SCREEN
          </p>
        </motion.div>

        {/* Seats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            marginBottom: '40px',
            perspective: '1000px'
          }}
        >
          {ROWS.map((row, rowIndex) => (
            <motion.div
              key={row}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + rowIndex * 0.05 }}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
              }}
            >
              <span style={{
                width: '30px',
                color: '#666',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {row}
              </span>
              {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
                const seatId = `${row}${i + 1}`
                return (
                  <Seat
                    key={seatId}
                    row={row}
                    number={i + 1}
                    isSelected={selectedSeats.includes(seatId)}
                    isOccupied={occupiedSeats.includes(seatId)}
                    onClick={() => toggleSeat(seatId)}
                  />
                )
              })}
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {[
            { label: 'Available', color: 'rgba(255, 255, 255, 0.1)' },
            { label: 'Selected', color: 'linear-gradient(135deg, #ff006e, #8338ec)' },
            { label: 'Occupied', color: '#444' }
          ].map(({ label, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                background: color,
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }} />
              <span style={{ color: '#888', fontSize: '14px' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Booking Summary */}
        <AnimatePresence>
          {selectedSeats.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              style={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: '600px',
                padding: '25px 35px',
                borderRadius: '20px',
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '8px'
                }}>
                  <Users size={20} color="#888" />
                  <span style={{ color: '#888' }}>
                    {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#666' }}>
                  {selectedSeats.join(', ')}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#888', fontSize: '14px', marginBottom: '5px' }}>
                  Total
                </p>
                <p style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  ${totalPrice}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onConfirm(selectedSeats, theatre?.showtime || 'TBD', totalPrice)}
                style={{
                  padding: '15px 40px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  boxShadow: '0 10px 30px rgba(255, 0, 110, 0.4)'
                }}
              >
                Continue to Payment
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
