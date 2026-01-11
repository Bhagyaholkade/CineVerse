import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Plus, Edit, Trash2, Search, Filter, X, Upload, Star } from 'lucide-react'

export default function MoviesManagement() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingMovie, setEditingMovie] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Sample movies data
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Cosmic Odyssey',
      genre: ['Sci-Fi', 'Adventure'],
      language: 'English',
      rating: 9.2,
      duration: '2h 45m',
      releaseDate: '2024-03-15',
      status: 'now-showing',
      poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop',
      price: { '2D': 12, '3D': 15, 'IMAX': 20 }
    },
    {
      id: 2,
      title: 'Neon Dreams',
      genre: ['Action', 'Thriller'],
      language: 'English',
      rating: 8.8,
      duration: '2h 15m',
      releaseDate: '2024-03-20',
      status: 'now-showing',
      poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
      price: { '2D': 12, '3D': 15 }
    }
  ])

  const handleDeleteMovie = (id) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      setMovies(movies.filter(m => m.id !== id))
    }
  }

  return (
    <div>
      {/* Header Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', flex: '1', minWidth: '300px', maxWidth: '500px' }}>
          <Search
            size={20}
            color="#888"
            style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 45px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px'
            }}
          >
            <Filter size={18} />
            Filter
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #ff006e, #8338ec)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            <Plus size={18} />
            Add Movie
          </motion.button>
        </div>
      </div>

      {/* Movies Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '25px'
      }}>
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            style={{
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            {/* Movie Poster */}
            <div style={{
              height: '380px',
              background: `url(${movie.poster}) center/cover`,
              position: 'relative'
            }}>
              {/* Status Badge */}
              <div style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: movie.status === 'now-showing'
                  ? 'rgba(6, 255, 165, 0.2)'
                  : 'rgba(255, 190, 11, 0.2)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${movie.status === 'now-showing' ? '#06ffa5' : '#ffbe0b'}`,
                fontSize: '11px',
                color: movie.status === 'now-showing' ? '#06ffa5' : '#ffbe0b',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                {movie.status === 'now-showing' ? 'Now Showing' : 'Upcoming'}
              </div>

              {/* Rating Badge */}
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '13px',
                fontWeight: '700'
              }}>
                <Star size={14} fill="#ffd700" color="#ffd700" />
                {movie.rating}
              </div>

              {/* Action Buttons Overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                display: 'flex',
                gap: '10px',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setEditingMovie(movie)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'rgba(131, 56, 236, 0.8)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}
                >
                  <Edit size={16} />
                  Edit
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteMovie(movie.id)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'rgba(255, 0, 110, 0.8)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}
                >
                  <Trash2 size={16} />
                  Delete
                </motion.button>
              </div>
            </div>

            {/* Movie Info */}
            <div style={{ padding: '20px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '8px',
                fontFamily: "'Orbitron', sans-serif"
              }}>
                {movie.title}
              </h3>

              <div style={{
                fontSize: '13px',
                color: '#888',
                marginBottom: '12px'
              }}>
                {movie.genre.join(', ')} • {movie.duration}
              </div>

              {/* Formats */}
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '12px'
              }}>
                {Object.keys(movie.price).map(format => (
                  <div
                    key={format}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}
                  >
                    {format} - ${movie.price[format]}
                  </div>
                ))}
              </div>

              {/* Release Date */}
              <div style={{
                fontSize: '12px',
                color: '#666',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                Release: {new Date(movie.releaseDate).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Movie Modal */}
      <AnimatePresence>
        {(showAddModal || editingMovie) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={() => {
              setShowAddModal(false)
              setEditingMovie(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflow: 'auto',
                background: 'rgba(20, 20, 30, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '40px'
              }}
            >
              {/* Modal Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px'
              }}>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  fontFamily: "'Orbitron', sans-serif"
                }}>
                  {editingMovie ? 'Edit Movie' : 'Add New Movie'}
                </h2>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingMovie(null)
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Form will go here */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
              }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#888', marginBottom: '8px', display: 'block' }}>
                    Movie Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter movie title"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '14px', color: '#888', marginBottom: '8px', display: 'block' }}>
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2h 30m"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '14px', color: '#888', marginBottom: '8px', display: 'block' }}>
                    Poster Image
                  </label>
                  <div style={{
                    border: '2px dashed rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    padding: '40px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.03)'
                  }}>
                    <Upload size={40} color="#888" style={{ margin: '0 auto 10px' }} />
                    <div style={{ color: '#888', fontSize: '14px' }}>
                      Click to upload or drag and drop
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '30px'
                }}
              >
                {editingMovie ? 'Update Movie' : 'Add Movie'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
