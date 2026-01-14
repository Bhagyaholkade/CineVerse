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

        {/* Best Seats Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '40px'
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={selectBestSeats}
            style={{
              padding: '12px 30px',
              borderRadius: '12px',
              border: '2px solid #06ffa5',
              background: 'rgba(6, 255, 165, 0.1)',
              color: '#06ffa5',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 5px 20px rgba(6, 255, 165, 0.2)'
            }}
          >
            <Sparkles size={18} />
            Select Best Seats
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFoodMenu(true)}
            style={{
              padding: '12px 30px',
              borderRadius: '12px',
              border: '2px solid #ff006e',
              background: 'rgba(255, 0, 110, 0.1)',
              color: '#ff006e',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 5px 20px rgba(255, 0, 110, 0.2)'
            }}
          >
            <Popcorn size={18} />
            Add Food & Beverages
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
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {[
            { label: 'Available', color: 'rgba(255, 255, 255, 0.1)' },
            { label: 'Selected', color: 'linear-gradient(135deg, #ff006e, #8338ec)' },
            { label: 'Occupied', color: '#444' },
            { label: 'Best Seats', color: 'rgba(6, 255, 165, 0.15)', border: '2px solid #06ffa5' }
          ].map(({ label, color, border }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                background: color,
                border: border || '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative'
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
              <span style={{ color: '#888', fontSize: '14px' }}>{label}</span>
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
                  background: 'rgba(0, 0, 0, 0.8)',
                  zIndex: 1000
                }}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  maxWidth: '900px',
                  maxHeight: '80vh',
                  background: 'rgba(10, 10, 20, 0.98)',
                  backdropFilter: 'blur(30px)',
                  borderRadius: '25px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '40px',
                  zIndex: 1001,
                  overflow: 'auto',
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9)'
                }}
              >
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '30px'
                }}>
                  <div>
                    <h2 style={{
                      fontSize: '32px',
                      fontWeight: '800',
                      fontFamily: "'Orbitron', sans-serif",
                      marginBottom: '5px'
                    }}>
                      Food & Beverages
                    </h2>
                    <p style={{ color: '#888', fontSize: '14px' }}>
                      Grab your favorites for the show
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowFoodMenu(false)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'white'
                    }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                {/* Food Items Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '20px',
                  marginBottom: '30px'
                }}>
                  {FOOD_ITEMS.map((item) => {
                    const Icon = item.icon
                    const quantity = foodItems[item.id] || 0

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        style={{
                          padding: '20px',
                          borderRadius: '20px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: quantity > 0 ? '2px solid #ff006e' : '1px solid rgba(255, 255, 255, 0.1)',
                          position: 'relative'
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          background: item.category === 'Combos' ? 'rgba(255, 0, 110, 0.2)' : 'rgba(131, 56, 236, 0.2)',
                          border: `1px solid ${item.category === 'Combos' ? '#ff006e' : '#8338ec'}`,
                          fontSize: '10px',
                          color: item.category === 'Combos' ? '#ff006e' : '#8338ec',
                          fontWeight: '600'
                        }}>
                          {item.category}
                        </div>

                        <Icon size={40} color="#ff006e" style={{ marginBottom: '15px' }} />

                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          marginBottom: '5px',
                          fontFamily: "'Poppins', sans-serif"
                        }}>
                          {item.name}
                        </h3>

                        <p style={{
                          fontSize: '12px',
                          color: '#888',
                          marginBottom: '15px'
                        }}>
                          {item.description}
                        </p>

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#06ffa5'
                          }}>
                            ${item.price}
                          </span>

                          {quantity === 0 ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => addFoodItem(item.id)}
                              style={{
                                padding: '8px 20px',
                                borderRadius: '10px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontFamily: "'Poppins', sans-serif"
                              }}
                            >
                              Add
                            </motion.button>
                          ) : (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '5px',
                              borderRadius: '10px',
                              background: 'rgba(255, 0, 110, 0.1)',
                              border: '1px solid #ff006e'
                            }}>
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeFoodItem(item.id)}
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '50%',
                                  border: 'none',
                                  background: '#ff006e',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer'
                                }}
                              >
                                <Minus size={14} />
                              </motion.button>

                              <span style={{
                                fontSize: '16px',
                                fontWeight: '700',
                                minWidth: '25px',
                                textAlign: 'center'
                              }}>
                                {quantity}
                              </span>

                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => addFoodItem(item.id)}
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '50%',
                                  border: 'none',
                                  background: '#ff006e',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer'
                                }}
                              >
                                <Plus size={14} />
                              </motion.button>
                            </div>
                          )}
                        </div>
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
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: '700px',
                padding: '25px 35px',
                borderRadius: '20px',
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
    </motion.div>
  )
}
