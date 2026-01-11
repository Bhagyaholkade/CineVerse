import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  LayoutDashboard, Film, Building2, Clock, DollarSign,
  Users, TrendingUp, Calendar, Settings, LogOut, Menu, X
} from 'lucide-react'
import MoviesManagement from '../components/admin/MoviesManagement'
import TheatresManagement from '../components/admin/TheatresManagement'
import ShowtimesManagement from '../components/admin/ShowtimesManagement'
import BookingsManagement from '../components/admin/BookingsManagement'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, color: '#ff006e' },
    { id: 'movies', label: 'Movies', icon: Film, color: '#8338ec' },
    { id: 'theatres', label: 'Theatres', icon: Building2, color: '#3a86ff' },
    { id: 'showtimes', label: 'Showtimes', icon: Clock, color: '#06ffa5' },
    { id: 'bookings', label: 'Bookings', icon: Calendar, color: '#ffbe0b' },
    { id: 'revenue', label: 'Revenue', icon: DollarSign, color: '#ff006e' },
    { id: 'users', label: 'Users', icon: Users, color: '#8338ec' },
    { id: 'settings', label: 'Settings', icon: Settings, color: '#888' }
  ]

  const stats = [
    { label: 'Total Revenue', value: '$45,231', change: '+12.5%', icon: DollarSign, color: '#06ffa5', bg: 'rgba(6, 255, 165, 0.1)' },
    { label: 'Active Movies', value: '24', change: '+3', icon: Film, color: '#ff006e', bg: 'rgba(255, 0, 110, 0.1)' },
    { label: 'Total Bookings', value: '1,429', change: '+8.3%', icon: Calendar, color: '#8338ec', bg: 'rgba(131, 56, 236, 0.1)' },
    { label: 'Active Users', value: '8,291', change: '+15.2%', icon: Users, color: '#3a86ff', bg: 'rgba(58, 134, 255, 0.1)' }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      color: 'white',
      display: 'flex'
    }}>
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 20 }}
        style={{
          width: '280px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '30px 0',
          position: 'fixed',
          height: '100vh',
          zIndex: 100,
          overflow: 'auto'
        }}
      >
        {/* Logo */}
        <div style={{
          padding: '0 30px',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ff006e, #8338ec)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Film size={24} />
          </div>
          <div>
            <div style={{
              fontSize: '20px',
              fontWeight: '800',
              fontFamily: "'Orbitron', sans-serif"
            }}>
              CineVerse
            </div>
            <div style={{ fontSize: '10px', color: '#888' }}>ADMIN PANEL</div>
          </div>
        </div>

        {/* Menu Items */}
        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  padding: '15px 30px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  border: 'none',
                  borderLeft: isActive ? `3px solid ${item.color}` : '3px solid transparent',
                  color: isActive ? item.color : '#888',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'all 0.3s ease'
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </motion.button>
            )
          })}
        </nav>

        {/* Logout Button */}
        <motion.button
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            padding: '15px 30px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            background: 'transparent',
            border: 'none',
            color: '#ff006e',
            cursor: 'pointer',
            fontSize: '15px',
            fontFamily: "'Poppins', sans-serif",
            marginTop: 'auto',
            position: 'absolute',
            bottom: '30px'
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </motion.button>
      </motion.aside>

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? '280px' : '0',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Top Bar */}
        <div style={{
          padding: '30px 40px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
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
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>

            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                fontFamily: "'Orbitron', sans-serif",
                marginBottom: '5px'
              }}>
                {menuItems.find(item => item.id === activeTab)?.label}
              </h1>
              <p style={{ fontSize: '14px', color: '#888' }}>
                Welcome back, Admin
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: '700'
              }}
            >
              A
            </motion.div>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: '40px' }}>
          {activeTab === 'overview' && (
            <div>
              {/* Stats Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '25px',
                marginBottom: '40px'
              }}>
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      style={{
                        padding: '25px',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: stat.bg,
                        filter: 'blur(40px)'
                      }} />

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        position: 'relative',
                        zIndex: 1
                      }}>
                        <div>
                          <div style={{
                            fontSize: '14px',
                            color: '#888',
                            marginBottom: '8px'
                          }}>
                            {stat.label}
                          </div>
                          <div style={{
                            fontSize: '32px',
                            fontWeight: '800',
                            fontFamily: "'Orbitron', sans-serif",
                            marginBottom: '8px'
                          }}>
                            {stat.value}
                          </div>
                          <div style={{
                            fontSize: '13px',
                            color: stat.color,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <TrendingUp size={14} />
                            {stat.change}
                          </div>
                        </div>

                        <div style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '12px',
                          background: stat.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Icon size={24} color={stat.color} />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Charts Placeholder */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '25px'
              }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    padding: '30px',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '20px',
                    fontFamily: "'Orbitron', sans-serif"
                  }}>
                    Revenue Overview
                  </h3>
                  <div style={{
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888'
                  }}>
                    Chart will be displayed here
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{
                    padding: '30px',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '20px',
                    fontFamily: "'Orbitron', sans-serif"
                  }}>
                    Top Movies
                  </h3>
                  <div style={{
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888'
                  }}>
                    Top performing movies
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {activeTab === 'movies' && (
            <MoviesManagement />
          )}

          {activeTab === 'theatres' && (
            <TheatresManagement />
          )}

          {activeTab === 'showtimes' && (
            <ShowtimesManagement />
          )}

          {activeTab === 'bookings' && (
            <BookingsManagement />
          )}

          {activeTab === 'revenue' && (
            <div>Revenue Analytics Content</div>
          )}

          {activeTab === 'users' && (
            <div>Users Management Content</div>
          )}

          {activeTab === 'settings' && (
            <div>Settings Content</div>
          )}
        </div>
      </div>
    </div>
  )
}
