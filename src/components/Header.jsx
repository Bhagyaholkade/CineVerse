import { motion, AnimatePresence } from 'framer-motion'
import { Film, Search, User, Menu, Mic, LogOut, Settings, Ticket, Heart } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import CitySelector from './CitySelector'

export default function Header({ onVoiceSearchClick, onSearch, searchValue = '', onLogoClick, onUserClick, isAuthenticated, user, onLogout }) {
  const [scrolled, setScrolled] = useState(false)
  const [localSearch, setLocalSearch] = useState(searchValue)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileMenuRef = useRef(null)

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > 50)
    })
  }

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfileMenu])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setLocalSearch(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(localSearch)
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '20px 40px',
        background: scrolled
          ? 'rgba(0, 0, 0, 0.8)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={onLogoClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '45px',
            height: '45px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ff006e, #8338ec)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 5px 20px rgba(131, 56, 236, 0.4)'
          }}>
            <Film size={24} color="white" />
          </div>
          <span style={{
            fontSize: '28px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #ff006e, #8338ec)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: "'Orbitron', sans-serif"
          }}>
            CineVerse
          </span>
        </motion.div>

        {/* Search Bar */}
        <div style={{
          flex: 1,
          maxWidth: '500px',
          margin: '0 40px',
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="Search movies..."
            value={localSearch}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            style={{
              width: '100%',
              padding: '12px 90px 12px 20px',
              borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              fontSize: '14px',
              outline: 'none',
              fontFamily: "'Poppins', sans-serif"
            }}
          />
          <div style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            gap: '5px'
          }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onVoiceSearchClick}
              style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                border: 'none',
                background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 5px 15px rgba(255, 0, 110, 0.3)'
              }}
            >
              <Mic size={18} color="white" />
            </motion.button>
            <div style={{
              width: '35px',
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Search size={20} color="#888" />
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <CitySelector />

          {/* User Profile */}
          <div ref={profileMenuRef} style={{ position: 'relative' }}>
            {isAuthenticated ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '700',
                    boxShadow: '0 5px 15px rgba(255, 0, 110, 0.3)'
                  }}
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || user?.identifier?.charAt(0).toUpperCase() || 'U'}
                </motion.div>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{
                        position: 'absolute',
                        top: '55px',
                        right: 0,
                        width: '250px',
                        background: 'rgba(20, 20, 30, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '15px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                        overflow: 'hidden',
                        zIndex: 2000
                      }}
                    >
                      {/* Profile Header */}
                      <div style={{
                        padding: '20px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(131, 56, 236, 0.1))'
                      }}>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          marginBottom: '4px',
                          color: 'white'
                        }}>
                          {user?.name || user?.email || user?.identifier || 'User'}
                        </div>
                        {user?.email && (
                          <div style={{
                            fontSize: '12px',
                            color: '#888'
                          }}>
                            {user.email}
                          </div>
                        )}
                      </div>

                      {/* Menu Items */}
                      <div style={{ padding: '10px' }}>
                        <motion.button
                          whileHover={{ x: 5, background: 'rgba(255, 255, 255, 0.05)' }}
                          onClick={() => {
                            setShowProfileMenu(false)
                            // Navigate to bookings
                          }}
                          style={{
                            width: '100%',
                            padding: '12px 15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '14px',
                            textAlign: 'left',
                            fontFamily: "'Poppins', sans-serif"
                          }}
                        >
                          <Ticket size={18} color="#8338ec" />
                          <span>My Bookings</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ x: 5, background: 'rgba(255, 255, 255, 0.05)' }}
                          onClick={() => {
                            setShowProfileMenu(false)
                            // Navigate to favorites
                          }}
                          style={{
                            width: '100%',
                            padding: '12px 15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '14px',
                            textAlign: 'left',
                            fontFamily: "'Poppins', sans-serif"
                          }}
                        >
                          <Heart size={18} color="#ff006e" />
                          <span>Favorites</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ x: 5, background: 'rgba(255, 255, 255, 0.05)' }}
                          onClick={() => {
                            setShowProfileMenu(false)
                            // Navigate to settings
                          }}
                          style={{
                            width: '100%',
                            padding: '12px 15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '14px',
                            textAlign: 'left',
                            fontFamily: "'Poppins', sans-serif"
                          }}
                        >
                          <Settings size={18} color="#3a86ff" />
                          <span>Settings</span>
                        </motion.button>
                      </div>

                      {/* Logout Button */}
                      <div style={{
                        padding: '10px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <motion.button
                          whileHover={{ x: 5, background: 'rgba(255, 0, 110, 0.1)' }}
                          onClick={() => {
                            setShowProfileMenu(false)
                            onLogout()
                          }}
                          style={{
                            width: '100%',
                            padding: '12px 15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#ff006e',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            textAlign: 'left',
                            fontFamily: "'Poppins', sans-serif"
                          }}
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={onUserClick}
                style={{ cursor: 'pointer' }}
              >
                <User size={24} color="#888" />
              </motion.div>
            )}
          </div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{ cursor: 'pointer' }}
          >
            <Menu size={24} color="#888" />
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
