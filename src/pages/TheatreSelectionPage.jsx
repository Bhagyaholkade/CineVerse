import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowLeft, MapPin, Star, Calendar, Film, Wifi, Car, Accessibility, UtensilsCrossed, Check, Navigation, Loader } from 'lucide-react'
import { theatres } from '../data/moviesData'

const facilityIcons = {
  'Parking': Car,
  'Food Court': UtensilsCrossed,
  'Wheelchair Access': Accessibility,
  'Dolby Atmos': Film,
  'Recliner Seats': Film,
  'WiFi': Wifi
}

// Function to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  const distance = R * c
  return distance.toFixed(1) // Distance in km
}

export default function TheatreSelectionPage({ movie, onBack, onTheatreSelect }) {
  const [selectedDate, setSelectedDate] = useState('Today')
  const [expandedTheatre, setExpandedTheatre] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState(null)
  const [sortedTheatres, setSortedTheatres] = useState(theatres)

  const dates = [
    { label: 'Today', value: 'Today', date: 'Jan 10' },
    { label: 'Tomorrow', value: 'Tomorrow', date: 'Jan 11' },
    { label: 'Sat', value: 'Saturday', date: 'Jan 12' },
    { label: 'Sun', value: 'Sunday', date: 'Jan 13' }
  ]

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      setLocationLoading(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
          setUserLocation(location)
          setLocationLoading(false)

          // Sort theatres by distance
          const sorted = theatres.map(theatre => ({
            ...theatre,
            calculatedDistance: calculateDistance(
              location.lat,
              location.lon,
              theatre.coordinates.lat,
              theatre.coordinates.lon
            )
          })).sort((a, b) => parseFloat(a.calculatedDistance) - parseFloat(b.calculatedDistance))

          setSortedTheatres(sorted)
        },
        (error) => {
          console.error('Error getting location:', error)
          setLocationError('Unable to get your location')
          setLocationLoading(false)
          setSortedTheatres(theatres)
        }
      )
    } else {
      setLocationError('Geolocation is not supported')
      setSortedTheatres(theatres)
    }
  }, [])

  const handleShowtimeSelect = (theatre, screen, showtime) => {
    onTheatreSelect({
      theatre,
      screen,
      showtime,
      date: selectedDate
    })
  }

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLocationLoading(true)
      setLocationError(null)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
          setUserLocation(location)
          setLocationLoading(false)

          const sorted = theatres.map(theatre => ({
            ...theatre,
            calculatedDistance: calculateDistance(
              location.lat,
              location.lon,
              theatre.coordinates.lat,
              theatre.coordinates.lon
            )
          })).sort((a, b) => parseFloat(a.calculatedDistance) - parseFloat(b.calculatedDistance))

          setSortedTheatres(sorted)
        },
        (error) => {
          console.error('Error getting location:', error)
          setLocationError('Unable to get your location. Please enable location services.')
          setLocationLoading(false)
        }
      )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        paddingTop: 'clamp(80px, 12vh, 100px)',
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
          Back to Movies
        </motion.button>

        {/* Movie Info Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            display: 'flex',
            gap: '25px',
            marginBottom: '40px',
            padding: '25px',
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
              width: '100px',
              height: '150px',
              borderRadius: '12px',
              objectFit: 'cover'
            }}
          />
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: 'clamp(22px, 5vw, 32px)',
              fontWeight: '700',
              marginBottom: '8px',
              fontFamily: "'Orbitron', sans-serif"
            }}>
              {movie.title}
            </h1>
            <p style={{ color: '#888', marginBottom: '15px', fontSize: 'clamp(12px, 2.5vw, 14px)' }}>
              {Array.isArray(movie.genre) ? movie.genre.join(', ') : (movie.genre || movie.category)} • {movie.duration}{movie.language ? ` • ${movie.language}` : ''}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(255, 215, 0, 0.1)',
                border: '1px solid rgba(255, 215, 0, 0.3)'
              }}>
                <Star size={16} fill="#ffd700" color="#ffd700" />
                <span style={{ color: '#ffd700', fontSize: '14px', fontWeight: '600' }}>
                  {movie.rating}
                </span>
              </div>
              {movie.formats && movie.formats.map(format => (
                <div
                  key={format}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: 'rgba(131, 56, 236, 0.1)',
                    border: '1px solid rgba(131, 56, 236, 0.3)',
                    fontSize: '13px',
                    color: '#8338ec',
                    fontWeight: '600'
                  }}
                >
                  {format}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Location Status and Date Selection */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: '30px' }}
        >
          {/* Location Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '15px 20px',
            borderRadius: '12px',
            background: userLocation
              ? 'linear-gradient(135deg, rgba(6, 255, 165, 0.1), rgba(6, 255, 165, 0.05))'
              : locationError
              ? 'linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(255, 0, 110, 0.05))'
              : 'rgba(255, 255, 255, 0.05)',
            border: userLocation
              ? '1px solid rgba(6, 255, 165, 0.3)'
              : locationError
              ? '1px solid rgba(255, 0, 110, 0.3)'
              : '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MapPin size={20} color={userLocation ? '#06ffa5' : locationError ? '#ff006e' : '#888'} />
              <div>
                {locationLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Loader size={16} color="#8338ec" style={{ animation: 'spin 1s linear infinite' }} />
                    <span style={{ color: '#888', fontSize: '14px' }}>Getting your location...</span>
                  </div>
                ) : userLocation ? (
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#06ffa5' }}>
                      Location detected
                    </div>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                      Showing nearest theatres first
                    </div>
                  </div>
                ) : locationError ? (
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#ff006e' }}>
                      {locationError}
                    </div>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                      Showing all theatres
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: '14px', color: '#888' }}>
                    Enable location to find nearest theatres
                  </div>
                )}
              </div>
            </div>
            {!userLocation && !locationLoading && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetLocation}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #8338ec, #6a28c7)',
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Navigation size={16} />
                Get Location
              </motion.button>
            )}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '15px'
          }}>
            <Calendar size={20} color="#888" />
            <h3 style={{
              fontSize: 'clamp(18px, 3.5vw, 20px)',
              fontWeight: '600',
              fontFamily: "'Orbitron', sans-serif"
            }}>
              Select Date
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '12px' }}>
            {dates.map(({ label, value, date }) => (
              <motion.button
                key={value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDate(value)}
                style={{
                  padding: '15px 25px',
                  borderRadius: '12px',
                  border: selectedDate === value
                    ? '2px solid #ff006e'
                    : '1px solid rgba(255, 255, 255, 0.2)',
                  background: selectedDate === value
                    ? 'linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(131, 56, 236, 0.2))'
                    : 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: '600' }}>{label}</span>
                <span style={{ fontSize: '12px', color: '#888' }}>{date}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Theatres List */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontSize: 'clamp(18px, 3.5vw, 20px)',
            fontWeight: '600',
            marginBottom: '20px',
            fontFamily: "'Orbitron', sans-serif"
          }}>
            Available Theatres ({theatres.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {sortedTheatres.map((theatre, index) => (
              <motion.div
                key={theatre.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                style={{
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden'
                }}
              >
                {/* Theatre Header */}
                <div
                  style={{
                    padding: '25px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setExpandedTheatre(expandedTheatre === theatre.id ? null : theatre.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                        <h4 style={{
                          fontSize: '22px',
                          fontWeight: '700',
                          fontFamily: "'Orbitron', sans-serif"
                        }}>
                          {theatre.name}
                        </h4>
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
                        marginBottom: '15px'
                      }}>
                        <MapPin size={16} color="#888" />
                        <span style={{ color: '#888', fontSize: '14px' }}>
                          {theatre.address}
                        </span>
                        <span style={{
                          marginLeft: '10px',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: userLocation && theatre.calculatedDistance
                            ? 'rgba(6, 255, 165, 0.1)'
                            : 'rgba(255, 255, 255, 0.05)',
                          fontSize: '12px',
                          color: userLocation && theatre.calculatedDistance ? '#06ffa5' : '#888',
                          fontWeight: userLocation && theatre.calculatedDistance ? '600' : '400',
                          border: userLocation && theatre.calculatedDistance
                            ? '1px solid rgba(6, 255, 165, 0.3)'
                            : 'none'
                        }}>
                          {theatre.calculatedDistance ? `${theatre.calculatedDistance} km` : theatre.distance}
                        </span>
                      </div>

                      {/* Facilities */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {theatre.facilities.map((facility) => {
                          const Icon = facilityIcons[facility] || Check
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

                    <motion.div
                      animate={{ rotate: expandedTheatre === theatre.id ? 180 : 0 }}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        color: '#888'
                      }}
                    >
                      ▼
                    </motion.div>
                  </div>
                </div>

                {/* Screens & Showtimes */}
                <AnimatePresence>
                  {expandedTheatre === theatre.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '0 25px 25px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        {theatre.screens.map((screen, screenIndex) => (
                          <motion.div
                            key={screen.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: screenIndex * 0.1 }}
                            style={{
                              marginTop: '20px',
                              padding: '20px',
                              borderRadius: '15px',
                              background: 'rgba(255, 255, 255, 0.03)',
                              border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '15px'
                            }}>
                              <div>
                                <h5 style={{
                                  fontSize: '16px',
                                  fontWeight: '600',
                                  marginBottom: '5px',
                                  fontFamily: "'Poppins', sans-serif"
                                }}>
                                  {screen.name}
                                </h5>
                                <div style={{
                                  display: 'inline-block',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  background: screen.type === 'IMAX'
                                    ? 'linear-gradient(135deg, #ff006e, #8338ec)'
                                    : screen.type === '3D'
                                    ? 'linear-gradient(135deg, #8338ec, #3a86ff)'
                                    : 'rgba(255, 255, 255, 0.1)',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  color: 'white'
                                }}>
                                  {screen.type}
                                </div>
                              </div>
                              <div style={{
                                fontSize: '13px',
                                color: '#888'
                              }}>
                                {screen.seats.filter(s => !s.isOccupied).length} seats available
                              </div>
                            </div>

                            {/* Showtimes */}
                            <div style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '10px'
                            }}>
                              {screen.showtimes.map((showtime) => (
                                <motion.button
                                  key={showtime}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleShowtimeSelect(theatre, screen, showtime)}
                                  style={{
                                    padding: '12px 20px',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #ff006e, #8338ec)'
                                    e.currentTarget.style.borderColor = '#ff006e'
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                                  }}
                                >
                                  {showtime}
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
