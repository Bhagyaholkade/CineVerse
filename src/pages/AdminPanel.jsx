import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Film, Calendar, DollarSign, Users, Settings, 
  BarChart3, Plus, Edit, Trash2, Eye, X 
} from 'lucide-react'
import AdminMovies from '../components/admin/AdminMovies'
import AdminTheatres from '../components/admin/AdminTheatres'
import AdminShowtimes from '../components/admin/AdminShowtimes'
import AdminBookings from '../components/admin/AdminBookings'
import AdminDashboard from '../components/admin/AdminDashboard'

export default function AdminPanel({ onBack }) {
  const [activeTab, setActiveTab] = useState('dashboard')

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'theatres', label: 'Theatres', icon: Calendar },
    { id: 'showtimes', label: 'Showtimes', icon: Settings },
    { id: 'bookings', label: 'Bookings', icon: Users }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '100px',
      paddingBottom: '60px'
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '0 40px'
      }}>
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px'
          }}
        >
          <div>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '900',
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(135deg, #ff006e, #8338ec)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '10px'
            }}>
              Admin Panel
            </h1>
            <p style={{ color: '#888', fontSize: '16px' }}>
              Manage your cinema operations
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            style={{
              padding: '12px 30px',
              borderRadius: '30px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            <X size={20} />
            Exit Admin
          </motion.button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '15px',
            marginBottom: '40px',
            overflowX: 'auto',
            padding: '10px 0'
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '15px 30px',
                  borderRadius: '20px',
                  border: activeTab === tab.id 
                    ? '2px solid #ff006e' 
                    : '2px solid rgba(255, 255, 255, 0.1)',
                  background: activeTab === tab.id
                    ? 'linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(131, 56, 236, 0.2))'
                    : 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s'
                }}
              >
                <Icon size={20} />
                {tab.label}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'movies' && <AdminMovies />}
          {activeTab === 'theatres' && <AdminTheatres />}
          {activeTab === 'showtimes' && <AdminShowtimes />}
          {activeTab === 'bookings' && <AdminBookings />}
        </motion.div>
      </div>
    </div>
  )
}
