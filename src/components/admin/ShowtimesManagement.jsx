import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Plus, Clock, Film, Building2, Calendar, Trash2, Edit2, DollarSign, X } from 'lucide-react'

export default function ShowtimesManagement() {
  const [selectedTheatre, setSelectedTheatre] = useState('all')
  const [selectedDate, setSelectedDate] = useState('today')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingShowtime, setEditingShowtime] = useState(null)

  const theatres = [
    { id: 'all', name: 'All Theatres' },
    { id: 1, name: 'Cineplex Downtown' },
    { id: 2, name: 'Star Cinema Mall' },
    { id: 3, name: 'Mega Movies Plaza' }
  ]

  const [showtimes, setShowtimes] = useState([
    {
      id: 1,
      movie: 'Cosmic Odyssey',
      theatre: 'Cineplex Downtown',
      screen: 'Screen 1 - IMAX',
      date: '2024-01-12',
      times: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM'],
      price: { '2D': 12, '3D': 15, 'IMAX': 20 },
      occupancy: 65
    },
    {
      id: 2,
      movie: 'Neon Dreams',
      theatre: 'Star Cinema Mall',
      screen: 'Screen 1 - 2D',
      date: '2024-01-12',
      times: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM'],
      price: { '2D': 12, '3D': 15 },
      occupancy: 45
    },
    {
      id: 3,
      movie: 'Cosmic Odyssey',
      theatre: 'Mega Movies Plaza',
      screen: 'Screen 2 - IMAX',
      date: '2024-01-12',
      times: ['11:30 AM', '3:00 PM', '6:30 PM', '10:00 PM'],
      price: { '2D': 12, '3D': 15, 'IMAX': 20 },
      occupancy: 80
    }
  ])

  const dates = [
    { id: 'today', label: 'Today', date: 'Jan 12' },
    { id: 'tomorrow', label: 'Tomorrow', date: 'Jan 13' },
    { id: 'weekend', label: 'This Weekend', date: 'Jan 14-15' }
  ]

  const getOccupancyColor = (occupancy) => {
    if (occupancy >= 80) return '#ff006e'
    if (occupancy >= 50) return '#ffbe0b'
    return '#06ffa5'
  }

  const handleDeleteShowtime = (id) => {
    if (confirm('Are you sure you want to delete this showtime?')) {
      setShowtimes(showtimes.filter(s => s.id !== id))
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '5px'
          }}>
            Manage Showtimes
          </h2>
          <p style={{ color: '#888', fontSize: '14px' }}>
            {showtimes.length} active showtimes
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '12px 24px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #ff006e, #8338ec)',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          <Plus size={18} />
          Add Showtime
        </motion.button>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '15px',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {/* Theatre Filter */}
        <div>
          <label style={{ fontSize: '12px', color: '#888', marginBottom: '8px', display: 'block' }}>
            Theatre
          </label>
          <select
            value={selectedTheatre}
            onChange={(e) => setSelectedTheatre(e.target.value)}
            style={{
              padding: '10px 15px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer',
              minWidth: '200px'
            }}
          >
            {theatres.map(theatre => (
              <option key={theatre.id} value={theatre.id} style={{ background: '#1a1a1f' }}>
                {theatre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label style={{ fontSize: '12px', color: '#888', marginBottom: '8px', display: 'block' }}>
            Date
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {dates.map(date => (
              <motion.button
                key={date.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDate(date.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: selectedDate === date.id ? '2px solid #ff006e' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: selectedDate === date.id ? 'rgba(255, 0, 110, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span style={{ fontWeight: '600' }}>{date.label}</span>
                <span style={{ fontSize: '11px', color: '#888' }}>{date.date}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Showtimes Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '25px'
      }}>
        {showtimes.map((showtime, index) => (
          <motion.div
            key={showtime.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            style={{
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '25px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Gradient Background */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '150px',
              height: '150px',
              background: `radial-gradient(circle, ${getOccupancyColor(showtime.occupancy)}22 0%, transparent 70%)`,
              pointerEvents: 'none'
            }} />

            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              marginBottom: '15px',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <Film size={18} color="#ff006e" />
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    fontFamily: "'Orbitron', sans-serif"
                  }}>
                    {showtime.movie}
                  </h3>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: '#888',
                  marginBottom: '4px'
                }}>
                  <Building2 size={14} />
                  {showtime.theatre}
                </div>

                <div style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(131, 56, 236, 0.2)',
                  border: '1px solid rgba(131, 56, 236, 0.4)',
                  fontSize: '12px',
                  color: '#8338ec',
                  fontWeight: '600'
                }}>
                  {showtime.screen}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setEditingShowtime(showtime)}
                  style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(131, 56, 236, 0.2)',
                    color: '#8338ec',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Edit2 size={16} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteShowtime(showtime.id)}
                  style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 0, 110, 0.2)',
                    color: '#ff006e',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </div>

            {/* Showtimes */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              marginBottom: '15px'
            }}>
              {showtime.times.map((time, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  <Clock size={14} color="#888" />
                  {time}
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '15px'
            }}>
              {Object.entries(showtime.price).map(([format, price]) => (
                <div
                  key={format}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    background: 'rgba(58, 134, 255, 0.1)',
                    border: '1px solid rgba(58, 134, 255, 0.2)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '11px', color: '#888', marginBottom: '2px' }}>
                    {format}
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#3a86ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}>
                    <DollarSign size={14} />
                    {price}
                  </div>
                </div>
              ))}
            </div>

            {/* Occupancy */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '12px', color: '#888' }}>Occupancy</span>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: getOccupancyColor(showtime.occupancy)
                }}>
                  {showtime.occupancy}%
                </span>
              </div>

              <div style={{
                height: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${showtime.occupancy}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${getOccupancyColor(showtime.occupancy)}, ${getOccupancyColor(showtime.occupancy)}cc)`,
                    borderRadius: '3px'
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showAddModal || editingShowtime) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={() => {
              setShowAddModal(false)
              setEditingShowtime(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '700px',
                maxHeight: '85vh',
                overflow: 'auto',
                background: 'rgba(20, 20, 30, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '40px'
              }}
            >
              {/* Modal Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px'
              }}>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  fontFamily: "'Orbitron', sans-serif"
                }}>
                  {editingShowtime ? 'Edit Showtime' : 'Add New Showtime'}
                </h2>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingShowtime(null)
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
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

              {/* Form */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
              }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '14px', color: '#888', marginBottom: '8px', display: 'block' }}>
                    Select Movie
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="" style={{ background: '#1a1a1f' }}>Choose movie...</option>
                    <option value="1" style={{ background: '#1a1a1f' }}>Cosmic Odyssey</option>
                    <option value="2" style={{ background: '#1a1a1f' }}>Neon Dreams</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '14px', color: '#888', marginBottom: '8px', display: 'block' }}>
                    Theatre
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="" style={{ background: '#1a1a1f' }}>Choose theatre...</option>
                    <option value="1" style={{ background: '#1a1a1f' }}>Cineplex Downtown</option>
                    <option value="2" style={{ background: '#1a1a1f' }}>Star Cinema Mall</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '14px', color: '#888', marginBottom: '8px', display: 'block' }}>
                    Screen
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="" style={{ background: '#1a1a1f' }}>Choose screen...</option>
                    <option value="1" style={{ background: '#1a1a1f' }}>Screen 1 - IMAX</option>
                    <option value="2" style={{ background: '#1a1a1f' }}>Screen 2 - 3D</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '14px', color: '#888', marginBottom: '8px', display: 'block' }}>
                    Date
                  </label>
                  <input
                    type="date"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '14px', color: '#888', marginBottom: '8px', display: 'block' }}>
                    Add Showtime
                  </label>
                  <input
                    type="time"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '30px'
                }}
              >
                {editingShowtime ? 'Update Showtime' : 'Add Showtime'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
