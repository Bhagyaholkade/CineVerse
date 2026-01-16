import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { MapPin, ChevronDown, Search, Navigation, ShoppingBag } from 'lucide-react'
import { cities } from '../data/moviesData'

export default function CitySelector() {
  // Start with null - will be set by geolocation or fallback to Bangalore
  const [selectedCity, setSelectedCity] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [detectedCity, setDetectedCity] = useState(null)
  const [isDetecting, setIsDetecting] = useState(true) // Start as detecting

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Detect user's city based on geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      setIsDetecting(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Use reverse geocoding to get city name
            const { latitude, longitude } = position.coords
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            )
            const data = await response.json()

            // Get city from response
            const cityName = data.address.city || data.address.town || data.address.county || data.address.state

            // Check if detected city is in our cities list
            const foundCity = cities.find(c =>
              c.name.toLowerCase().includes(cityName.toLowerCase()) ||
              cityName.toLowerCase().includes(c.name.toLowerCase())
            )

            if (foundCity) {
              setSelectedCity(foundCity)
              setDetectedCity(foundCity)
            } else {
              // If exact match not found, set the city name anyway
              setDetectedCity({ id: 0, name: cityName, malls: [] })
              setSelectedCity({ id: 0, name: cityName, malls: [] })
            }
          } catch (error) {
            console.error('Error getting city name:', error)
          } finally {
            setIsDetecting(false)
          }
        },
        (error) => {
          console.error('Error getting location:', error)
          setIsDetecting(false)
          // Fallback to Bangalore if geolocation fails
          const bangaloreCity = cities.find(c => c.name === 'Bangalore') || cities[0]
          setSelectedCity(bangaloreCity)
        }
      )
    } else {
      // Geolocation not supported, use Bangalore as fallback
      setIsDetecting(false)
      const bangaloreCity = cities.find(c => c.name === 'Bangalore') || cities[0]
      setSelectedCity(bangaloreCity)
    }
  }, [])

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      setIsDetecting(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            )
            const data = await response.json()

            const cityName = data.address.city || data.address.town || data.address.county || data.address.state

            const foundCity = cities.find(c =>
              c.name.toLowerCase().includes(cityName.toLowerCase()) ||
              cityName.toLowerCase().includes(c.name.toLowerCase())
            )

            if (foundCity) {
              setSelectedCity(foundCity)
              setDetectedCity(foundCity)
            } else {
              setDetectedCity({ id: 0, name: cityName, malls: [] })
              setSelectedCity({ id: 0, name: cityName, malls: [] })
            }
          } catch (error) {
            console.error('Error getting city name:', error)
          } finally {
            setIsDetecting(false)
          }
        },
        (error) => {
          console.error('Error getting location:', error)
          setIsDetecting(false)
        }
      )
    }
  }

  const handleCitySelect = (city) => {
    setSelectedCity(city)
    setSearchTerm('')
    setIsOpen(false)
  }

  return (
    <div style={{ position: 'relative' }}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          borderRadius: '50px',
          border: detectedCity ? '1px solid rgba(6, 255, 165, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
          background: detectedCity ? 'rgba(6, 255, 165, 0.1)' : 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          cursor: 'pointer',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        {isDetecting ? (
          <Navigation size={18} color="#8338ec" style={{ animation: 'spin 1s linear infinite' }} />
        ) : (
          <MapPin size={18} color={detectedCity ? "#06ffa5" : "#ff006e"} />
        )}
        {isDetecting ? 'Detecting...' : selectedCity?.name || 'Select City'}
        <ChevronDown
          size={16}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false)
                setSearchTerm('')
              }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 999
              }}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: '60px',
                left: 0,
                minWidth: '380px',
                padding: '20px',
                borderRadius: '25px',
                background: 'rgba(10, 10, 20, 0.98)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.9)',
                zIndex: 1000
              }}
            >
              {/* Detect Location Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDetectLocation}
                disabled={isDetecting}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '15px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #06ffa5, #00d789)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: isDetecting ? 'not-allowed' : 'pointer',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontFamily: "'Poppins', sans-serif",
                  opacity: isDetecting ? 0.6 : 1,
                  boxShadow: '0 5px 20px rgba(6, 255, 165, 0.3)'
                }}
              >
                {isDetecting ? (
                  <>
                    <Navigation size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Detecting Location...
                  </>
                ) : (
                  <>
                    <Navigation size={18} />
                    Detect My Location
                  </>
                )}
              </motion.button>

              {/* Search */}
              <div style={{
                position: 'relative',
                marginBottom: '15px'
              }}>
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 45px 12px 15px',
                    borderRadius: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                />
                <Search
                  size={18}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#888'
                  }}
                />
              </div>

              {/* Cities List */}
              <div style={{
                maxHeight: '350px',
                overflowY: 'auto',
                paddingRight: '5px'
              }}>
                {filteredCities.map((city) => (
                  <motion.div
                    key={city.id}
                    whileHover={{ x: 5, background: 'rgba(255, 0, 110, 0.1)' }}
                    onClick={() => handleCitySelect(city)}
                    style={{
                      padding: '15px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      marginBottom: '8px',
                      background: selectedCity?.id === city.id
                        ? 'rgba(255, 0, 110, 0.15)'
                        : 'transparent',
                      border: selectedCity?.id === city.id
                        ? '1px solid rgba(255, 0, 110, 0.3)'
                        : '1px solid transparent'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <MapPin size={20} color="#ff006e" />
                      <div style={{ flex: 1 }}>
                        <div style={{
                          color: 'white',
                          fontSize: '15px',
                          fontWeight: '600',
                          fontFamily: "'Poppins', sans-serif",
                          marginBottom: '4px'
                        }}>
                          {city.name}
                        </div>
                        {city.malls && city.malls.length > 0 && (
                          <div style={{
                            fontSize: '12px',
                            color: '#888',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <ShoppingBag size={12} />
                            {city.malls.length} malls • {city.malls.reduce((sum, m) => sum + m.theatres, 0)} theatres
                          </div>
                        )}
                      </div>
                      {detectedCity?.id === city.id && (
                        <div style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          background: 'rgba(6, 255, 165, 0.2)',
                          border: '1px solid rgba(6, 255, 165, 0.3)',
                          fontSize: '10px',
                          color: '#06ffa5',
                          fontWeight: '600'
                        }}>
                          DETECTED
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
