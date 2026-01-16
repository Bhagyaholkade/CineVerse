import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import MovieCard from '../components/MovieCard'
import EventCard from '../components/EventCard'
import HeroBanner from '../components/HeroBanner'
import { moviesData, languages, comedyShows, concerts, liveEvents, theatrePlays } from '../data/moviesData'
import { ChevronLeft, ChevronRight, TrendingUp, Calendar, Globe2, Film, Laugh, Music, Ticket, Drama } from 'lucide-react'

export default function HomePage({ onMovieSelect, onTrailerClick }) {
  const nowShowingRef = useRef(null)
  const upcomingRef = useRef(null)
  const comedyRef = useRef(null)
  const concertsRef = useRef(null)
  const eventsRef = useRef(null)
  const playsRef = useRef(null)

  const [nowShowingPos, setNowShowingPos] = useState(0)
  const [upcomingPos, setUpcomingPos] = useState(0)
  const [comedyPos, setComedyPos] = useState(0)
  const [concertsPos, setConcertsPos] = useState(0)
  const [eventsPos, setEventsPos] = useState(0)
  const [playsPos, setPlaysPos] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState('All')

  const nowShowing = moviesData.filter(m => {
    if (selectedLanguage === 'All') return m.status === 'now-showing'
    return m.status === 'now-showing' && m.language === selectedLanguage
  })

  const upcoming = moviesData.filter(m => {
    if (selectedLanguage === 'All') return m.status === 'upcoming'
    return m.status === 'upcoming' && m.language === selectedLanguage
  })

  // Group movies by language
  const moviesByLanguage = languages.reduce((acc, lang) => {
    acc[lang] = moviesData.filter(m => m.language === lang)
    return acc
  }, {})

  // Language scroll refs
  const languageScrollRefs = useRef({})
  const languageScrollPositions = useRef({})

  languages.forEach(lang => {
    if (!languageScrollRefs.current[lang]) {
      languageScrollRefs.current[lang] = { current: null }
      languageScrollPositions.current[lang] = 0
    }
  })

  const scrollLanguageSection = (language, direction) => {
    const ref = languageScrollRefs.current[language]
    if (!ref?.current) return

    const scrollAmount = 400
    const currentPos = languageScrollPositions.current[language] || 0
    const newPosition = direction === 'left'
      ? currentPos - scrollAmount
      : currentPos + scrollAmount

    ref.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    })
    languageScrollPositions.current[language] = newPosition
  }

  // Get language icon/emoji
  const getLanguageIcon = (lang) => {
    const icons = {
      'English': '🇺🇸',
      'Hindi': '🇮🇳',
      'Telugu': '🎬',
      'Tamil': '🎭',
      'Kannada': '🎪',
      'Malayalam': '🎥',
      'Spanish': '🇪🇸',
      'French': '🇫🇷',
      'Mandarin': '🇨🇳',
      'Korean': '🇰🇷',
      'Japanese': '🇯🇵'
    }
    return icons[lang] || '🌍'
  }

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

  const handleEventClick = (event) => {
    // Treat events like movies and navigate to booking
    onMovieSelect(event)
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: window.innerWidth <= 768 ? '40px' : '80px' }}>
      {/* Hero Banner Slider */}
      <HeroBanner onBookNow={handleBookNow} onMoreInfo={handleMoreInfo} />

      {/* Language Filter Section - Compact Mobile Version */}
      <div style={{
        padding: window.innerWidth <= 768 ? '20px 15px' : '40px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: window.innerWidth <= 768 ? '15px' : '20px'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: window.innerWidth <= 768 ? '12px' : '20px'
          }}>
            <Globe2 size={window.innerWidth <= 768 ? 20 : 24} color="#ff006e" />
            <h2 style={{
              fontSize: 'clamp(18px, 4vw, 28px)',
              fontWeight: '700',
              fontFamily: "'Orbitron', sans-serif"
            }}>
              Browse by Language
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: window.innerWidth <= 768 ? '8px' : '12px'
          }}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedLanguage('All')}
              style={{
                padding: window.innerWidth <= 768 ? '10px 12px' : '10px 16px',
                borderRadius: '10px',
                border: selectedLanguage === 'All' ? '2px solid #ff006e' : '1px solid rgba(255, 255, 255, 0.2)',
                background: selectedLanguage === 'All'
                  ? 'linear-gradient(135deg, #ff006e, #8338ec)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: window.innerWidth <= 768 ? '12px' : '14px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: selectedLanguage === 'All' ? '0 5px 20px rgba(255, 0, 110, 0.3)' : 'none'
              }}
            >
              <Film size={window.innerWidth <= 768 ? 14 : 18} />
              <span>All ({moviesData.length})</span>
            </motion.button>

            {languages.map((lang) => {
              const movieCount = moviesByLanguage[lang]?.length || 0
              if (movieCount === 0) return null

              return (
                <motion.button
                  key={lang}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedLanguage(lang)}
                  style={{
                    padding: window.innerWidth <= 768 ? '10px 12px' : '12px 24px',
                    borderRadius: '10px',
                    border: selectedLanguage === lang ? '2px solid #ff006e' : '1px solid rgba(255, 255, 255, 0.2)',
                    background: selectedLanguage === lang
                      ? 'linear-gradient(135deg, #ff006e, #8338ec)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: window.innerWidth <= 768 ? '12px' : '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: selectedLanguage === lang ? '0 5px 20px rgba(255, 0, 110, 0.3)' : 'none'
                  }}
                >
                  <span style={{ fontSize: window.innerWidth <= 768 ? '16px' : '20px' }}>{getLanguageIcon(lang)}</span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {window.innerWidth <= 768 ? lang.substring(0, 3) : lang} ({movieCount})
                  </span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Language-Specific Movies Section */}
      {selectedLanguage !== 'All' && moviesByLanguage[selectedLanguage]?.length > 0 && (
        <div style={{
          padding: '40px 20px',
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
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                {getLanguageIcon(selectedLanguage)}
              </div>
              <div>
                <h2 style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  fontFamily: "'Orbitron', sans-serif",
                  marginBottom: '5px'
                }}>
                  {selectedLanguage} Movies
                </h2>
                <p style={{ color: '#888', fontSize: '14px' }}>
                  {moviesByLanguage[selectedLanguage].length} movies available
                </p>
              </div>
            </motion.div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scrollLanguageSection(selectedLanguage, 'left')}
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
                onClick={() => scrollLanguageSection(selectedLanguage, 'right')}
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

          {/* Language Movies Carousel */}
          <div
            ref={el => languageScrollRefs.current[selectedLanguage].current = el}
            style={{
              display: 'flex',
              gap: '30px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              padding: '20px 0'
            }}
          >
            {moviesByLanguage[selectedLanguage].map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ 
                  minWidth: '320px',
                  height: '100%',
                  display: 'flex'
                }}
              >
                <MovieCard
                  movie={movie}
                  onClick={onMovieSelect}
                  onTrailerClick={onTrailerClick}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Now Showing Section */}
      <div style={{
        padding: window.innerWidth <= 768 ? '30px 15px 20px' : '60px 20px 40px',
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
                fontSize: 'clamp(24px, 6vw, 36px)',
                fontWeight: '700',
                fontFamily: "'Orbitron', sans-serif",
                marginBottom: '5px'
              }}>
                Now Showing
              </h2>
              <p style={{ color: '#888', fontSize: 'clamp(12px, 2vw, 14px)' }}>
                {nowShowing.length} movies currently playing
              </p>
            </div>
          </motion.div>

          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
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
              style={{ 
                minWidth: '320px',
                height: '100%',
                display: 'flex'
              }}
            >
              <MovieCard
                movie={movie}
                onClick={onMovieSelect}
                onTrailerClick={onTrailerClick}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Movies Section */}
      <div style={{
        padding: window.innerWidth <= 768 ? '20px 15px' : '40px 20px',
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
                fontSize: 'clamp(24px, 6vw, 36px)',
                fontWeight: '700',
                fontFamily: "'Orbitron', sans-serif",
                marginBottom: '5px'
              }}>
                Coming Soon
              </h2>
              <p style={{ color: '#888', fontSize: 'clamp(12px, 2vw, 14px)' }}>
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
              style={{ 
                minWidth: '320px',
                height: '100%',
                display: 'flex'
              }}
            >
              <MovieCard
                movie={movie}
                onClick={onMovieSelect}
                onTrailerClick={onTrailerClick}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comedy Shows Section */}
      <div style={{
        padding: window.innerWidth <= 768 ? '20px 15px' : '40px 20px',
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
              background: 'linear-gradient(135deg, #ffc107, #ff9800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Laugh size={24} color="white" />
            </div>
            <div>
              <h2 style={{
                fontSize: 'clamp(20px, 5vw, 36px)',
                fontWeight: '700',
                fontFamily: "'Orbitron', sans-serif",
                marginBottom: '5px'
              }}>
                Stand-Up Comedy Shows
              </h2>
              <p style={{ color: '#888', fontSize: 'clamp(11px, 2vw, 14px)' }}>
                {comedyShows.length} shows available - Get ready to laugh!
              </p>
            </div>
          </motion.div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll(comedyRef, 'left', setComedyPos, comedyPos)}
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
              onClick={() => scroll(comedyRef, 'right', setComedyPos, comedyPos)}
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

        {/* Comedy Shows Carousel */}
        <div
          ref={comedyRef}
          style={{
            display: 'flex',
            gap: '30px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '20px 0'
          }}
        >
          {comedyShows.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ 
                minWidth: '320px',
                height: '100%',
                display: 'flex'
              }}
            >
              <EventCard event={show} onClick={handleEventClick} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Concerts Section */}
      <div style={{
        padding: window.innerWidth <= 768 ? '20px 15px' : '40px 20px',
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
              background: 'linear-gradient(135deg, #9c27b0, #673ab7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Music size={24} color="white" />
            </div>
            <div>
              <h2 style={{
                fontSize: '36px',
                fontWeight: '700',
                fontFamily: "'Orbitron', sans-serif",
                marginBottom: '5px'
              }}>
                Live Concerts
              </h2>
              <p style={{ color: '#888', fontSize: '14px' }}>
                {concerts.length} concerts - Experience music live!
              </p>
            </div>
          </motion.div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll(concertsRef, 'left', setConcertsPos, concertsPos)}
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
              onClick={() => scroll(concertsRef, 'right', setConcertsPos, concertsPos)}
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

        {/* Concerts Carousel */}
        <div
          ref={concertsRef}
          style={{
            display: 'flex',
            gap: '30px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '20px 0'
          }}
        >
          {concerts.map((concert, index) => (
            <motion.div
              key={concert.id}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ 
                minWidth: '320px',
                height: '100%',
                display: 'flex'
              }}
            >
              <EventCard event={concert} onClick={handleEventClick} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Events Section */}
      <div style={{
        padding: window.innerWidth <= 768 ? '20px 15px' : '40px 20px',
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
              background: 'linear-gradient(135deg, #ff5722, #f44336)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Ticket size={24} color="white" />
            </div>
            <div>
              <h2 style={{
                fontSize: '36px',
                fontWeight: '700',
                fontFamily: "'Orbitron', sans-serif",
                marginBottom: '5px'
              }}>
                Live Events & Festivals
              </h2>
              <p style={{ color: '#888', fontSize: '14px' }}>
                {liveEvents.length} exciting events happening soon
              </p>
            </div>
          </motion.div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll(eventsRef, 'left', setEventsPos, eventsPos)}
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
              onClick={() => scroll(eventsRef, 'right', setEventsPos, eventsPos)}
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

        {/* Live Events Carousel */}
        <div
          ref={eventsRef}
          style={{
            display: 'flex',
            gap: '30px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '20px 0'
          }}
        >
          {liveEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ 
                minWidth: '320px',
                height: '100%',
                display: 'flex'
              }}
            >
              <EventCard event={event} onClick={handleEventClick} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Theatre & Plays Section */}
      <div style={{
        padding: '40px 20px',
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
              background: 'linear-gradient(135deg, #e91e63, #c2185b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Drama size={24} color="white" />
            </div>
            <div>
              <h2 style={{
                fontSize: '36px',
                fontWeight: '700',
                fontFamily: "'Orbitron', sans-serif",
                marginBottom: '5px'
              }}>
                Theatre & Plays
              </h2>
              <p style={{ color: '#888', fontSize: '14px' }}>
                {theatrePlays.length} theatrical performances
              </p>
            </div>
          </motion.div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll(playsRef, 'left', setPlaysPos, playsPos)}
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
              onClick={() => scroll(playsRef, 'right', setPlaysPos, playsPos)}
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

        {/* Theatre Plays Carousel */}
        <div
          ref={playsRef}
          style={{
            display: 'flex',
            gap: '30px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '20px 0'
          }}
        >
          {theatrePlays.map((play, index) => (
            <motion.div
              key={play.id}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ 
                minWidth: '320px',
                height: '100%',
                display: 'flex'
              }}
            >
              <EventCard event={play} onClick={handleEventClick} />
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
          margin: window.innerWidth <= 768 ? '30px 15px 20px' : '60px 20px 40px',
          padding: window.innerWidth <= 768 ? '25px 18px' : 'clamp(30px, 6vw, 60px) clamp(20px, 4vw, 40px)',
          borderRadius: '20px',
          background: 'rgba(20, 20, 30, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          maxWidth: '1400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center'
        }}
      >
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: window.innerWidth <= 768 ? '22px' : 'clamp(28px, 7vw, 42px)',
            fontWeight: '700',
            marginBottom: window.innerWidth <= 768 ? '8px' : '15px',
            fontFamily: "'Orbitron', sans-serif",
            color: 'white'
          }}
        >
          Premium Cinema Experience
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: window.innerWidth <= 768 ? '12px' : 'clamp(14px, 2.5vw, 16px)',
            color: '#999',
            maxWidth: '650px',
            margin: window.innerWidth <= 768 ? '0 auto 18px' : '0 auto 40px',
            lineHeight: '1.6',
            padding: '0 15px'
          }}
        >
          Dolby Atmos sound, 4K projection, luxury recliner seats, and an
          immersive atmosphere that brings movies to life
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: window.innerWidth <= 768 ? '10px' : 'clamp(15px, 3vw, 25px)',
          marginTop: window.innerWidth <= 768 ? '15px' : 'clamp(25px, 5vw, 40px)'
        }}>
          {[
            { icon: '🎬', title: '4K Projection', desc: 'Crystal clear visuals' },
            { icon: '🔊', title: 'Dolby Atmos', desc: 'Immersive sound' },
            { icon: '💺', title: 'Luxury Seats', desc: 'Maximum comfort' },
            { icon: '🍿', title: 'Food & Drinks', desc: 'Gourmet options' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{
                y: -8,
                scale: 1.02
              }}
              style={{
                padding: window.innerWidth <= 768 ? '14px 10px' : 'clamp(20px, 4vw, 35px) clamp(15px, 3vw, 25px)',
                borderRadius: window.innerWidth <= 768 ? '12px' : '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 400 }}
                style={{
                  fontSize: window.innerWidth <= 768 ? '28px' : 'clamp(36px, 8vw, 48px)',
                  marginBottom: window.innerWidth <= 768 ? '6px' : 'clamp(10px, 2vw, 15px)'
                }}
              >
                {feature.icon}
              </motion.div>
              <h3 style={{
                fontSize: window.innerWidth <= 768 ? '13px' : 'clamp(15px, 3vw, 18px)',
                fontWeight: '600',
                marginBottom: window.innerWidth <= 768 ? '3px' : '6px',
                color: 'white'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#888',
                fontSize: window.innerWidth <= 768 ? '10px' : 'clamp(11px, 2vw, 13px)'
              }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
