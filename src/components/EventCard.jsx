import { motion } from 'framer-motion'
import { Star, Clock, MapPin, Calendar, Users, Ticket } from 'lucide-react'
import { useState } from 'react'

export default function EventCard({ event, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  // Get first price tier for display
  const firstPrice = Object.values(event.price)[0]
  const priceLabel = Object.keys(event.price)[0]

  return (
    <motion.div
      className="event-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        z: 50
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(event)}
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
        {/* Event Poster */}
        <div style={{
          position: 'relative',
          height: '400px',
          overflow: 'hidden'
        }}>
          <motion.img
            src={event.poster}
            alt={event.title}
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

          {/* Category Badge */}
          <div style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            background: event.category === 'Stand-Up Comedy'
              ? 'rgba(255, 193, 7, 0.9)'
              : event.category === 'Music Concert'
              ? 'rgba(156, 39, 176, 0.9)'
              : event.category === 'Sports'
              ? 'rgba(76, 175, 80, 0.9)'
              : event.category === 'Conference'
              ? 'rgba(33, 150, 243, 0.9)'
              : event.category === 'Musical Theatre'
              ? 'rgba(233, 30, 99, 0.9)'
              : 'rgba(255, 87, 34, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: '700',
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            {event.category}
          </div>

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
              {event.rating}
            </span>
          </div>

          {/* Age Rating Badge */}
          <div style={{
            position: 'absolute',
            bottom: '15px',
            left: '15px',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: '700',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            {event.ageRating}
          </div>
        </div>

        {/* Event Info */}
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
              marginBottom: '4px',
              fontFamily: "'Orbitron', sans-serif"
            }}
          >
            {event.title}
          </motion.h3>

          <p style={{
            color: '#a0a0a0',
            fontSize: '14px',
            marginBottom: '12px',
            fontWeight: '500'
          }}>
            {event.artist}
          </p>

          {/* Date and Venue */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#888',
              fontSize: '13px'
            }}>
              <Calendar size={16} />
              <span>{new Date(event.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#888',
              fontSize: '13px'
            }}>
              <MapPin size={16} />
              <span style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {event.venue}
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#888',
              fontSize: '13px'
            }}>
              <Clock size={16} />
              <span>{event.duration}</span>
            </div>
          </div>

          <p style={{
            color: '#b0b0b0',
            fontSize: '13px',
            lineHeight: '1.5',
            marginBottom: '15px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {event.description}
          </p>

          {/* Price and Book Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '15px',
            paddingTop: '15px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div>
              <div style={{
                fontSize: '11px',
                color: '#888',
                marginBottom: '3px'
              }}>
                Starting from
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '5px'
              }}>
                <span style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#ff006e',
                  fontFamily: "'Orbitron', sans-serif"
                }}>
                  ₹{firstPrice}
                </span>
                <span style={{
                  fontSize: '11px',
                  color: '#666'
                }}>
                  {priceLabel}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Ticket size={16} />
              Book
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
