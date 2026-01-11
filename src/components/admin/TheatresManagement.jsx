import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Plus, Edit, Trash2, MapPin, Star, Wifi, Car, Accessibility, Film } from 'lucide-react'

export default function TheatresManagement() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTheatre, setEditingTheatre] = useState(null)

  const [theatres, setTheatres] = useState([
    {
      id: 1,
      name: 'Cineplex Downtown',
      city: 'New York',
      address: '123 Main St, Downtown',
      distance: '2.5 km',
      rating: 4.5,
      facilities: ['Parking', 'Food Court', 'Wheelchair Access'],
      screens: 2,
      totalSeats: 420
    },
    {
      id: 2,
      name: 'Star Cinema Mall',
      city: 'New York',
      address: '456 Park Ave, Central Mall',
      distance: '4.2 km',
      rating: 4.3,
      facilities: ['Parking', 'Food Court', 'Dolby Atmos'],
      screens: 1,
      totalSeats: 180
    },
    {
      id: 3,
      name: 'Mega Movies Plaza',
      city: 'New York',
      address: '789 Cinema Blvd, West End',
      distance: '6.8 km',
      rating: 4.7,
      facilities: ['Parking', 'WiFi', 'Recliner Seats'],
      screens: 2,
      totalSeats: 340
    }
  ])

  const facilityIcons = {
    'Parking': Car,
    'WiFi': Wifi,
    'Wheelchair Access': Accessibility,
    'Food Court': Film,
    'Dolby Atmos': Film,
    'Recliner Seats': Film
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '5px'
          }}>
            Manage Theatres
          </h2>
          <p style={{ color: '#888', fontSize: '14px' }}>
            {theatres.length} theatres • {theatres.reduce((sum, t) => sum + t.screens, 0)} screens
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
          Add Theatre
        </motion.button>
      </div>

      {/* Theatres List */}
      <div style={{
        display: 'grid',
        gap: '20px'
      }}>
        {theatres.map((theatre, index) => (
          <motion.div
            key={theatre.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            style={{
              padding: '30px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              gap: '20px'
            }}>
              {/* Theatre Info */}
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '10px'
                }}>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    fontFamily: "'Orbitron', sans-serif"
                  }}>
                    {theatre.name}
                  </h3>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'rgba(6, 255, 165, 0.1)',
                    border: '1px solid rgba(6, 255, 165, 0.3)'
                  }}>
                    <Star size={14} fill="#06ffa5" color="#06ffa5" />
                    <span style={{ color: '#06ffa5', fontSize: '13px', fontWeight: '600' }}>
                      {theatre.rating}
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '15px',
                  color: '#888',
                  fontSize: '14px'
                }}>
                  <MapPin size={16} />
                  {theatre.address}
                  <span style={{
                    marginLeft: '10px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    fontSize: '12px'
                  }}>
                    {theatre.distance}
                  </span>
                </div>

                {/* Stats */}
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  marginBottom: '15px'
                }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#888' }}>Screens</div>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#8338ec' }}>
                      {theatre.screens}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#888' }}>Total Seats</div>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#3a86ff' }}>
                      {theatre.totalSeats}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#888' }}>City</div>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#ff006e' }}>
                      {theatre.city}
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  {theatre.facilities.map(facility => {
                    const Icon = facilityIcons[facility] || Film
                    return (
                      <div
                        key={facility}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          fontSize: '12px',
                          color: '#b0b0b0'
                        }}
                      >
                        <Icon size={14} />
                        {facility}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: '10px'
              }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setEditingTheatre(theatre)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'rgba(131, 56, 236, 0.2)',
                    color: '#8338ec',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Edit size={18} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (confirm('Delete this theatre?')) {
                      setTheatres(theatres.filter(t => t.id !== theatre.id))
                    }
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'rgba(255, 0, 110, 0.2)',
                    color: '#ff006e',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showAddModal || editingTheatre) && (
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
              setEditingTheatre(null)
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
                background: 'rgba(20, 20, 30, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '40px'
              }}
            >
              <h2 style={{
                fontSize: '28px',
                fontWeight: '800',
                marginBottom: '30px',
                fontFamily: "'Orbitron', sans-serif"
              }}>
                {editingTheatre ? 'Edit Theatre' : 'Add New Theatre'}
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
              }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '14px', color: '#888', marginBottom: '8px', display: 'block' }}>
                    Theatre Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter theatre name"
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
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="City"
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
                    Number of Screens
                  </label>
                  <input
                    type="number"
                    placeholder="Screens"
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
                {editingTheatre ? 'Update Theatre' : 'Add Theatre'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
