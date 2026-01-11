import { motion, AnimatePresence } from 'framer-motion'
import { X, Volume2, VolumeX, Maximize, Play } from 'lucide-react'
import { useState } from 'react'

export default function MovieTrailer({ movie, onClose }) {
  const [isMuted, setIsMuted] = useState(true)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px'
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '1200px',
            borderRadius: '20px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 30px 100px rgba(255, 0, 110, 0.3)'
          }}
        >
          {/* Video Player Mockup */}
          <div style={{
            position: 'relative',
            paddingTop: '56.25%',
            background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${movie.backdrop})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            {/* Play Overlay */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255, 0, 110, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 50px rgba(255, 0, 110, 0.6)'
            }}>
              <Play size={50} fill="white" color="white" />
            </div>

            {/* Controls */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '20px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.9))'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '10px'
              }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMuted(!isMuted)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {isMuted ? <VolumeX color="white" size={20} /> : <Volume2 color="white" size={20} />}
                </motion.button>

                <div style={{
                  flex: 1,
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '40%' }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #ff006e, #8338ec)',
                      borderRadius: '3px'
                    }}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Maximize color="white" size={20} />
                </motion.button>
              </div>

              <p style={{ color: 'white', fontSize: '14px' }}>
                {movie.title} - Official Trailer
              </p>
            </div>
          </div>

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            <X color="white" size={24} />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
