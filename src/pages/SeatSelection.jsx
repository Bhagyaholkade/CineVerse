import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, Users, Calendar, Clock, MapPin, Star, Popcorn, Coffee, Sandwich, IceCream, X, Plus, Minus, Sparkles } from 'lucide-react'

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const SEATS_PER_ROW = 12

// Best seats are typically in the middle rows and center seats
const BEST_SEATS = ['D5', 'D6', 'D7', 'D8', 'E5', 'E6', 'E7', 'E8', 'F5', 'F6', 'F7', 'F8']

// Food & Beverage items
const FOOD_ITEMS = [
  { id: 1, name: 'Classic Popcorn', icon: Popcorn, price: 5, description: 'Medium size', category: 'Snacks' },
  { id: 2, name: 'Large Popcorn', icon: Popcorn, price: 8, description: 'Family size with extra butter', category: 'Snacks' },
  { id: 3, name: 'Soft Drink', icon: Coffee, price: 4, description: 'Medium (450ml)', category: 'Drinks' },
  { id: 4, name: 'Coffee', icon: Coffee, price: 5, description: 'Hot Cappuccino', category: 'Drinks' },
  { id: 5, name: 'Nachos', icon: Sandwich, price: 7, description: 'With cheese dip', category: 'Snacks' },
  { id: 6, name: 'Ice Cream', icon: IceCream, price: 4, description: 'Vanilla or Chocolate', category: 'Desserts' },
  { id: 7, name: 'Combo 1', icon: Popcorn, price: 12, description: 'Popcorn + 2 Drinks', category: 'Combos' },
  { id: 8, name: 'Combo 2', icon: Popcorn, price: 18, description: 'Large Popcorn + Nachos + 2 Drinks', category: 'Combos' }
]

function Seat({ row, number, isSelected, isOccupied, isBestSeat, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  const getColor = () => {
    if (isOccupied) return '#444'
    if (isSelected) return 'linear-gradient(135deg, #ff006e, #8338ec)'
    if (isBestSeat && !isOccupied) return 'rgba(6, 255, 165, 0.15)'
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
          : isBestSeat && !isOccupied
          ? '0 5px 20px rgba(6, 255, 165, 0.3)'
          : isHovered && !isOccupied
          ? '0 5px 15px rgba(131, 56, 236, 0.4)'
          : '0 2px 5px rgba(0, 0, 0, 0.3)'
      }}
      style={{
        width: window.innerWidth <= 480 ? '28px' : window.innerWidth <= 768 ? '32px' : '40px',
        height: window.innerWidth <= 480 ? '28px' : window.innerWidth <= 768 ? '32px' : '40px',
        borderRadius: '6px 6px 10px 10px',
        cursor: isOccupied ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: window.innerWidth <= 480 ? '8px' : window.innerWidth <= 768 ? '9px' : '11px',
        fontWeight: '600',
        color: isOccupied ? '#666' : 'white',
        border: isSelected ? '2px solid #ff006e' : isBestSeat && !isOccupied ? '2px solid #06ffa5' : '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'all 0.3s ease'
      }}
    >
      {row}{number}
      {isBestSeat && !isOccupied && !isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#06ffa5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Star size={10} fill="white" color="white" />
        </motion.div>
      )}
    </motion.div>
  )
}

export default function SeatSelection({ movie, theatre, onBack, onConfirm }) {
  const [selectedSeats, setSelectedSeats] = useState([])
  const [foodItems, setFoodItems] = useState({})
  const [showFoodMenu, setShowFoodMenu] = useState(false)
  const [showBestSeatsOnly, setShowBestSeatsOnly] = useState(false)

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

  const addFoodItem = (itemId) => {
    setFoodItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }))
  }

  const removeFoodItem = (itemId) => {
    setFoodItems(prev => {
      const newItems = { ...prev }
      if (newItems[itemId] > 1) {
        newItems[itemId]--
      } else {
        delete newItems[itemId]
      }
      return newItems
    })
  }

  const selectBestSeats = () => {
    const availableBestSeats = BEST_SEATS.filter(seat => !occupiedSeats.includes(seat))
    const seatsToSelect = availableBestSeats.slice(0, Math.max(2, selectedSeats.length || 2))
    setSelectedSeats(seatsToSelect)
  }

  const pricePerSeat = movie.price[selectedFormat] || Object.values(movie.price)[0]
  const seatsTotal = selectedSeats.length * pricePerSeat

  const foodTotal = Object.entries(foodItems).reduce((total, [itemId, quantity]) => {
    const item = FOOD_ITEMS.find(f => f.id === parseInt(itemId))
    return total + (item ? item.price * quantity : 0)
  }, 0)

  const totalPrice = seatsTotal + foodTotal

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        paddingTop: 'clamp(80px, 12vh, 100px)',
        paddingBottom: window.innerWidth <= 768 ? '140px' : '50px'
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
          Back to Movies
        </motion.button>

        {/* Movie Info */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            display: 'flex',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            gap: window.innerWidth <= 768 ? '20px' : '30px',
            marginBottom: window.innerWidth <= 768 ? '30px' : '50px',
            padding: window.innerWidth <= 768 ? '20px' : '30px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div style={{
            display: 'flex',
            gap: '15px',
            flexDirection: window.innerWidth <= 768 ? 'row' : 'column'
          }}>
            <img
              src={movie.poster}
              alt={movie.title}
              style={{
                width: window.innerWidth <= 768 ? '120px' : '150px',
                height: window.innerWidth <= 768 ? '180px' : '220px',
                borderRadius: '15px',
                objectFit: 'cover',
                flexShrink: 0
              }}
            />
            {window.innerWidth <= 768 && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{
                  fontSize: 'clamp(20px, 5vw, 24px)',
                  fontWeight: '700',
                  marginBottom: '8px',
                  fontFamily: "'Orbitron', sans-serif",
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {movie.title}
                </h1>
                <p style={{ color: '#888', marginBottom: '10px', fontSize: '12px' }}>
                  {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre} • {movie.duration}
                </p>
              </div>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {window.innerWidth > 768 && (
              <>
                <h1 style={{
                  fontSize: 'clamp(24px, 5vw, 36px)',
                  fontWeight: '700',
                  marginBottom: '10px',
                  fontFamily: "'Orbitron', sans-serif"
                }}>
                  {movie.title}
                </h1>
                <p style={{ color: '#888', marginBottom: '15px', fontSize: 'clamp(12px, 2.5vw, 14px)' }}>
                  {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre} • {movie.duration}
                </p>
              </>
            )}

            {/* Theatre & Showtime Info */}
            {theatre && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: window.innerWidth <= 768 ? '8px' : '12px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: window.innerWidth <= 768 ? '10px 12px' : '12px 16px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <MapPin size={16} color="#888" />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: window.innerWidth <= 768 ? '13px' : '14px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {theatre.theatre.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {theatre.screen.name} • {theatre.screen.type}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: window.innerWidth <= 768 ? '8px' : '10px' }}>
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: window.innerWidth <= 768 ? '10px 12px' : '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    minWidth: 0
                  }}>
                    <Calendar size={16} color="#888" style={{ flexShrink: 0 }} />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: '10px', color: '#888' }}>Date</div>
                      <div style={{ fontSize: window.innerWidth <= 768 ? '12px' : '14px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {theatre.date}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: window.innerWidth <= 768 ? '10px 12px' : '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    minWidth: 0
                  }}>
                    <Clock size={16} color="#888" style={{ flexShrink: 0 }} />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: '10px', color: '#888' }}>Time</div>
                      <div style={{ fontSize: window.innerWidth <= 768 ? '12px' : '14px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {theatre.showtime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons - Moved Higher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(10px, 2vw, 15px)',
            marginBottom: 'clamp(30px, 5vw, 40px)'
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFoodMenu(true)}
            style={{
              padding: window.innerWidth <= 480 ? '10px 16px' : '12px 30px',
              borderRadius: '12px',
              border: '2px solid #ff006e',
              background: 'rgba(255, 0, 110, 0.1)',
              color: '#ff006e',
              fontWeight: '600',
              fontSize: window.innerWidth <= 480 ? '12px' : '14px',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 5px 20px rgba(255, 0, 110, 0.2)',
              whiteSpace: 'nowrap'
            }}
          >
            <Popcorn size={window.innerWidth <= 480 ? 14 : 18} />
            {window.innerWidth <= 480 ? 'Add Food' : 'Add Food & Beverages'}
            {Object.keys(foodItems).length > 0 && (
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#ff006e',
                color: 'white',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {Object.values(foodItems).reduce((sum, qty) => sum + qty, 0)}
              </span>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={selectBestSeats}
            style={{
              padding: window.innerWidth <= 480 ? '10px 16px' : '12px 30px',
              borderRadius: '12px',
              border: '2px solid #06ffa5',
              background: 'rgba(6, 255, 165, 0.1)',
              color: '#06ffa5',
              fontWeight: '600',
              fontSize: window.innerWidth <= 480 ? '12px' : '14px',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 5px 20px rgba(6, 255, 165, 0.2)',
              whiteSpace: 'nowrap'
            }}
          >
            <Sparkles size={window.innerWidth <= 480 ? 14 : 18} />
            {window.innerWidth <= 480 ? 'Best Seats' : 'Select Best Seats'}
          </motion.button>
        </motion.div>

        {/* Screen */}
        <motion.div
          initial={{ scaleX: 0.5, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            marginBottom: window.innerWidth <= 480 ? '30px' : window.innerWidth <= 768 ? '40px' : '60px',
            padding: window.innerWidth <= 480 ? '0 10px' : '0'
          }}
        >
          <div style={{
            height: window.innerWidth <= 480 ? '5px' : '8px',
            background: 'linear-gradient(90deg, transparent, #fff, transparent)',
            borderRadius: '50%',
            marginBottom: '10px',
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)'
          }} />
          <p style={{
            textAlign: 'center',
            color: '#888',
            fontSize: window.innerWidth <= 480 ? '11px' : '14px',
            fontWeight: '600',
            letterSpacing: '2px'
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
            gap: window.innerWidth <= 480 ? '6px' : window.innerWidth <= 768 ? '8px' : '12px',
            alignItems: 'center',
            marginBottom: '40px',
            perspective: '1000px',
            overflowX: 'auto',
            width: '100%',
            padding: window.innerWidth <= 480 ? '0 10px' : '0'
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
                gap: window.innerWidth <= 480 ? '4px' : window.innerWidth <= 768 ? '6px' : '10px',
                alignItems: 'center'
              }}
            >
              <span style={{
                width: window.innerWidth <= 480 ? '18px' : window.innerWidth <= 768 ? '22px' : '30px',
                color: '#666',
                fontSize: window.innerWidth <= 480 ? '10px' : window.innerWidth <= 768 ? '12px' : '14px',
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
                    isBestSeat={BEST_SEATS.includes(seatId)}
                    onClick={() => toggleSeat(seatId)}
                  />
                )
              })}
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 480 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(120px, 1fr))',
          justifyContent: 'center',
          gap: window.innerWidth <= 480 ? '12px' : 'clamp(15px, 3vw, 40px)',
          marginBottom: '40px',
          maxWidth: '600px',
          margin: '0 auto 40px',
          padding: window.innerWidth <= 480 ? '0 10px' : '0'
        }}>
          {[
            { label: 'Available', color: 'rgba(255, 255, 255, 0.1)' },
            { label: 'Selected', color: 'linear-gradient(135deg, #ff006e, #8338ec)' },
            { label: 'Occupied', color: '#444' },
            { label: 'Best Seats', color: 'rgba(6, 255, 165, 0.15)', border: '2px solid #06ffa5' }
          ].map(({ label, color, border }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: window.innerWidth <= 480 ? '6px' : '10px' }}>
              <div style={{
                width: window.innerWidth <= 480 ? '22px' : '30px',
                height: window.innerWidth <= 480 ? '22px' : '30px',
                borderRadius: '6px',
                background: color,
                border: border || '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                flexShrink: 0
              }}>
                {label === 'Best Seats' && (
                  <div style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: '#06ffa5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Star size={8} fill="white" color="white" />
                  </div>
                )}
              </div>
              <span style={{ color: '#888', fontSize: window.innerWidth <= 480 ? '11px' : '14px', whiteSpace: 'nowrap' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Food & Beverage Modal */}
        <AnimatePresence>
          {showFoodMenu && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFoodMenu(false)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(8px)',
                  zIndex: 1000
                }}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: window.innerWidth <= 768 ? '92%' : '80%',
                  maxWidth: '850px',
                  maxHeight: '90vh',
                  background: 'rgba(15, 15, 25, 0.98)',
                  backdropFilter: 'blur(30px)',
                  borderRadius: window.innerWidth <= 768 ? '20px' : '25px',
                  border: '2px solid rgba(255, 255, 255, 0.15)',
                  padding: window.innerWidth <= 768 ? '20px 16px' : '30px 25px',
                  zIndex: 1001,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 100px rgba(131, 56, 236, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  margin: 0
                }}
              >
                {/* Animated Background Orbs */}
                {/* Floating Food Emojis Animation - Subtle */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    overflow: 'hidden',
                    zIndex: 0,
                    borderRadius: window.innerWidth <= 768 ? '20px' : '25px'
                  }}
                >
                  {['🍿', '🥤', '🍕', '🍔', '🌭', '🍦'].map((emoji, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        y: ['100%', '-10%'],
                        x: [
                          `${10 + index * 15}%`,
                          `${15 + index * 15}%`,
                          `${10 + index * 15}%`
                        ],
                        opacity: [0, 0.15, 0.15, 0],
                        rotate: [0, 180, 360],
                        scale: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 20 + index * 3,
                        repeat: Infinity,
                        delay: index * 2,
                        ease: 'linear'
                      }}
                      style={{
                        position: 'absolute',
                        fontSize: '24px',
                        filter: 'blur(0.5px)',
                        bottom: 0
                      }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Gradient Orbs */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-10%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 0, 110, 0.3), transparent 70%)',
                    filter: 'blur(60px)',
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                />
                <motion.div
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '-20%',
                    left: '-10%',
                    width: '350px',
                    height: '350px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(131, 56, 236, 0.3), transparent 70%)',
                    filter: 'blur(70px)',
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                />

                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: window.innerWidth <= 768 ? '30px' : '40px',
                    paddingBottom: '25px',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.08)',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  <div style={{ flex: 1, textAlign: 'center', paddingRight: '40px' }}>
                    {/* Icon Badge with Animation */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1
                      }}
                      style={{
                        width: window.innerWidth <= 768 ? '80px' : '90px',
                        height: window.innerWidth <= 768 ? '80px' : '90px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.25), rgba(131, 56, 236, 0.25))',
                        border: '3px solid rgba(255, 0, 110, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: window.innerWidth <= 768 ? '36px' : '44px',
                        margin: '0 auto 20px',
                        backdropFilter: 'blur(15px)',
                        boxShadow: '0 10px 40px rgba(255, 0, 110, 0.4), inset 0 0 30px rgba(255, 0, 110, 0.2)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Rotating background gradient */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        style={{
                          position: 'absolute',
                          inset: '-50%',
                          background: 'conic-gradient(from 0deg, transparent, rgba(255, 0, 110, 0.3), transparent)',
                          pointerEvents: 'none'
                        }}
                      />
                      
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        style={{ position: 'relative', zIndex: 1 }}
                      >
                        🍿
                      </motion.div>
                      
                      {/* Orbiting mini emojis */}
                      {['🥤', '🍕', '🍦'].map((emoji, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            rotate: 360
                          }}
                          transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: 'linear'
                          }}
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0
                          }}
                        >
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: i * 0.3
                            }}
                            style={{
                              position: 'absolute',
                              top: i === 0 ? '-10px' : i === 1 ? '50%' : 'auto',
                              bottom: i === 2 ? '-10px' : 'auto',
                              right: i === 1 ? '-10px' : '50%',
                              transform: i === 1 ? 'translateY(-50%)' : i !== 0 ? 'translateX(50%)' : 'translateX(50%)',
                              fontSize: '18px'
                            }}
                          >
                            {emoji}
                          </motion.div>
                        </motion.div>
                      ))}
                      
                      {/* Pulsing glow ring */}
                      <motion.div
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.6, 0, 0.6]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        style={{
                          position: 'absolute',
                          inset: '-8px',
                          borderRadius: '50%',
                          border: '3px solid rgba(255, 0, 110, 0.8)',
                          pointerEvents: 'none'
                        }}
                      />
                    </motion.div>

                    {/* Title with shimmer effect */}
                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      style={{
                        fontSize: window.innerWidth <= 768 ? '26px' : '34px',
                        fontWeight: '800',
                        fontFamily: "'Orbitron', sans-serif",
                        marginBottom: '12px',
                        background: 'linear-gradient(135deg, #ff006e 0%, #ff3d8f 25%, #8338ec 50%, #ff3d8f 75%, #ff006e 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '1px',
                        textShadow: '0 0 40px rgba(255, 0, 110, 0.5)',
                        animation: 'shimmer 3s linear infinite'
                      }}
                    >
                      Food & Beverages
                    </motion.h2>

                    {/* Subtitle with animation */}
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      style={{
                        color: '#b8b8b8',
                        fontSize: window.innerWidth <= 768 ? '13px' : '15px',
                        lineHeight: '1.6',
                        fontWeight: '500',
                        letterSpacing: '0.3px'
                      }}
                    >
                      ✨ Grab your favorites for the ultimate movie experience
                    </motion.p>
                  </div>
                  
                  {/* Close Button */}
                  <motion.button
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    whileHover={{
                      scale: 1.15,
                      rotate: 90,
                      background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.3), rgba(131, 56, 236, 0.3))',
                      boxShadow: '0 10px 30px rgba(255, 0, 110, 0.5)'
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowFoodMenu(false)}
                    style={{
                      width: window.innerWidth <= 768 ? '42px' : '48px',
                      height: window.innerWidth <= 768 ? '42px' : '48px',
                      borderRadius: '50%',
                      border: '2px solid rgba(255, 255, 255, 0.15)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'white',
                      flexShrink: 0,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    <X size={window.innerWidth <= 768 ? 20 : 22} strokeWidth={2.5} />
                  </motion.button>
                </div>

                {/* Food Items Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth <= 768
                    ? 'repeat(2, 1fr)'
                    : 'repeat(3, 1fr)',
                  gap: window.innerWidth <= 768 ? '14px' : '20px',
                  marginBottom: window.innerWidth <= 768 ? '20px' : '30px',
                  justifyContent: 'center',
                  padding: window.innerWidth <= 768 ? '0' : '0 10px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {FOOD_ITEMS.map((item) => {
                    const Icon = item.icon
                    const quantity = foodItems[item.id] || 0

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          delay: FOOD_ITEMS.indexOf(item) * 0.1,
                          type: 'spring',
                          stiffness: 200,
                          damping: 15
                        }}
                        whileHover={{
                          y: -8,
                          scale: 1.05,
                          boxShadow: quantity > 0
                            ? '0 20px 40px rgba(255, 0, 110, 0.4), 0 0 30px rgba(131, 56, 236, 0.3)'
                            : '0 20px 40px rgba(131, 56, 236, 0.3)',
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          padding: window.innerWidth <= 768 ? '18px' : '22px',
                          borderRadius: '18px',
                          background: quantity > 0
                            ? 'linear-gradient(135deg, rgba(255, 0, 110, 0.15), rgba(131, 56, 236, 0.15))'
                            : 'rgba(255, 255, 255, 0.05)',
                          border: quantity > 0 ? '2px solid #ff006e' : '1px solid rgba(255, 255, 255, 0.15)',
                          position: 'relative',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          backdropFilter: 'blur(10px)',
                          boxShadow: quantity > 0 
                            ? '0 10px 30px rgba(255, 0, 110, 0.3)' 
                            : '0 5px 20px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        {/* Glow effect on hover */}
                        {quantity > 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'radial-gradient(circle at 50% 50%, rgba(255, 0, 110, 0.1), transparent 70%)',
                              pointerEvents: 'none'
                            }}
                          />
                        )}

                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: FOOD_ITEMS.indexOf(item) * 0.1 + 0.2 }}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            background: item.category === 'Combos' ? 'rgba(255, 0, 110, 0.2)' : 'rgba(131, 56, 236, 0.2)',
                            border: `1px solid ${item.category === 'Combos' ? '#ff006e' : '#8338ec'}`,
                            fontSize: '10px',
                            color: item.category === 'Combos' ? '#ff006e' : '#8338ec',
                            fontWeight: '600',
                            backdropFilter: 'blur(10px)'
                          }}
                        >
                          {item.category}
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: FOOD_ITEMS.indexOf(item) * 0.1 + 0.3,
                            type: 'spring',
                            stiffness: 200
                          }}
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          style={{ marginBottom: '15px' }}
                        >
                          <Icon
                            size={window.innerWidth <= 768 ? 35 : 40}
                            color={quantity > 0 ? '#ff006e' : '#8338ec'}
                            style={{ transition: 'color 0.3s ease' }}
                          />
                        </motion.div>

                        <motion.h3
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: FOOD_ITEMS.indexOf(item) * 0.1 + 0.4 }}
                          style={{
                            fontSize: window.innerWidth <= 768 ? '16px' : '18px',
                            fontWeight: '700',
                            marginBottom: '5px',
                            fontFamily: "'Poppins', sans-serif",
                            color: 'white'
                          }}
                        >
                          {item.name}
                        </motion.h3>

                        <motion.p
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: FOOD_ITEMS.indexOf(item) * 0.1 + 0.5 }}
                          style={{
                            fontSize: window.innerWidth <= 768 ? '11px' : '12px',
                            color: '#888',
                            marginBottom: '15px'
                          }}
                        >
                          {item.description}
                        </motion.p>

                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: FOOD_ITEMS.indexOf(item) * 0.1 + 0.6 }}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <motion.span
                            animate={{
                              scale: quantity > 0 ? [1, 1.2, 1] : 1
                            }}
                            transition={{ duration: 0.3 }}
                            style={{
                              fontSize: window.innerWidth <= 768 ? '18px' : '20px',
                              fontWeight: '700',
                              color: quantity > 0 ? '#06ffa5' : '#8338ec',
                              fontFamily: "'Orbitron', sans-serif",
                              transition: 'color 0.3s ease'
                            }}
                          >
                            ₹{item.price}
                          </motion.span>

                          {quantity === 0 ? (
                            <motion.button
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: FOOD_ITEMS.indexOf(item) * 0.1 + 0.7, type: 'spring' }}
                              whileHover={{
                                scale: 1.1,
                                boxShadow: '0 10px 25px rgba(255, 0, 110, 0.4)'
                              }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => addFoodItem(item.id)}
                              style={{
                                padding: window.innerWidth <= 768 ? '8px 16px' : '8px 20px',
                                borderRadius: '10px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                                color: 'white',
                                fontSize: window.innerWidth <= 768 ? '11px' : '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontFamily: "'Poppins', sans-serif",
                                boxShadow: '0 5px 15px rgba(131, 56, 236, 0.3)'
                              }}
                            >
                              + Add
                            </motion.button>
                          ) : (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring' }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '5px',
                                borderRadius: '10px',
                                background: 'rgba(255, 0, 110, 0.15)',
                                border: '2px solid #ff006e',
                                backdropFilter: 'blur(10px)'
                              }}
                            >
                              <motion.button
                                whileHover={{ scale: 1.3, rotate: -90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeFoodItem(item.id)}
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '50%',
                                  border: 'none',
                                  background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 12px rgba(255, 0, 110, 0.4)'
                                }}
                              >
                                <Minus size={14} />
                              </motion.button>

                              <motion.span
                                key={quantity}
                                initial={{ scale: 1.5, color: '#06ffa5' }}
                                animate={{ scale: 1, color: '#fff' }}
                                transition={{ duration: 0.3 }}
                                style={{
                                  fontSize: '16px',
                                  fontWeight: '700',
                                  minWidth: '25px',
                                  textAlign: 'center',
                                  fontFamily: "'Orbitron', sans-serif"
                                }}
                              >
                                {quantity}
                              </motion.span>

                              <motion.button
                                whileHover={{ scale: 1.3, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => addFoodItem(item.id)}
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '50%',
                                  border: 'none',
                                  background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 12px rgba(255, 0, 110, 0.4)'
                                }}
                              >
                                <Plus size={14} />
                              </motion.button>
                            </motion.div>
                          )}
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Total Summary */}
                {Object.keys(foodItems).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '20px 30px',
                      borderRadius: '15px',
                      background: 'rgba(255, 0, 110, 0.1)',
                      border: '1px solid rgba(255, 0, 110, 0.3)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <p style={{ color: '#888', fontSize: '14px', marginBottom: '5px' }}>
                        Food & Beverage Total
                      </p>
                      <p style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#06ffa5'
                      }}>
                        ${foodTotal}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowFoodMenu(false)}
                      style={{
                        padding: '12px 30px',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        fontFamily: "'Poppins', sans-serif"
                      }}
                    >
                      Done
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Booking Summary */}
        <AnimatePresence>
          {selectedSeats.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              style={{
                position: 'fixed',
                bottom: 'clamp(10px, 2vh, 20px)',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '95%',
                maxWidth: '700px',
                padding: 'clamp(18px, 3vw, 25px) clamp(20px, 4vw, 35px)',
                borderRadius: 'clamp(15px, 3vw, 20px)',
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '8px'
                }}>
                  <Users size={20} color="#888" />
                  <span style={{ color: '#888' }}>
                    {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'} - ${seatsTotal}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                  {selectedSeats.join(', ')}
                </p>
                {Object.keys(foodItems).length > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <Popcorn size={18} color="#888" />
                    <span style={{ color: '#888', fontSize: '14px' }}>
                      {Object.values(foodItems).reduce((sum, qty) => sum + qty, 0)} items - ${foodTotal}
                    </span>
                  </div>
                )}
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
                onClick={() => onConfirm(
                  selectedSeats,
                  theatre?.showtime || 'TBD',
                  totalPrice,
                  seatsTotal,
                  foodTotal,
                  theatre?.name || 'Theatre'
                )}
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
                  boxShadow: '0 10px 30px rgba(255, 0, 110, 0.4)',
                  whiteSpace: 'nowrap'
                }}
              >
                Continue to Payment
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      {window.innerWidth <= 768 && selectedSeats.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '15px 20px',
            background: 'rgba(0, 0, 0, 0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.5)',
            zIndex: 100
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '15px',
            marginBottom: '12px'
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '4px'
              }}>
                <Users size={16} color="#888" />
                <span style={{ color: '#888', fontSize: '13px' }}>
                  {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'}
                </span>
              </div>
              <p style={{
                fontSize: '11px',
                color: '#666',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {selectedSeats.join(', ')}
              </p>
              {Object.keys(foodItems).length > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '4px'
                }}>
                  <Popcorn size={14} color="#888" />
                  <span style={{ color: '#888', fontSize: '11px' }}>
                    {Object.values(foodItems).reduce((sum, qty) => sum + qty, 0)} items
                  </span>
                </div>
              )}
            </div>

            <div style={{ textAlign: 'right' }}>
              <p style={{ color: '#888', fontSize: '11px', marginBottom: '2px' }}>
                Total
              </p>
              <p style={{
                fontSize: '22px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1
              }}>
                ${totalPrice}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onConfirm(
              selectedSeats,
              theatre?.showtime || 'TBD',
              totalPrice,
              seatsTotal,
              foodTotal,
              theatre?.name || 'Theatre'
            )}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #ff006e, #8338ec)',
              color: 'white',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              boxShadow: '0 5px 20px rgba(255, 0, 110, 0.4)'
            }}
          >
            Continue to Payment
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}
