import { motion } from 'framer-motion'
import { Star, Clock, Play, Users, Film } from 'lucide-react'
import { useState } from 'react'

export default function MovieCard({ movie, onClick, onTrailerClick, onWatchPartyClick }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="movie-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        z: 50
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(movie)}
      style={{
        cursor: 'pointer',
        position: 'relative',
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <div style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isHovered
          ? '0 20px 60px rgba(131, 56, 236, 0.5), 0 0 40px rgba(255, 0, 110, 0.3)'
          : '0 10px 30px rgba(0, 0, 0, 0.5)',
      }}>
        {/* Movie Poster */}
        <div style={{
          position: 'relative',
          height: '400px',
          overflow: 'hidden'
        }}>
          <motion.img
            src={movie.poster}
            alt={movie.title}
            animate={{
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.4 }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
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
            pointerEvents: 'none'
          }} />

          {/* Play Button Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255, 0, 110, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Play size={40} fill="white" color="white" />
          </motion.div>

          {/* Rating Badge */}
          <div style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: '8px 12px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            border: '1px solid rgba(255, 215, 0, 0.3)'
          }}>
            <Star size={16} fill="#FFD700" color="#FFD700" />
            <span style={{
              color: '#FFD700',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              {movie.rating}
            </span>
          </div>
        </div>

        {/* Movie Info */}
        <div style={{ padding: '20px' }}>
          <motion.h3
            animate={{
              background: isHovered
                ? 'linear-gradient(135deg, #ff006e, #8338ec)'
                : 'linear-gradient(135deg, #ffffff, #cccccc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            style={{
              fontSize: '22px',
              fontWeight: '700',
              marginBottom: '8px',
              fontFamily: "'Orbitron', sans-serif"
            }}
          >
            {movie.title}
          </motion.h3>

          <p style={{
            color: '#a0a0a0',
            fontSize: '14px',
            marginBottom: '12px'
          }}>
            {movie.genre}
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#888',
            fontSize: '13px',
            marginBottom: '12px'
          }}>
            <Clock size={16} />
            <span>{movie.duration}</span>
          </div>

          <p style={{
            color: '#b0b0b0',
            fontSize: '13px',
            lineHeight: '1.5',
            marginBottom: '15px'
          }}>
            {movie.description}
          </p>

          {/* Quick Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                onTrailerClick(movie)
              }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              <Film size={14} />
              Trailer
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                onWatchPartyClick(movie)
              }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              <Users size={14} />
              Party
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #ff006e, #8338ec)',
              color: 'white',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
