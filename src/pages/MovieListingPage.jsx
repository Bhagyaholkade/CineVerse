import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { Filter, X, ChevronDown, Star, SlidersHorizontal } from 'lucide-react'
import MovieCard from '../components/MovieCard'
import { moviesData, genres, languages } from '../data/moviesData'

export default function MovieListingPage({ onMovieSelect, onTrailerClick, onWatchPartyClick, searchQuery = '' }) {
  const [showFilters, setShowFilters] = useState(true)
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [selectedFormats, setSelectedFormats] = useState([])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('popularity')
  const [showSortMenu, setShowSortMenu] = useState(false)

  const formats = ['2D', '3D', 'IMAX']

  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  const toggleLanguage = (language) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    )
  }

  const toggleFormat = (format) => {
    setSelectedFormats(prev =>
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    )
  }

  const clearFilters = () => {
    setSelectedGenres([])
    setSelectedLanguages([])
    setSelectedFormats([])
    setMinRating(0)
  }

  const filteredAndSortedMovies = useMemo(() => {
    let filtered = [...moviesData]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(movie =>
        selectedGenres.some(genre => movie.genre.includes(genre))
      )
    }

    // Language filter
    if (selectedLanguages.length > 0) {
      filtered = filtered.filter(movie =>
        selectedLanguages.includes(movie.language)
      )
    }

    // Format filter
    if (selectedFormats.length > 0) {
      filtered = filtered.filter(movie =>
        selectedFormats.some(format => movie.formats.includes(format))
      )
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(movie => movie.rating >= minRating)
    }

    // Sorting
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'release-date':
        filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
        break
      case 'price-low':
        filtered.sort((a, b) => Math.min(...Object.values(a.price)) - Math.min(...Object.values(b.price)))
        break
      case 'price-high':
        filtered.sort((a, b) => Math.max(...Object.values(b.price)) - Math.max(...Object.values(a.price)))
        break
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default: // popularity
        // Keep original order
        break
    }

    return filtered
  }, [searchQuery, selectedGenres, selectedLanguages, selectedFormats, minRating, sortBy])

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'rating', label: 'Rating: High to Low' },
    { value: 'release-date', label: 'Release Date' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'title', label: 'Title: A to Z' }
  ]

  const activeFiltersCount = selectedGenres.length + selectedLanguages.length + selectedFormats.length + (minRating > 0 ? 1 : 0)

  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 40px'
      }}>
        {/* Header Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <div>
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              style={{
                fontSize: '48px',
                fontWeight: '800',
                fontFamily: "'Orbitron', sans-serif",
                marginBottom: '10px'
              }}
            >
              {searchQuery ? `Search Results for "${searchQuery}"` : 'All Movies'}
            </motion.h1>
            <motion.p
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{ color: '#888', fontSize: '16px' }}
            >
              {filteredAndSortedMovies.length} {filteredAndSortedMovies.length === 1 ? 'movie' : 'movies'} found
            </motion.p>
          </div>

          {/* Filter Toggle & Sort */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {/* Sort Dropdown */}
            <div style={{ position: 'relative' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSortMenu(!showSortMenu)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                <SlidersHorizontal size={18} />
                Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}
                <ChevronDown size={18} style={{
                  transform: showSortMenu ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }} />
              </motion.button>

              <AnimatePresence>
                {showSortMenu && (
                  <>
                    <div
                      onClick={() => setShowSortMenu(false)}
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 998
                      }}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{
                        position: 'absolute',
                        top: '60px',
                        right: 0,
                        minWidth: '250px',
                        background: 'rgba(20, 20, 30, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '10px',
                        zIndex: 999,
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {sortOptions.map((option) => (
                        <motion.div
                          key={option.value}
                          whileHover={{ background: 'rgba(255, 255, 255, 0.1)' }}
                          onClick={() => {
                            setSortBy(option.value)
                            setShowSortMenu(false)
                          }}
                          style={{
                            padding: '12px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            color: sortBy === option.value ? '#ff006e' : 'white',
                            fontSize: '14px',
                            fontFamily: "'Poppins', sans-serif",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          {option.label}
                          {sortBy === option.value && (
                            <div style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: '#ff006e'
                            }} />
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Filter Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: showFilters ? 'linear-gradient(135deg, #ff006e, #8338ec)' : 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: "'Poppins', sans-serif",
                position: 'relative'
              }}
            >
              <Filter size={18} />
              Filters
              {activeFiltersCount > 0 && (
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: '#ff006e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '700'
                }}>
                  {activeFiltersCount}
                </div>
              )}
            </motion.button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', gap: '40px' }}>
          {/* Filter Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                style={{
                  width: '300px',
                  flexShrink: 0
                }}
              >
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '30px',
                  position: 'sticky',
                  top: '120px'
                }}>
                  {/* Filter Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px'
                  }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      fontFamily: "'Orbitron', sans-serif"
                    }}>
                      Filters
                    </h3>
                    {activeFiltersCount > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearFilters}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          background: 'transparent',
                          color: '#ff006e',
                          fontSize: '12px',
                          cursor: 'pointer',
                          fontFamily: "'Poppins', sans-serif"
                        }}
                      >
                        Clear All
                      </motion.button>
                    )}
                  </div>

                  {/* Genre Filter */}
                  <div style={{ marginBottom: '30px' }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '15px',
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Genre
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {genres.map((genre) => (
                        <motion.button
                          key={genre}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleGenre(genre)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: `1px solid ${selectedGenres.includes(genre) ? '#ff006e' : 'rgba(255, 255, 255, 0.2)'}`,
                            background: selectedGenres.includes(genre)
                              ? 'linear-gradient(135deg, #ff006e, #8338ec)'
                              : 'rgba(255, 255, 255, 0.05)',
                            color: 'white',
                            fontSize: '12px',
                            cursor: 'pointer',
                            fontFamily: "'Poppins', sans-serif"
                          }}
                        >
                          {genre}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Language Filter */}
                  <div style={{ marginBottom: '30px' }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '15px',
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Language
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {languages.map((language) => (
                        <motion.button
                          key={language}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleLanguage(language)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: `1px solid ${selectedLanguages.includes(language) ? '#8338ec' : 'rgba(255, 255, 255, 0.2)'}`,
                            background: selectedLanguages.includes(language)
                              ? 'linear-gradient(135deg, #8338ec, #3a86ff)'
                              : 'rgba(255, 255, 255, 0.05)',
                            color: 'white',
                            fontSize: '12px',
                            cursor: 'pointer',
                            fontFamily: "'Poppins', sans-serif"
                          }}
                        >
                          {language}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Format Filter */}
                  <div style={{ marginBottom: '30px' }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '15px',
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Format
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {formats.map((format) => (
                        <motion.button
                          key={format}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleFormat(format)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: `1px solid ${selectedFormats.includes(format) ? '#3a86ff' : 'rgba(255, 255, 255, 0.2)'}`,
                            background: selectedFormats.includes(format)
                              ? 'linear-gradient(135deg, #3a86ff, #00d4ff)'
                              : 'rgba(255, 255, 255, 0.05)',
                            color: 'white',
                            fontSize: '12px',
                            cursor: 'pointer',
                            fontFamily: "'Poppins', sans-serif"
                          }}
                        >
                          {format}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '15px',
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Minimum Rating
                    </h4>
                    <div style={{
                      display: 'flex',
                      gap: '8px'
                    }}>
                      {[0, 7, 8, 9].map((rating) => (
                        <motion.button
                          key={rating}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setMinRating(rating)}
                          style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '12px',
                            border: `1px solid ${minRating === rating ? '#ff006e' : 'rgba(255, 255, 255, 0.2)'}`,
                            background: minRating === rating
                              ? 'linear-gradient(135deg, #ff006e, #8338ec)'
                              : 'rgba(255, 255, 255, 0.05)',
                            color: 'white',
                            fontSize: '13px',
                            cursor: 'pointer',
                            fontFamily: "'Poppins', sans-serif",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Star size={14} fill={minRating === rating ? 'white' : 'none'} />
                          {rating === 0 ? 'All' : `${rating}+`}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Movie Grid */}
          <div style={{ flex: 1 }}>
            {filteredAndSortedMovies.length > 0 ? (
              <motion.div
                layout
                style={{
                  display: 'grid',
                  gridTemplateColumns: showFilters
                    ? 'repeat(auto-fill, minmax(300px, 1fr))'
                    : 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '30px'
                }}
              >
                {filteredAndSortedMovies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <MovieCard
                      movie={movie}
                      onClick={onMovieSelect}
                      onTrailerClick={onTrailerClick}
                      onWatchPartyClick={onWatchPartyClick}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  textAlign: 'center',
                  padding: '100px 40px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div style={{
                  fontSize: '64px',
                  marginBottom: '20px'
                }}>
                  🎬
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '10px',
                  fontFamily: "'Orbitron', sans-serif"
                }}>
                  No movies found
                </h3>
                <p style={{
                  color: '#888',
                  fontSize: '16px',
                  marginBottom: '30px'
                }}>
                  Try adjusting your filters or search query
                </p>
                {activeFiltersCount > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                      color: 'white',
                      fontSize: '14px',
                      cursor: 'pointer',
                      fontFamily: "'Poppins', sans-serif"
                    }}
                  >
                    Clear All Filters
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
