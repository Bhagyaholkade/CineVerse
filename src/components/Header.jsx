import { motion, AnimatePresence } from 'framer-motion'
import { Film, Search, User, Menu, Mic, LogOut, Settings, Ticket, Heart, X, MapPin } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import CitySelector from './CitySelector'

export default function Header({ onVoiceSearchClick, onSearch, searchValue = '', onLogoClick, onUserClick, isAuthenticated, user, onLogout }) {
  const [scrolled, setScrolled] = useState(false)
  const [localSearch, setLocalSearch] = useState(searchValue)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const profileMenuRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth > 768) {
        setShowMobileMenu(false)
        setShowMobileSearch(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false)
      }
    }

    if (showProfileMenu || showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfileMenu, showMobileMenu])

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [showMobileMenu])

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
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: isMobile ? '12px 16px' : '20px 40px',
          background: scrolled || showMobileMenu ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none'
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogoClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '8px' : '12px',
              cursor: 'pointer',
              zIndex: 1001
            }}
          >
            <div style={{
              width: isMobile ? '38px' : '45px',
              height: isMobile ? '38px' : '45px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ff006e, #8338ec)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 5px 20px rgba(131, 56, 236, 0.4)'
            }}>
              <Film size={isMobile ? 20 : 24} color="white" />
            </div>
            <span style={{
              fontSize: isMobile ? '20px' : '28px',
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

          {!isMobile && (
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
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                  e.target.style.borderColor = 'rgba(131, 56, 236, 0.5)'
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
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
          )}

          {!isMobile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <CitySelector />
              <div ref={profileMenuRef} style={{ position: 'relative' }}>
                {isAuthenticated ? (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
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
                      {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
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
                          <div style={{
                            padding: '20px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(131, 56, 236, 0.1))'
                          }}>
                            <div style={{
                              fontSize: '16px',
                              fontWeight: '700',
                              marginBottom: '4px',
                              color: 'white',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {user?.name || user?.email || 'User'}
                            </div>
                            {user?.email && (
                              <div style={{
                                fontSize: '12px',
                                color: '#888',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>
                                {user.email}
                              </div>
                            )}
                          </div>
                          <div style={{ padding: '10px' }}>
                            {[
                              { icon: Ticket, label: 'My Bookings', color: '#8338ec' },
                              { icon: Heart, label: 'Favorites', color: '#ff006e' },
                              { icon: Settings, label: 'Settings', color: '#3a86ff' }
                            ].map((item, idx) => (
                              <motion.button
                                key={idx}
                                whileHover={{ x: 5, background: 'rgba(255, 255, 255, 0.05)' }}
                                onClick={() => setShowProfileMenu(false)}
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
                                <item.icon size={18} color={item.color} />
                                <span>{item.label}</span>
                              </motion.button>
                            ))}
                          </div>
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
                    whileTap={{ scale: 0.95 }}
                    onClick={onUserClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <User size={24} color="#888" />
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {isMobile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 1001
            }}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background: showMobileSearch ? 'linear-gradient(135deg, #ff006e, #8338ec)' : 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <Search size={20} color="white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background: showMobileMenu ? 'linear-gradient(135deg, #ff006e, #8338ec)' : 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {showMobileMenu ? <X size={22} color="white" /> : <Menu size={22} color="white" />}
              </motion.button>
            </div>
          )}
        </div>

        <AnimatePresence>
          {isMobile && showMobileSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                marginTop: '12px',
                position: 'relative'
              }}
            >
              <input
                type="text"
                placeholder="Search movies..."
                value={localSearch}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 80px 12px 16px',
                  borderRadius: '50px',
                  border: '1px solid rgba(131, 56, 236, 0.5)',
                  background: 'rgba(255, 255, 255, 0.08)',
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
                  <Mic size={16} color="white" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {isMobile && showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(5px)',
                zIndex: 998
              }}
            />
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '85%',
                maxWidth: '350px',
                background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.98), rgba(10, 10, 20, 0.98))',
                backdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
                zIndex: 999,
                overflowY: 'auto',
                padding: '80px 20px 20px'
              }}
            >
              {isAuthenticated ? (
                <div style={{
                  padding: '20px',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(131, 56, 236, 0.1))',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: '700',
                      boxShadow: '0 5px 15px rgba(255, 0, 110, 0.3)'
                    }}>
                      {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: 'white',
                        marginBottom: '4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {user?.name || user?.email || 'User'}
                      </div>
                      {user?.email && (
                        <div style={{
                          fontSize: '12px',
                          color: '#888',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {user.email}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowMobileMenu(false)
                    onUserClick()
                  }}
                  style={{
                    width: '100%',
                    padding: '15px',
                    borderRadius: '15px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    fontFamily: "'Poppins', sans-serif",
                    boxShadow: '0 5px 20px rgba(255, 0, 110, 0.3)'
                  }}
                >
                  Sign In / Sign Up
                </motion.button>
              )}
              <div style={{
                padding: '15px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#888',
                  fontSize: '12px',
                  marginBottom: '8px'
                }}>
                  <MapPin size={14} />
                  <span>LOCATION</span>
                </div>
                <CitySelector />
              </div>
              {isAuthenticated && (
                <>
                  <div style={{
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    overflow: 'hidden',
                    marginBottom: '20px'
                  }}>
                    {[
                      { icon: Ticket, label: 'My Bookings', color: '#8338ec' },
                      { icon: Heart, label: 'Favorites', color: '#ff006e' },
                      { icon: Settings, label: 'Settings', color: '#3a86ff' }
                    ].map((item, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ x: 5, background: 'rgba(255, 255, 255, 0.05)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowMobileMenu(false)}
                        style={{
                          width: '100%',
                          padding: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '15px',
                          background: 'transparent',
                          border: 'none',
                          borderBottom: idx < 2 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '15px',
                          textAlign: 'left',
                          fontFamily: "'Poppins', sans-serif"
                        }}
                      >
                        <item.icon size={20} color={item.color} />
                        <span>{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowMobileMenu(false)
                      onLogout()
                    }}
                    style={{
                      width: '100%',
                      padding: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      background: 'rgba(255, 0, 110, 0.1)',
                      border: '1px solid rgba(255, 0, 110, 0.3)',
                      borderRadius: '12px',
                      color: '#ff006e',
                      cursor: 'pointer',
                      fontSize: '15px',
                      fontWeight: '600',
                      fontFamily: "'Poppins', sans-serif"
                    }}
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </motion.button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
