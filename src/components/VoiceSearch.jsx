import { motion, AnimatePresence } from 'framer-motion'
import { Mic, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function VoiceSearch({ onClose, onSearch }) {
  const [isListening, setIsListening] = useState(true)
  const [transcript, setTranscript] = useState('')
  const [audioWaves, setAudioWaves] = useState([])

  useEffect(() => {
    // Generate random audio wave heights
    const interval = setInterval(() => {
      setAudioWaves(Array.from({ length: 20 }, () => Math.random() * 100))
    }, 100)

    // Simulate voice recognition
    const timeout = setTimeout(() => {
      setTranscript('Show me sci-fi movies...')
      setTimeout(() => {
        onSearch('sci-fi')
        onClose()
      }, 1500)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [onClose, onSearch])

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
          flexDirection: 'column',
          padding: '40px'
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff006e, #8338ec)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            marginBottom: '40px',
            boxShadow: '0 0 60px rgba(255, 0, 110, 0.6)'
          }}
        >
          {/* Pulsing rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 2, 2.5],
                opacity: [0.6, 0.3, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '3px solid #ff006e',
                top: 0,
                left: 0
              }}
            />
          ))}

          <Mic size={60} color="white" />
        </motion.div>

        {/* Audio Visualizer */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '4px',
          height: '100px',
          marginBottom: '30px'
        }}>
          {audioWaves.map((height, i) => (
            <motion.div
              key={i}
              animate={{
                height: `${isListening ? height : 20}px`
              }}
              transition={{ duration: 0.1 }}
              style={{
                width: '6px',
                background: 'linear-gradient(180deg, #ff006e, #8338ec)',
                borderRadius: '3px',
                minHeight: '20px'
              }}
            />
          ))}
        </div>

        {/* Transcript */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}
        >
          <p style={{
            color: '#888',
            fontSize: '16px',
            marginBottom: '10px'
          }}>
            {isListening ? 'Listening...' : 'Processing...'}
          </p>
          {transcript && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: '600',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              "{transcript}"
            </motion.p>
          )}
        </motion.div>

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          style={{
            padding: '15px 35px',
            borderRadius: '50px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '14px'
          }}
        >
          <X size={18} />
          Cancel
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}
