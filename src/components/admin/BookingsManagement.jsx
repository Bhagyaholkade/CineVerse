import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Search, Filter, Eye, XCircle, DollarSign, Calendar, Clock, MapPin, Users, Ticket } from 'lucide-react'

export default function BookingsManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState(null)

  const [bookings, setBookings] = useState([
    {
      id: 'BK001234',
      user: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      movie: 'Cosmic Odyssey',
      theatre: 'Cineplex Downtown',
      screen: 'Screen 1 - IMAX',
      date: '2024-01-15',
      time: '8:30 PM',
      seats: ['J5', 'J6', 'J7'],
      format: 'IMAX',
      ticketPrice: 20,
      convenienceFee: 2.5,
      tax: 3.38,
      totalAmount: 77.64,
      paymentStatus: 'completed',
      bookingStatus: 'confirmed',
      bookedAt: '2024-01-10T14:30:00'
    },
    {
      id: 'BK001235',
      user: 'Sarah Miller',
      email: 'sarah@example.com',
      phone: '+1 234 567 8901',
      movie: 'Neon Dreams',
      theatre: 'Star Cinema Mall',
      screen: 'Screen 2 - Dolby',
      date: '2024-01-14',
      time: '5:00 PM',
      seats: ['H8', 'H9'],
      format: '3D',
      ticketPrice: 15,
      convenienceFee: 2,
      tax: 2.55,
      totalAmount: 34.55,
      paymentStatus: 'completed',
      bookingStatus: 'confirmed',
      bookedAt: '2024-01-09T10:15:00'
    },
    {
      id: 'BK001236',
      user: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 234 567 8902',
      movie: 'Cosmic Odyssey',
      theatre: 'Mega Movies Plaza',
      screen: 'Screen 1 - Standard',
      date: '2024-01-12',
      time: '1:30 PM',
      seats: ['F10', 'F11', 'F12', 'F13'],
      format: '2D',
      ticketPrice: 12,
      convenienceFee: 2,
      tax: 3.36,
      totalAmount: 59.36,
      paymentStatus: 'completed',
      bookingStatus: 'cancelled',
      bookedAt: '2024-01-08T18:45:00',
      cancelledAt: '2024-01-09T12:00:00'
    },
    {
      id: 'BK001237',
      user: 'Emma Wilson',
      email: 'emma@example.com',
      phone: '+1 234 567 8903',
      movie: 'Neon Dreams',
      theatre: 'Cineplex Downtown',
      screen: 'Screen 2 - Standard',
      date: '2024-01-16',
      time: '10:00 AM',
      seats: ['D5', 'D6'],
      format: '2D',
      ticketPrice: 12,
      convenienceFee: 2,
      tax: 2.1,
      totalAmount: 28.1,
      paymentStatus: 'pending',
      bookingStatus: 'pending',
      bookedAt: '2024-01-11T08:20:00'
    }
  ])

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#06ffa5'
      case 'pending': return '#ffbe0b'
      case 'cancelled': return '#ff006e'
      default: return '#888'
    }
  }

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#06ffa5'
      case 'pending': return '#ffbe0b'
      case 'failed': return '#ff006e'
      case 'refunded': return '#8338ec'
      default: return '#888'
    }
  }

  const handleCancelBooking = (bookingId) => {
    if (confirm('Cancel this booking? This will issue a refund to the customer.')) {
      setBookings(bookings.map(b =>
        b.id === bookingId
          ? { ...b, bookingStatus: 'cancelled', cancelledAt: new Date().toISOString() }
          : b
      ))
      setSelectedBooking(null)
    }
  }

  const handleIssueRefund = (bookingId) => {
    if (confirm('Issue refund for this cancelled booking?')) {
      setBookings(bookings.map(b =>
        b.id === bookingId
          ? { ...b, paymentStatus: 'refunded' }
          : b
      ))
      setSelectedBooking(null)
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.movie.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || booking.bookingStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.bookingStatus === 'confirmed').length,
    pending: bookings.filter(b => b.bookingStatus === 'pending').length,
    cancelled: bookings.filter(b => b.bookingStatus === 'cancelled').length,
    revenue: bookings.filter(b => b.paymentStatus === 'completed').reduce((sum, b) => sum + b.totalAmount, 0)
  }

  return (
    <div>
      {/* Stats Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '25px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(131, 56, 236, 0.2), rgba(131, 56, 236, 0.05))',
            border: '1px solid rgba(131, 56, 236, 0.3)'
          }}
        >
          <div style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Total Bookings</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#8338ec' }}>{stats.total}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            padding: '25px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(6, 255, 165, 0.2), rgba(6, 255, 165, 0.05))',
            border: '1px solid rgba(6, 255, 165, 0.3)'
          }}
        >
          <div style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Confirmed</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#06ffa5' }}>{stats.confirmed}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            padding: '25px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(255, 190, 11, 0.2), rgba(255, 190, 11, 0.05))',
            border: '1px solid rgba(255, 190, 11, 0.3)'
          }}
        >
          <div style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Pending</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#ffbe0b' }}>{stats.pending}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            padding: '25px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(255, 0, 110, 0.05))',
            border: '1px solid rgba(255, 0, 110, 0.3)'
          }}
        >
          <div style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Cancelled</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#ff006e' }}>{stats.cancelled}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            padding: '25px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(58, 134, 255, 0.2), rgba(58, 134, 255, 0.05))',
            border: '1px solid rgba(58, 134, 255, 0.3)'
          }}
        >
          <div style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Total Revenue</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#3a86ff' }}>${stats.revenue.toFixed(2)}</div>
        </motion.div>
      </div>

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
            placeholder="Search by booking ID, user, or movie..."
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

        {/* Status Filter */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['all', 'confirmed', 'pending', 'cancelled'].map(status => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStatusFilter(status)}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: statusFilter === status
                  ? '1px solid rgba(255, 255, 255, 0.3)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                background: statusFilter === status
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(255, 255, 255, 0.03)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                textTransform: 'capitalize'
              }}
            >
              {status}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div style={{
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          overflowX: 'auto'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', color: '#888', fontWeight: '600' }}>Booking ID</th>
                <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', color: '#888', fontWeight: '600' }}>Customer</th>
                <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', color: '#888', fontWeight: '600' }}>Movie</th>
                <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', color: '#888', fontWeight: '600' }}>Show Details</th>
                <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', color: '#888', fontWeight: '600' }}>Seats</th>
                <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', color: '#888', fontWeight: '600' }}>Amount</th>
                <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', color: '#888', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', color: '#888', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <td style={{ padding: '20px' }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#8338ec',
                      fontFamily: "'Orbitron', sans-serif"
                    }}>
                      {booking.id}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
                      {new Date(booking.bookedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>{booking.user}</div>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{booking.email}</div>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>{booking.movie}</div>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{booking.format}</div>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <div style={{ fontSize: '13px', marginBottom: '4px' }}>{booking.theatre}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>
                      {new Date(booking.date).toLocaleDateString()} • {booking.time}
                    </div>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <div style={{
                      display: 'flex',
                      gap: '4px',
                      flexWrap: 'wrap'
                    }}>
                      {booking.seats.map(seat => (
                        <div
                          key={seat}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}
                        >
                          {seat}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#3a86ff' }}>
                      ${booking.totalAmount.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
                      {booking.seats.length} tickets
                    </div>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <div style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: `${getStatusColor(booking.bookingStatus)}20`,
                      border: `1px solid ${getStatusColor(booking.bookingStatus)}`,
                      fontSize: '11px',
                      fontWeight: '600',
                      color: getStatusColor(booking.bookingStatus),
                      textTransform: 'uppercase',
                      marginBottom: '6px'
                    }}>
                      {booking.bookingStatus}
                    </div>
                    <div style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: `${getPaymentStatusColor(booking.paymentStatus)}15`,
                      fontSize: '10px',
                      fontWeight: '600',
                      color: getPaymentStatusColor(booking.paymentStatus),
                      textTransform: 'uppercase'
                    }}>
                      {booking.paymentStatus}
                    </div>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedBooking(booking)}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'rgba(58, 134, 255, 0.2)',
                          color: '#3a86ff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Eye size={16} />
                      </motion.button>

                      {booking.bookingStatus === 'confirmed' && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleCancelBooking(booking.id)}
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'rgba(255, 0, 110, 0.2)',
                            color: '#ff006e',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <XCircle size={16} />
                        </motion.button>
                      )}

                      {booking.bookingStatus === 'cancelled' && booking.paymentStatus !== 'refunded' && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleIssueRefund(booking.id)}
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'rgba(131, 56, 236, 0.2)',
                            color: '#8338ec',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <DollarSign size={16} />
                        </motion.button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBooking && (
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
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '700px',
                background: 'rgba(20, 20, 30, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '40px',
                maxHeight: '90vh',
                overflow: 'auto'
              }}
            >
              <h2 style={{
                fontSize: '28px',
                fontWeight: '800',
                marginBottom: '30px',
                fontFamily: "'Orbitron', sans-serif"
              }}>
                Booking Details
              </h2>

              {/* Booking ID and Status */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
                padding: '20px',
                borderRadius: '15px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>Booking ID</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#8338ec', fontFamily: "'Orbitron', sans-serif" }}>
                    {selectedBooking.id}
                  </div>
                </div>
                <div style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  background: `${getStatusColor(selectedBooking.bookingStatus)}20`,
                  border: `1px solid ${getStatusColor(selectedBooking.bookingStatus)}`,
                  fontSize: '14px',
                  fontWeight: '700',
                  color: getStatusColor(selectedBooking.bookingStatus),
                  textTransform: 'uppercase'
                }}>
                  {selectedBooking.bookingStatus}
                </div>
              </div>

              {/* Customer Details */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  marginBottom: '15px',
                  color: '#8338ec',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Users size={18} />
                  Customer Information
                </h3>
                <div style={{
                  padding: '20px',
                  borderRadius: '15px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#888', fontSize: '13px' }}>Name: </span>
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>{selectedBooking.user}</span>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#888', fontSize: '13px' }}>Email: </span>
                    <span style={{ fontSize: '14px' }}>{selectedBooking.email}</span>
                  </div>
                  <div>
                    <span style={{ color: '#888', fontSize: '13px' }}>Phone: </span>
                    <span style={{ fontSize: '14px' }}>{selectedBooking.phone}</span>
                  </div>
                </div>
              </div>

              {/* Show Details */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  marginBottom: '15px',
                  color: '#ff006e',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Ticket size={18} />
                  Show Details
                </h3>
                <div style={{
                  padding: '20px',
                  borderRadius: '15px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#888', fontSize: '13px' }}>Movie: </span>
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>{selectedBooking.movie}</span>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#888', fontSize: '13px' }}>Theatre: </span>
                    <span style={{ fontSize: '14px' }}>{selectedBooking.theatre}</span>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#888', fontSize: '13px' }}>Screen: </span>
                    <span style={{ fontSize: '14px' }}>{selectedBooking.screen}</span>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#888', fontSize: '13px' }}>Date: </span>
                    <span style={{ fontSize: '14px' }}>{new Date(selectedBooking.date).toLocaleDateString()}</span>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#888', fontSize: '13px' }}>Time: </span>
                    <span style={{ fontSize: '14px' }}>{selectedBooking.time}</span>
                  </div>
                  <div>
                    <span style={{ color: '#888', fontSize: '13px' }}>Format: </span>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {selectedBooking.format}
                    </span>
                  </div>
                </div>
              </div>

              {/* Seats */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  marginBottom: '15px',
                  color: '#3a86ff'
                }}>
                  Selected Seats ({selectedBooking.seats.length})
                </h3>
                <div style={{
                  padding: '20px',
                  borderRadius: '15px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}>
                  {selectedBooking.seats.map(seat => (
                    <div
                      key={seat}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '10px',
                        background: 'rgba(58, 134, 255, 0.2)',
                        border: '1px solid rgba(58, 134, 255, 0.5)',
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#3a86ff'
                      }}
                    >
                      {seat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Breakdown */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  marginBottom: '15px',
                  color: '#06ffa5',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <DollarSign size={18} />
                  Payment Details
                </h3>
                <div style={{
                  padding: '20px',
                  borderRadius: '15px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#888', fontSize: '14px' }}>Tickets ({selectedBooking.seats.length} × ${selectedBooking.ticketPrice})</span>
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>${(selectedBooking.seats.length * selectedBooking.ticketPrice).toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#888', fontSize: '14px' }}>Convenience Fee</span>
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>${(selectedBooking.convenienceFee * selectedBooking.seats.length).toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <span style={{ color: '#888', fontSize: '14px' }}>Tax</span>
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>${selectedBooking.tax.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '16px', fontWeight: '700' }}>Total Amount</span>
                    <span style={{ fontSize: '24px', fontWeight: '800', color: '#06ffa5' }}>${selectedBooking.totalAmount.toFixed(2)}</span>
                  </div>
                  <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    borderRadius: '8px',
                    background: `${getPaymentStatusColor(selectedBooking.paymentStatus)}15`,
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: getPaymentStatusColor(selectedBooking.paymentStatus),
                    textTransform: 'uppercase'
                  }}>
                    Payment {selectedBooking.paymentStatus}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '15px' }}>
                {selectedBooking.bookingStatus === 'confirmed' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCancelBooking(selectedBooking.id)}
                    style={{
                      flex: 1,
                      padding: '16px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #ff006e, #d90057)',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <XCircle size={18} />
                    Cancel Booking
                  </motion.button>
                )}

                {selectedBooking.bookingStatus === 'cancelled' && selectedBooking.paymentStatus !== 'refunded' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleIssueRefund(selectedBooking.id)}
                    style={{
                      flex: 1,
                      padding: '16px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #8338ec, #6a28c7)',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <DollarSign size={18} />
                    Issue Refund
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedBooking(null)}
                  style={{
                    flex: 1,
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
