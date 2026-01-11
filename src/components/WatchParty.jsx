import { motion, AnimatePresence } from 'framer-motion'
import { Users, UserPlus, X, Video, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function WatchParty({ movie, onClose }) {
  const [friends] = useState([
    { id: 1, name: 'Sarah Chen', avatar: '👩', status: 'online' },
    { id: 2, name: 'Mike Johnson', avatar: '👨', status: 'online' },
    { id: 3, name: 'Emma Davis', avatar: '👧', status: 'offline' },
    { id: 4, name: 'Alex Kumar', avatar: '🧑', status: 'online' }
  ])

  const [selectedFriends, setSelectedFriends] = useState([])

  const toggleFriend = (friendId) => {
    setSelectedFriends(prev =>
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    )
  }

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
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '600px',
            padding: '40px',
            borderRadius: '30px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '30px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '15px',
                background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={28} color="white" />
              </div>
              <div>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: "'Orbitron', sans-serif",
                  marginBottom: '5px'
                }}>
                  Watch Party
                </h2>
                <p style={{ color: '#888', fontSize: '14px' }}>
                  Invite friends to watch together
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X color="white" size={20} />
            </motion.button>
          </div>

          {/* Movie Info */}
          <div style={{
            padding: '20px',
            borderRadius: '15px',
            background: 'rgba(0, 0, 0, 0.3)',
            marginBottom: '30px',
            display: 'flex',
            gap: '15px',
            alignItems: 'center'
          }}>
            <img
              src={movie.poster}
              alt={movie.title}
              style={{
                width: '60px',
                height: '90px',
                borderRadius: '8px',
                objectFit: 'cover'
              }}
            />
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '5px'
              }}>
                {movie.title}
              </h3>
              <p style={{ color: '#888', fontSize: '13px' }}>
                {movie.duration} • {movie.genre}
              </p>
            </div>
          </div>

          {/* Friends List */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '15px',
              color: '#888'
            }}>
              Select Friends
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {friends.map((friend) => (
                <motion.div
                  key={friend.id}
                  whileHover={{ x: 5 }}
                  onClick={() => toggleFriend(friend.id)}
                  style={{
                    padding: '15px',
                    borderRadius: '12px',
                    background: selectedFriends.includes(friend.id)
                      ? 'rgba(255, 0, 110, 0.2)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: selectedFriends.includes(friend.id)
                      ? '2px solid #ff006e'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8338ec, #3a86ff)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      position: 'relative'
                    }}>
                      {friend.avatar}
                      {friend.status === 'online' && (
                        <div style={{
                          position: 'absolute',
                          bottom: '2px',
                          right: '2px',
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: '#00ff88',
                          border: '2px solid #000'
                        }} />
                      )}
                    </div>
                    <div>
                      <p style={{ fontWeight: '600', fontSize: '15px' }}>
                        {friend.name}
                      </p>
                      <p style={{
                        fontSize: '12px',
                        color: friend.status === 'online' ? '#00ff88' : '#666'
                      }}>
                        {friend.status}
                      </p>
                    </div>
                  </div>

                  {selectedFriends.includes(friend.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px'
                      }}
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Party Features */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginBottom: '30px'
          }}>
            {[
              { icon: <Video size={20} />, label: 'Video Chat' },
              { icon: <MessageCircle size={20} />, label: 'Live Chat' }
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  padding: '15px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#888'
                }}
              >
                {feature.icon}
                <span style={{ fontSize: '13px' }}>{feature.label}</span>
              </div>
            ))}
          </div>

          {/* Create Party Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={selectedFriends.length === 0}
            style={{
              width: '100%',
              padding: '18px',
              borderRadius: '15px',
              border: 'none',
              background: selectedFriends.length > 0
                ? 'linear-gradient(135deg, #ff006e, #8338ec)'
                : 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontWeight: '600',
              fontSize: '16px',
              cursor: selectedFriends.length > 0 ? 'pointer' : 'not-allowed',
              fontFamily: "'Poppins', sans-serif",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              opacity: selectedFriends.length > 0 ? 1 : 0.5
            }}
          >
            <UserPlus size={20} />
            Create Watch Party ({selectedFriends.length} friends)
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
