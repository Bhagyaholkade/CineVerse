import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, Plus, Minus, ShoppingBag, Sparkles, Flame, Star, Percent, Clock, Check, Trash2, ChevronRight } from 'lucide-react'

const CAFE_CATEGORIES = [
  { id: 'all', name: 'All Items', icon: '🎬', color: '#ff006e' },
  { id: 'combos', name: 'Value Combos', icon: '🎁', color: '#06ffa5' },
  { id: 'popcorn', name: 'Popcorn', icon: '🍿', color: '#ffd700' },
  { id: 'snacks', name: 'Snacks', icon: '🍟', color: '#ff9800' },
  { id: 'beverages', name: 'Beverages', icon: '🥤', color: '#00bcd4' },
  { id: 'desserts', name: 'Desserts', icon: '🍦', color: '#e91e63' }
]

const CAFE_ITEMS = [
  // Combos - Best Value
  {
    id: 1,
    name: 'Movie Night Combo',
    description: 'Large Popcorn + 2 Regular Colas',
    price: 399,
    originalPrice: 520,
    image: '🍿',
    category: 'combos',
    badge: 'Best Seller',
    badgeColor: '#ff006e',
    rating: 4.8,
    reviews: 2847
  },
  {
    id: 2,
    name: 'Family Feast',
    description: 'Jumbo Popcorn + 4 Drinks + Nachos',
    price: 699,
    originalPrice: 920,
    image: '👨‍👩‍👧‍👦',
    category: 'combos',
    badge: 'Value Pack',
    badgeColor: '#06ffa5',
    rating: 4.9,
    reviews: 1523
  },
  {
    id: 3,
    name: 'Couple Special',
    description: 'Medium Popcorn + 2 Drinks + Nachos',
    price: 449,
    originalPrice: 580,
    image: '💑',
    category: 'combos',
    badge: 'Popular',
    badgeColor: '#8338ec',
    rating: 4.7,
    reviews: 3201
  },
  {
    id: 4,
    name: 'Premium Experience',
    description: 'Cheese Popcorn + Loaded Nachos + 2 Mojitos',
    price: 599,
    originalPrice: 780,
    image: '👑',
    category: 'combos',
    badge: 'Premium',
    badgeColor: '#ffd700',
    rating: 4.9,
    reviews: 892
  },

  // Popcorn
  {
    id: 5,
    name: 'Classic Butter Popcorn',
    description: 'Freshly popped with golden butter',
    price: 180,
    image: '🍿',
    category: 'popcorn',
    rating: 4.6,
    reviews: 5621,
    sizes: ['Regular ₹180', 'Large ₹280', 'Jumbo ₹380']
  },
  {
    id: 6,
    name: 'Caramel Crunch',
    description: 'Sweet caramel coated goodness',
    price: 220,
    image: '🍯',
    category: 'popcorn',
    badge: 'Sweet',
    badgeColor: '#f59e0b',
    rating: 4.8,
    reviews: 2341
  },
  {
    id: 7,
    name: 'Cheesy Blast',
    description: 'Triple cheese explosion',
    price: 240,
    image: '🧀',
    category: 'popcorn',
    badge: 'Cheesy',
    badgeColor: '#fbbf24',
    rating: 4.7,
    reviews: 1876
  },
  {
    id: 8,
    name: 'Peri Peri Fire',
    description: 'Spicy African flavored kick',
    price: 220,
    image: '🌶️',
    category: 'popcorn',
    badge: 'Spicy',
    badgeColor: '#ef4444',
    rating: 4.5,
    reviews: 1432
  },
  {
    id: 9,
    name: 'Masala Magic',
    description: 'Indian spices blend',
    price: 200,
    image: '✨',
    category: 'popcorn',
    badge: 'Desi',
    badgeColor: '#ff9800',
    rating: 4.6,
    reviews: 2156
  },

  // Snacks
  {
    id: 10,
    name: 'Loaded Nachos Supreme',
    description: 'With cheese, jalapeños, salsa & sour cream',
    price: 320,
    image: '🌮',
    category: 'snacks',
    badge: 'Hot Seller',
    badgeColor: '#ef4444',
    rating: 4.8,
    reviews: 3421
  },
  {
    id: 11,
    name: 'Crispy Cheese Fries',
    description: 'Golden fries with melted cheddar',
    price: 220,
    image: '🍟',
    category: 'snacks',
    rating: 4.6,
    reviews: 2187
  },
  {
    id: 12,
    name: 'Chicken Nuggets (8pc)',
    description: 'Crispy nuggets with 3 dipping sauces',
    price: 320,
    image: '🍗',
    category: 'snacks',
    rating: 4.7,
    reviews: 1654
  },
  {
    id: 13,
    name: 'Paneer Tikka Wrap',
    description: 'Grilled paneer in soft tortilla',
    price: 280,
    image: '🌯',
    category: 'snacks',
    badge: 'Veg',
    badgeColor: '#22c55e',
    rating: 4.5,
    reviews: 987
  },
  {
    id: 14,
    name: 'Crispy Chicken Burger',
    description: 'Juicy patty with special sauce',
    price: 299,
    image: '🍔',
    category: 'snacks',
    rating: 4.6,
    reviews: 2341
  },
  {
    id: 15,
    name: 'Margherita Pizza Slice',
    description: 'Classic Italian with fresh basil',
    price: 180,
    image: '🍕',
    category: 'snacks',
    badge: 'Veg',
    badgeColor: '#22c55e',
    rating: 4.4,
    reviews: 1543
  },
  {
    id: 16,
    name: 'Hot Dog Classic',
    description: 'Grilled sausage with toppings',
    price: 199,
    image: '🌭',
    category: 'snacks',
    rating: 4.3,
    reviews: 876
  },

  // Beverages
  {
    id: 17,
    name: 'Coca Cola',
    description: 'Ice cold refreshment',
    price: 120,
    image: '🥤',
    category: 'beverages',
    rating: 4.5,
    reviews: 8765,
    sizes: ['Regular ₹120', 'Large ₹180']
  },
  {
    id: 18,
    name: 'Pepsi',
    description: 'Chilled Pepsi perfection',
    price: 120,
    image: '🥤',
    category: 'beverages',
    rating: 4.4,
    reviews: 6543
  },
  {
    id: 19,
    name: 'Virgin Mojito',
    description: 'Fresh mint & lime cooler',
    price: 180,
    image: '🍹',
    category: 'beverages',
    badge: 'Refreshing',
    badgeColor: '#06ffa5',
    rating: 4.8,
    reviews: 3421
  },
  {
    id: 20,
    name: 'Iced Cappuccino',
    description: 'Creamy coffee with ice',
    price: 220,
    image: '☕',
    category: 'beverages',
    badge: 'Caffeine',
    badgeColor: '#8b4513',
    rating: 4.7,
    reviews: 2187
  },
  {
    id: 21,
    name: 'Mango Smoothie',
    description: 'Fresh Alphonso mango blend',
    price: 200,
    image: '🥭',
    category: 'beverages',
    badge: 'Seasonal',
    badgeColor: '#f59e0b',
    rating: 4.9,
    reviews: 1876
  },
  {
    id: 22,
    name: 'Blue Lagoon',
    description: 'Tropical blue curacao mocktail',
    price: 190,
    image: '🧊',
    category: 'beverages',
    badge: 'New',
    badgeColor: '#00bcd4',
    rating: 4.6,
    reviews: 654
  },
  {
    id: 23,
    name: 'Mineral Water',
    description: '500ml bottle',
    price: 40,
    image: '💧',
    category: 'beverages',
    rating: 4.2,
    reviews: 12543
  },

  // Desserts
  {
    id: 24,
    name: 'Chocolate Brownie',
    description: 'Warm gooey brownie with ice cream',
    price: 220,
    image: '🍫',
    category: 'desserts',
    badge: 'Must Try',
    badgeColor: '#8b4513',
    rating: 4.9,
    reviews: 4321
  },
  {
    id: 25,
    name: 'Vanilla Sundae',
    description: 'With chocolate sauce & nuts',
    price: 160,
    image: '🍨',
    category: 'desserts',
    rating: 4.6,
    reviews: 2187
  },
  {
    id: 26,
    name: 'Choco Lava Cake',
    description: 'Molten chocolate center explosion',
    price: 260,
    image: '🎂',
    category: 'desserts',
    badge: 'Premium',
    badgeColor: '#ffd700',
    rating: 4.9,
    reviews: 1654
  },
  {
    id: 27,
    name: 'Oreo Shake',
    description: 'Creamy Oreo milkshake',
    price: 200,
    image: '🍪',
    category: 'desserts',
    rating: 4.7,
    reviews: 2341
  },
  {
    id: 28,
    name: 'Gulab Jamun (2pc)',
    description: 'Warm traditional Indian sweet',
    price: 120,
    image: '🟤',
    category: 'desserts',
    badge: 'Desi',
    badgeColor: '#ff9800',
    rating: 4.5,
    reviews: 1234
  }
]

export default function CafeMenu({ isOpen, onClose, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState({})
  const [showCart, setShowCart] = useState(false)
  const [addedItem, setAddedItem] = useState(null)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const filteredItems = selectedCategory === 'all'
    ? CAFE_ITEMS
    : CAFE_ITEMS.filter(item => item.category === selectedCategory)

  const addItem = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }))
    setAddedItem(item.id)
    setTimeout(() => setAddedItem(null), 1000)
  }

  const removeItem = (itemId) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) {
        newCart[itemId]--
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

  const clearCart = () => {
    setCart({})
  }

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, qty]) => {
      const item = CAFE_ITEMS.find(i => i.id === parseInt(itemId))
      return total + (item ? item.price * qty : 0)
    }, 0)
  }

  const getCartSavings = () => {
    return Object.entries(cart).reduce((total, [itemId, qty]) => {
      const item = CAFE_ITEMS.find(i => i.id === parseInt(itemId))
      if (item && item.originalPrice) {
        return total + ((item.originalPrice - item.price) * qty)
      }
      return total
    }, 0)
  }

  const getCartItemCount = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  }

  const getCartItems = () => {
    return Object.entries(cart).map(([itemId, qty]) => {
      const item = CAFE_ITEMS.find(i => i.id === parseInt(itemId))
      return { ...item, quantity: qty }
    }).filter(Boolean)
  }

  const handleCheckout = () => {
    setOrderPlaced(true)
    setTimeout(() => {
      if (onAddToCart) {
        onAddToCart(cart)
      }
      setOrderPlaced(false)
      setCart({})
      onClose()
    }, 2000)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

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
          background: 'rgba(0, 0, 0, 0.92)',
          backdropFilter: 'blur(15px)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '15px'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '1200px',
            maxHeight: '92vh',
            background: 'linear-gradient(145deg, rgba(18, 18, 28, 0.98), rgba(8, 8, 18, 0.98))',
            borderRadius: '25px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 30px 100px rgba(0, 0, 0, 0.8), 0 0 150px rgba(255, 0, 110, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Order Placed Animation */}
          <AnimatePresence>
            {orderPlaced && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.95)',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px'
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #06ffa5, #00bcd4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 60px rgba(6, 255, 165, 0.5)'
                  }}
                >
                  <Check size={50} color="white" strokeWidth={3} />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: 'white',
                    fontFamily: "'Orbitron', sans-serif"
                  }}
                >
                  Order Added!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{ color: '#888', fontSize: '16px' }}
                >
                  Your items will be ready at the counter
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div style={{
            padding: 'clamp(18px, 4vw, 28px) clamp(18px, 4vw, 30px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.08), rgba(131, 56, 236, 0.08))',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Animated particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 10, 0],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#ff006e',
                  left: `${15 + i * 15}%`,
                  bottom: '20%',
                  boxShadow: '0 0 10px #ff006e'
                }}
              />
            ))}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    width: 'clamp(50px, 10vw, 65px)',
                    height: 'clamp(50px, 10vw, 65px)',
                    borderRadius: '18px',
                    background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(26px, 5vw, 34px)',
                    boxShadow: '0 10px 40px rgba(255, 0, 110, 0.4)'
                  }}
                >
                  🍿
                </motion.div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{
                      fontSize: 'clamp(22px, 5vw, 30px)',
                      fontWeight: '800',
                      fontFamily: "'Orbitron', sans-serif",
                      background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      CineVerse Cafe
                    </h2>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles size={20} color="#ffd700" />
                    </motion.div>
                  </div>
                  <p style={{
                    color: '#888',
                    fontSize: 'clamp(11px, 2vw, 13px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Clock size={12} />
                    Ready in 5-10 minutes
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCart(!showCart)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '15px',
                    border: getCartItemCount() > 0 ? '2px solid #ff006e' : '1px solid rgba(255, 255, 255, 0.2)',
                    background: getCartItemCount() > 0
                      ? 'linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(131, 56, 236, 0.2))'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '14px',
                    position: 'relative'
                  }}
                >
                  <ShoppingBag size={20} />
                  {getCartItemCount() > 0 && (
                    <>
                      <span>₹{getCartTotal()}</span>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: '#ff006e',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 15px rgba(255, 0, 110, 0.5)'
                        }}
                      >
                        {getCartItemCount()}
                      </motion.span>
                    </>
                  )}
                </motion.button>

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={22} />
                </motion.button>
              </div>
            </div>

            {/* Category Tabs */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '18px',
              overflowX: 'auto',
              paddingBottom: '5px'
            }}
            className="hide-scrollbar"
            >
              {CAFE_CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '25px',
                    border: selectedCategory === cat.id
                      ? `2px solid ${cat.color}`
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    background: selectedCategory === cat.id
                      ? `${cat.color}20`
                      : 'rgba(255, 255, 255, 0.03)',
                    color: selectedCategory === cat.id ? cat.color : '#888',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease',
                    boxShadow: selectedCategory === cat.id ? `0 5px 20px ${cat.color}30` : 'none'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{cat.icon}</span>
                  {cat.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Items Grid */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: 'clamp(15px, 3vw, 25px)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 'clamp(12px, 2vw, 18px)'
              }}>
                {filteredItems.map((item, index) => {
                  const quantity = cart[item.id] || 0
                  const discount = item.originalPrice
                    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                    : 0

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      style={{
                        background: quantity > 0
                          ? 'linear-gradient(135deg, rgba(255, 0, 110, 0.12), rgba(131, 56, 236, 0.12))'
                          : 'rgba(255, 255, 255, 0.02)',
                        border: quantity > 0
                          ? '2px solid rgba(255, 0, 110, 0.5)'
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '18px',
                        padding: 'clamp(14px, 3vw, 18px)',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {/* Added animation */}
                      <AnimatePresence>
                        {addedItem === item.id && (
                          <motion.div
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 3, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              width: '50px',
                              height: '50px',
                              borderRadius: '50%',
                              background: 'rgba(6, 255, 165, 0.3)',
                              transform: 'translate(-50%, -50%)',
                              pointerEvents: 'none',
                              zIndex: 10
                            }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Badge */}
                      {item.badge && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          padding: '4px 10px',
                          borderRadius: '15px',
                          background: `${item.badgeColor}25`,
                          border: `1px solid ${item.badgeColor}`,
                          color: item.badgeColor,
                          fontSize: '10px',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {item.badge === 'Best Seller' && <Flame size={10} />}
                          {item.badge === 'Popular' && <Star size={10} />}
                          {item.badge === 'Premium' && <Sparkles size={10} />}
                          {item.badge}
                        </div>
                      )}

                      {/* Discount Badge */}
                      {discount > 0 && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          padding: '4px 8px',
                          borderRadius: '8px',
                          background: '#06ffa5',
                          color: '#000',
                          fontSize: '11px',
                          fontWeight: '800',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}>
                          <Percent size={10} />
                          {discount}% OFF
                        </div>
                      )}

                      {/* Item Image/Emoji */}
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        style={{
                          fontSize: item.category === 'combos' ? '42px' : '48px',
                          textAlign: 'center',
                          marginBottom: '12px',
                          marginTop: (item.badge || discount) ? '20px' : '5px',
                          filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))'
                        }}
                      >
                        {item.image}
                      </motion.div>

                      {/* Item Details */}
                      <h3 style={{
                        fontSize: 'clamp(14px, 3vw, 16px)',
                        fontWeight: '700',
                        marginBottom: '4px',
                        color: 'white'
                      }}>
                        {item.name}
                      </h3>
                      <p style={{
                        fontSize: '12px',
                        color: '#777',
                        marginBottom: '8px',
                        lineHeight: '1.4'
                      }}>
                        {item.description}
                      </p>

                      {/* Rating */}
                      {item.rating && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginBottom: '12px'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: 'rgba(6, 255, 165, 0.1)',
                            border: '1px solid rgba(6, 255, 165, 0.3)'
                          }}>
                            <Star size={12} fill="#06ffa5" color="#06ffa5" />
                            <span style={{ color: '#06ffa5', fontSize: '12px', fontWeight: '700' }}>
                              {item.rating}
                            </span>
                          </div>
                          <span style={{ color: '#666', fontSize: '11px' }}>
                            ({item.reviews?.toLocaleString()})
                          </span>
                        </div>
                      )}

                      {/* Price & Add Button */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <span style={{
                            fontSize: 'clamp(18px, 4vw, 22px)',
                            fontWeight: '800',
                            color: quantity > 0 ? '#06ffa5' : '#ff006e',
                            fontFamily: "'Orbitron', sans-serif"
                          }}>
                            ₹{item.price}
                          </span>
                          {item.originalPrice && (
                            <span style={{
                              fontSize: '13px',
                              color: '#555',
                              textDecoration: 'line-through',
                              marginLeft: '8px'
                            }}>
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </div>

                        {quantity === 0 ? (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => addItem(item)}
                            style={{
                              padding: '10px 22px',
                              borderRadius: '25px',
                              border: 'none',
                              background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                              color: 'white',
                              fontWeight: '700',
                              fontSize: '12px',
                              cursor: 'pointer',
                              fontFamily: "'Poppins', sans-serif",
                              boxShadow: '0 5px 20px rgba(255, 0, 110, 0.35)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px'
                            }}
                          >
                            <Plus size={14} />
                            ADD
                          </motion.button>
                        ) : (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '4px',
                              borderRadius: '25px',
                              background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(131, 56, 236, 0.2))',
                              border: '2px solid #ff006e'
                            }}
                          >
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                border: 'none',
                                background: '#ff006e',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Minus size={14} />
                            </motion.button>
                            <motion.span
                              key={quantity}
                              initial={{ scale: 1.5 }}
                              animate={{ scale: 1 }}
                              style={{
                                fontSize: '16px',
                                fontWeight: '800',
                                color: 'white',
                                minWidth: '28px',
                                textAlign: 'center'
                              }}
                            >
                              {quantity}
                            </motion.span>
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => addItem(item)}
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                border: 'none',
                                background: '#ff006e',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Plus size={14} />
                            </motion.button>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Cart Sidebar */}
            <AnimatePresence>
              {showCart && getCartItemCount() > 0 && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'clamp(280px, 30vw, 350px)', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  style={{
                    borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    padding: '20px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <ShoppingBag size={20} color="#ff006e" />
                      Your Order
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={clearCart}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 0, 0, 0.3)',
                        background: 'rgba(255, 0, 0, 0.1)',
                        color: '#ff4444',
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Trash2 size={12} />
                      Clear
                    </motion.button>
                  </div>

                  <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '15px'
                  }}>
                    {getCartItems().map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px',
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          marginBottom: '10px'
                        }}
                      >
                        <span style={{ fontSize: '28px' }}>{item.image}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: 'white',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {item.name}
                          </p>
                          <p style={{ fontSize: '12px', color: '#888' }}>
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                        <span style={{
                          fontSize: '15px',
                          fontWeight: '700',
                          color: '#06ffa5'
                        }}>
                          ₹{item.price * item.quantity}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div style={{
                    padding: '20px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(0, 0, 0, 0.3)'
                  }}>
                    {getCartSavings() > 0 && (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                        padding: '10px',
                        borderRadius: '10px',
                        background: 'rgba(6, 255, 165, 0.1)',
                        border: '1px solid rgba(6, 255, 165, 0.3)'
                      }}>
                        <span style={{ color: '#06ffa5', fontSize: '13px', fontWeight: '600' }}>
                          You Save
                        </span>
                        <span style={{ color: '#06ffa5', fontSize: '14px', fontWeight: '700' }}>
                          ₹{getCartSavings()}
                        </span>
                      </div>
                    )}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '15px'
                    }}>
                      <span style={{ color: '#888', fontSize: '14px' }}>Total</span>
                      <span style={{
                        fontSize: '24px',
                        fontWeight: '800',
                        color: 'white',
                        fontFamily: "'Orbitron', sans-serif"
                      }}>
                        ₹{getCartTotal()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Checkout Bar */}
          <AnimatePresence>
            {getCartItemCount() > 0 && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                style={{
                  padding: 'clamp(15px, 3vw, 20px) clamp(18px, 4vw, 30px)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(131, 56, 236, 0.1))',
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                    <span style={{ color: '#888', fontSize: '13px' }}>
                      {getCartItemCount()} item{getCartItemCount() > 1 ? 's' : ''} in cart
                    </span>
                    {getCartSavings() > 0 && (
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '10px',
                        background: 'rgba(6, 255, 165, 0.2)',
                        color: '#06ffa5',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}>
                        Save ₹{getCartSavings()}
                      </span>
                    )}
                  </div>
                  <span style={{
                    fontSize: 'clamp(24px, 5vw, 32px)',
                    fontWeight: '800',
                    color: 'white',
                    fontFamily: "'Orbitron', sans-serif"
                  }}>
                    ₹{getCartTotal()}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 15px 50px rgba(255, 0, 110, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCheckout}
                  style={{
                    padding: 'clamp(14px, 3vw, 18px) clamp(30px, 6vw, 50px)',
                    borderRadius: '18px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: 'clamp(14px, 3vw, 16px)',
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    boxShadow: '0 10px 40px rgba(255, 0, 110, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  Add to Order
                  <ChevronRight size={20} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
