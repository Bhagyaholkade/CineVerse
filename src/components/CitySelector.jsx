import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { MapPin, ChevronDown, Search } from 'lucide-react'
import { cities } from '../data/moviesData'

export default function CitySelector() {
  const [selectedCity, setSelectedCity] = useState(cities[0])
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          border: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          cursor: 'pointer',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        <MapPin size={18} color="#ff006e" />
        {selectedCity.name}
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
              onClick={() => setIsOpen(false)}
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
                minWidth: '280px',
                padding: '15px',
                borderRadius: '20px',
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
                zIndex: 1000
              }}
            >
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
                    padding: '10px 40px 10px 15px',
                    borderRadius: '12px',
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
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#888'
                  }}
                />
              </div>

              {/* Cities List */}
              <div style={{
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                {filteredCities.map((city) => (
                  <motion.div
                    key={city.id}
                    whileHover={{ x: 5, background: 'rgba(255, 0, 110, 0.1)' }}
                    onClick={() => {
                      setSelectedCity(city)
                      setIsOpen(false)
                      setSearchTerm('')
                    }}
                    style={{
                      padding: '12px 15px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      marginBottom: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: selectedCity.id === city.id
                        ? 'rgba(255, 0, 110, 0.15)'
                        : 'transparent',
                      border: selectedCity.id === city.id
                        ? '1px solid rgba(255, 0, 110, 0.3)'
                        : '1px solid transparent'
                    }}
                  >
                    <MapPin size={16} color="#ff006e" />
                    <span style={{
                      color: 'white',
                      fontSize: '14px',
                      fontFamily: "'Poppins', sans-serif"
                    }}>
                      {city.name}
                    </span>
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
