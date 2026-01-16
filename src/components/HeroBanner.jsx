import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Play, Info, Star, Clock, Calendar } from 'lucide-react'
import { bannerMovies } from '../data/moviesData'

export default function HeroBanner({ onBookNow, onMoreInfo }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(timer)
  }, [currentSlide])

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % bannerMovies.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + bannerMovies.length) % bannerMovies.length)
  }

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  const movie = bannerMovies[currentSlide]

  return (
    <div style={{
      position: 'relative',
      minHeight: isMobile ? 'auto' : '100vh',
      width: '100%',
      overflow: 'hidden',
      marginTop: '80px',
      paddingTop: isMobile ? '10px' : '40px',
      paddingBottom: isMobile ? '40px' : '180px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Animated Background Particles */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, rgba(131, 56, 236, 0.1), transparent 70%)',
        zIndex: 0
      }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#8338ec',
              boxShadow: '0 0 10px #8338ec'
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1400px',
        padding: isMobile ? '0 20px' : '0 60px',
        zIndex: 1
      }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '20px' : '60px',
              alignItems: 'center',
              minHeight: isMobile ? 'auto' : '600px'
            }}
          >
            {/* Left Side - Movie Poster Card */}
            <motion.div
              initial={{ x: -200, opacity: 0, rotateY: -30 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              exit={{ x: -200, opacity: 0, rotateY: 30 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.6, 0.05, 0.01, 0.9]
              }}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: -5
                }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'relative',
                  borderRadius: '30px',
                  overflow: 'hidden',
                  boxShadow: '0 40px 100px rgba(0, 0, 0, 0.8)',
                  transformStyle: 'preserve-3d',
                  width: '100%'
                }}
              >
                {/* Poster Image */}
                <img
                  src={movie.backdrop}
                  alt={movie.title}
                  style={{
                    width: '100%',
                    height: isMobile ? '300px' : '700px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '60%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
                  padding: '40px 30px 30px'
                }}>
                  {/* Rating Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 10px 30px rgba(255, 0, 110, 0.5)',
                      border: '3px solid rgba(0, 0, 0, 0.8)',
                      zIndex: 10
                    }}
                  >
                    <Star size={18} fill="#FFD700" color="#FFD700" />
                    <span style={{ 
                      fontSize: '18px', 
                      fontWeight: '800',
                      marginTop: '3px'
                    }}>
                      {movie.rating || '8.5'}
                    </span>
                  </motion.div>

                  {/* Movie Info */}
                  <div style={{
                    display: 'flex',
                    gap: '15px',
                    marginBottom: '15px',
                    flexWrap: 'wrap'
                  }}>
                    {movie.genre?.split(', ').slice(0, 2).map((genre, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        style={{
                          padding: '6px 16px',
                          borderRadius: '20px',
                          background: 'rgba(131, 56, 236, 0.3)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(131, 56, 236, 0.5)',
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#fff'
                        }}
                      >
                        {genre}
                      </motion.span>
                    ))}
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    style={{
                      display: 'flex',
                      gap: '20px',
                      fontSize: '14px',
                      color: '#b0b0b0'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={16} />
                      <span>{movie.duration || '2h 30m'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={16} />
                      <span>{movie.releaseDate || '2024'}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Glow Effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(131, 56, 236, 0.2))',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  pointerEvents: 'none'
                }} />
              </motion.div>
            </motion.div>

            {/* Right Side - Content */}
            <div style={{ position: 'relative' }}>
              {/* Decorative Element */}
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '-40px',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                  opacity: 0.1,
                  filter: 'blur(40px)'
                }}
              />

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Status Badge */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    display: isMobile ? 'none' : 'inline-block',
                    padding: '10px 24px',
                    borderRadius: '30px',
                    background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(131, 56, 236, 0.2))',
                    border: '2px solid rgba(255, 0, 110, 0.5)',
                    marginBottom: '25px',
                    fontSize: '14px',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: '#ff006e'
                  }}
                >
                  {movie.status === 'now-showing' ? '🎬 Now Showing' : '🔜 Coming Soon'}
                </motion.div>

                {/* Title with Animated Gradient */}
                <motion.h1
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  style={{
                    fontSize: isMobile ? '32px' : '56px',
                    fontWeight: '900',
                    marginBottom: isMobile ? '12px' : '20px',
                    fontFamily: "'Orbitron', sans-serif",
                    lineHeight: '1.1',
                    position: 'relative'
                  }}
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                    style={{
                      background: 'linear-gradient(90deg, #ff006e, #8338ec, #3a86ff, #ff006e)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      display: 'inline-block'
                    }}
                  >
                    {movie.title}
                  </motion.span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  style={{
                    fontSize: isMobile ? '14px' : '19px',
                    color: '#b0b0b0',
                    marginBottom: isMobile ? '20px' : '30px',
                    fontWeight: '300',
                    fontStyle: 'italic',
                    lineHeight: '1.5'
                  }}
                >
                  {movie.tagline}
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '12px' : '20px',
                    marginBottom: isMobile ? '0' : '40px'
                  }}
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 20px 60px rgba(255, 0, 110, 0.6)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onBookNow(movie.id)}
                    style={{
                      padding: isMobile ? '14px 30px' : '18px 40px',
                      fontSize: isMobile ? '15px' : '17px',
                      fontWeight: '700',
                      borderRadius: '50px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 15px 40px rgba(255, 0, 110, 0.4)',
                      position: 'relative',
                      overflow: 'hidden',
                      width: isMobile ? '100%' : 'auto'
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    >
                      <Play size={22} fill="white" />
                    </motion.div>
                    Book Tickets
                  </motion.button>

                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      background: 'rgba(255, 255, 255, 0.15)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onMoreInfo(movie.id)}
                    style={{
                      padding: isMobile ? '14px 30px' : '18px 40px',
                      fontSize: isMobile ? '15px' : '17px',
                      fontWeight: '700',
                      borderRadius: '50px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      fontFamily: "'Poppins', sans-serif",
                      transition: 'all 0.3s',
                      width: isMobile ? '100%' : 'auto'
                    }}
                  >
                    <Info size={22} />
                    More Info
                  </motion.button>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  style={{
                    display: isMobile ? 'none' : 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '15px'
                  }}
                >
                  {[
                    { icon: '🎭', label: 'Drama' },
                    { icon: '🔊', label: 'Dolby Atmos' },
                    { icon: '📽️', label: '4K' }
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 1 + i * 0.1,
                        type: 'spring',
                        stiffness: 200
                      }}
                      whileHover={{ y: -5 }}
                      style={{
                        padding: '12px',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '24px', marginBottom: '6px' }}>
                        {feature.icon}
                      </div>
                      <div style={{ 
                        fontSize: '12px', 
                        fontWeight: '600',
                        color: '#b0b0b0'
                      }}>
                        {feature.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail Navigation */}
      <div style={{
        position: 'absolute',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: isMobile ? 'none' : 'flex',
        gap: '12px',
        zIndex: 10,
        padding: '12px 20px',
        borderRadius: '25px',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {bannerMovies.map((m, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goToSlide(index)}
            style={{
              position: 'relative',
              cursor: 'pointer'
            }}
          >
            <img
              src={m.backdrop}
              alt={m.title}
              style={{
                width: currentSlide === index ? '70px' : '55px',
                height: currentSlide === index ? '90px' : '70px',
                objectFit: 'cover',
                borderRadius: '10px',
                border: currentSlide === index 
                  ? '3px solid #ff006e' 
                  : '2px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s',
                filter: currentSlide === index ? 'brightness(1)' : 'brightness(0.5)'
              }}
            />
            {currentSlide === index && (
              <motion.div
                layoutId="activeIndicator"
                style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                  boxShadow: '0 0 15px #ff006e'
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '3px',
        background: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        zIndex: 20
      }}>
        <motion.div
          key={currentSlide}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 6, ease: 'linear' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #ff006e, #8338ec, #3a86ff)',
            boxShadow: '0 0 10px #ff006e'
          }}
        />
      </div>
    </div>
  )
}
