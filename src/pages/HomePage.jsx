import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import MovieCard from '../components/MovieCard'
import HeroBanner from '../components/HeroBanner'
import { moviesData } from '../data/moviesData'
import { ChevronLeft, ChevronRight, TrendingUp, Calendar } from 'lucide-react'

export default function HomePage({ onMovieSelect, onTrailerClick, onWatchPartyClick }) {
  const nowShowingRef = useRef(null)
  const upcomingRef = useRef(null)
  const [nowShowingPos, setNowShowingPos] = useState(0)
  const [upcomingPos, setUpcomingPos] = useState(0)

  const nowShowing = moviesData.filter(m => m.status === 'now-showing')
  const upcoming = moviesData.filter(m => m.status === 'upcoming')

  const scroll = (ref, direction, setPos, currentPos) => {
    const container = ref.current
    if (!container) return

    const scrollAmount = 400
    const newPosition = direction === 'left'
      ? currentPos - scrollAmount
      : currentPos + scrollAmount

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    })
    setPos(newPosition)
  }

  const handleBookNow = (movieId) => {
    const movie = moviesData.find(m => m.id === movieId)
    if (movie) onMovieSelect(movie)
  }

  const handleMoreInfo = (movieId) => {
    const movie = moviesData.find(m => m.id === movieId)
    if (movie) onTrailerClick(movie)
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Hero Banner Slider */}
      <HeroBanner onBookNow={handleBookNow} onMoreInfo={handleMoreInfo} />

      {/* Now Showing Section */}
      <div style={{
        padding: '80px 40px 40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px'
        }}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ff006e, #8338ec)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp size={24} color="white" />
            </div>
            <div>
              <h2 style={{
                fontSize: '36px',
                fontWeight: '700',
                fontFamily: "'Orbitron', sans-serif",
                marginBottom: '5px'
              }}>
                Now Showing
              </h2>
              <p style={{ color: '#888', fontSize: '14px' }}>
                {nowShowing.length} movies currently playing
              </p>
            </div>
          </motion.div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll(nowShowingRef, 'left', setNowShowingPos, nowShowingPos)}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft color="white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll(nowShowingRef, 'right', setNowShowingPos, nowShowingPos)}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronRight color="white" />
            </motion.button>
          </div>
        </div>

        {/* Now Showing Movies */}
        <div
          ref={nowShowingRef}
          style={{
            display: 'flex',
            gap: '30px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '20px 0'
          }}
        >
          {nowShowing.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ minWidth: '320px' }}
            >
              <MovieCard
                movie={movie}
                onClick={onMovieSelect}
                onTrailerClick={onTrailerClick}
                onWatchPartyClick={onWatchPartyClick}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Movies Section */}
      <div style={{
        padding: '40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px'
        }}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #8338ec, #3a86ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calendar size={24} color="white" />
            </div>
            <div>
              <h2 style={{
                fontSize: '36px',
                fontWeight: '700',
                fontFamily: "'Orbitron', sans-serif",
                marginBottom: '5px'
              }}>
                Coming Soon
              </h2>
              <p style={{ color: '#888', fontSize: '14px' }}>
                {upcoming.length} upcoming releases
              </p>
            </div>
          </motion.div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll(upcomingRef, 'left', setUpcomingPos, upcomingPos)}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft color="white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll(upcomingRef, 'right', setUpcomingPos, upcomingPos)}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronRight color="white" />
            </motion.button>
          </div>
        </div>

        {/* Upcoming Movies */}
        <div
          ref={upcomingRef}
          style={{
            display: 'flex',
            gap: '30px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '20px 0'
          }}
        >
          {upcoming.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ minWidth: '320px' }}
            >
              <MovieCard
                movie={movie}
                onClick={onMovieSelect}
                onTrailerClick={onTrailerClick}
                onWatchPartyClick={onWatchPartyClick}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Premium Experience Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          margin: '100px auto',
          padding: '80px 60px',
          borderRadius: '30px',
          background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(131, 56, 236, 0.1))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: '1400px',
          textAlign: 'center'
        }}
      >
        <h2 style={{
          fontSize: '48px',
          fontWeight: '800',
          marginBottom: '20px',
          fontFamily: "'Orbitron', sans-serif"
        }}>
          Premium Cinema Experience
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#b0b0b0',
          maxWidth: '600px',
          margin: '0 auto 40px'
        }}>
          Dolby Atmos sound, 4K projection, luxury recliner seats, and an
          immersive atmosphere that brings movies to life
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          marginTop: '50px'
        }}>
          {[
            { icon: '🎬', title: '4K Projection', desc: 'Crystal clear visuals' },
            { icon: '🔊', title: 'Dolby Atmos', desc: 'Immersive sound' },
            { icon: '💺', title: 'Luxury Seats', desc: 'Maximum comfort' },
            { icon: '🍿', title: 'Food & Drinks', desc: 'Gourmet options' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.05 }}
              style={{
                padding: '30px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '10px'
              }}>
                {feature.title}
              </h3>
              <p style={{ color: '#888', fontSize: '14px' }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
