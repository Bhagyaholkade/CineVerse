import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Film, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ChevronRight, X, CheckCircle, AlertCircle } from 'lucide-react'

export default function Footer({ onLogoClick }) {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({ title: '', content: '' })

  const footerLinks = {
    company: [
      { label: 'About Us', id: 'about' },
      { label: 'Careers', id: 'careers' },
      { label: 'Press', id: 'press' },
      { label: 'Blog', id: 'blog' }
    ],
    support: [
      { label: 'Help Center', id: 'help' },
      { label: 'Contact Us', id: 'contact' },
      { label: 'FAQs', id: 'faqs' },
      { label: 'Feedback', id: 'feedback' }
    ],
    legal: [
      { label: 'Terms', id: 'terms' },
      { label: 'Privacy', id: 'privacy' },
      { label: 'Cookies', id: 'cookies' },
      { label: 'Refunds', id: 'refund' }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', color: '#1877f2', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', color: '#1da1f2', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', color: '#e4405f', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com', color: '#ff0000', label: 'YouTube' }
  ]

  const modalContents = {
    about: { title: 'About CineVerse', content: `CineVerse is your ultimate destination for cinematic experiences.\n\nOur Mission: To make movie-going accessible and hassle-free.\n\nWe partner with 5000+ theatres across 200+ cities in India.` },
    careers: { title: 'Careers', content: `Join our team!\n\nOpenings:\n• Software Engineer - Mumbai\n• Product Designer - Bangalore\n• Marketing Manager - Delhi\n\nEmail: careers@cineverse.com` },
    press: { title: 'Press & Media', content: `Press Contact: press@cineverse.com\nPhone: +91 1800-123-4568` },
    blog: { title: 'Blog', content: `Latest Articles:\n• Top 10 Must-Watch Movies\n• Behind the Scenes at CineVerse\n• The Future of Cinema` },
    help: { title: 'Help Center', content: `Common Topics:\n• Booking tickets\n• Cancellation & refunds\n• Payment issues\n\nCall: 1800-123-4567 (24/7)` },
    contact: { title: 'Contact Us', content: `Email: support@cineverse.com\nPhone: +91 1800-123-4567\n\nAddress:\n123 Film City Road\nMumbai 400053` },
    faqs: { title: 'FAQs', content: `Q: How do I book?\nA: Search, select, pay!\n\nQ: Can I cancel?\nA: Yes, up to 2 hours before.\n\nQ: Payment methods?\nA: Cards, UPI, Wallets.` },
    feedback: { title: 'Feedback', content: `Email: feedback@cineverse.com\nCall: 1800-123-4567\n\nWe value your input!` },
    terms: { title: 'Terms of Service', content: `By using CineVerse, you agree to:\n• Provide accurate info\n• Not misuse the platform\n• Accept our cancellation policy` },
    privacy: { title: 'Privacy Policy', content: `We collect: Name, email, phone\nWe protect: Industry-standard encryption\nWe don't: Sell your data` },
    cookies: { title: 'Cookie Policy', content: `We use cookies for:\n• Authentication\n• Analytics\n• Personalization` },
    refund: { title: 'Refund Policy', content: `• 2+ hours before: 100% refund\n• Less than 2 hours: No refund\n\nRefunds take 5-7 business days.` }
  }

  const handleLinkClick = (id) => {
    setModalContent(modalContents[id])
    setShowModal(true)
  }

  const handleSubscribe = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribeStatus('error')
      setTimeout(() => setSubscribeStatus(null), 3000)
      return
    }
    setSubscribeStatus('success')
    setEmail('')
    setTimeout(() => setSubscribeStatus(null), 3000)
  }

  const handleSocialClick = (href) => {
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <footer className="footer-container">
        <style>{`
          .footer-container {
            background: linear-gradient(180deg, rgba(10, 10, 20, 0.98) 0%, rgba(5, 5, 15, 1) 100%);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
            overflow: hidden;
          }
          .footer-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 20px 30px;
            position: relative;
            z-index: 1;
          }
          .footer-grid {
            display: grid;
            grid-template-columns: 1.5fr repeat(3, 1fr) 1.5fr;
            gap: 30px;
            margin-bottom: 25px;
          }
          .footer-brand h3 {
            font-size: 20px;
            margin-bottom: 12px;
          }
          .footer-brand p {
            color: #777;
            font-size: 13px;
            line-height: 1.5;
            margin-bottom: 12px;
          }
          .footer-links h4 {
            font-size: 14px;
            font-weight: 700;
            color: white;
            margin-bottom: 12px;
            text-transform: capitalize;
          }
          .footer-links ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .footer-links li {
            margin-bottom: 8px;
          }
          .footer-links button {
            color: #777;
            background: none;
            border: none;
            padding: 0;
            font-size: 13px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
            transition: color 0.3s, transform 0.3s;
          }
          .footer-links button:hover {
            color: #ff006e;
            transform: translateX(3px);
          }
          .newsletter-input {
            display: flex;
            gap: 8px;
            margin-bottom: 10px;
          }
          .newsletter-input input {
            flex: 1;
            min-width: 0;
            padding: 10px 12px;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.05);
            color: white;
            font-size: 13px;
            outline: none;
          }
          .newsletter-input input:focus {
            border-color: #8338ec;
          }
          .newsletter-btn {
            padding: 10px 16px;
            border-radius: 10px;
            border: none;
            background: linear-gradient(135deg, #ff006e, #8338ec);
            color: white;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            white-space: nowrap;
          }
          .social-links {
            display: flex;
            gap: 8px;
            margin-top: 10px;
          }
          .social-btn {
            width: 34px;
            height: 34px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
          }
          .footer-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            flex-wrap: wrap;
            gap: 10px;
          }
          .footer-bottom p {
            color: #555;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .footer-bottom-links {
            display: flex;
            gap: 15px;
          }
          .footer-bottom-links button {
            color: #555;
            background: none;
            border: none;
            font-size: 12px;
            cursor: pointer;
          }
          .footer-bottom-links button:hover {
            color: #ff006e;
          }

          /* Tablet */
          @media (max-width: 1024px) {
            .footer-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 25px;
            }
            .footer-brand {
              grid-column: 1 / -1;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            .footer-newsletter {
              grid-column: 1 / -1;
            }
          }

          /* Mobile */
          @media (max-width: 768px) {
            .footer-content {
              padding: 30px 15px 20px;
            }
            .footer-grid {
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            .footer-brand {
              grid-column: 1 / -1;
              display: block;
            }
            .footer-newsletter {
              grid-column: 1 / -1;
            }
            .footer-links h4 {
              font-size: 13px;
              margin-bottom: 10px;
            }
            .footer-links button {
              font-size: 12px;
            }
            .newsletter-input {
              flex-direction: column;
            }
            .newsletter-btn {
              width: 100%;
              padding: 12px;
            }
            .footer-bottom {
              flex-direction: column;
              text-align: center;
              gap: 8px;
            }
          }

          /* Small Mobile */
          @media (max-width: 480px) {
            .footer-grid {
              grid-template-columns: 1fr;
              gap: 18px;
            }
            .footer-links {
              display: grid;
              grid-template-columns: 1fr 1fr;
            }
            .footer-links ul {
              display: flex;
              flex-wrap: wrap;
              gap: 8px 15px;
            }
            .footer-links li {
              margin-bottom: 0;
            }
            .social-links {
              justify-content: center;
            }
          }
        `}</style>

        {/* Gradient orbs */}
        <div style={{
          position: 'absolute',
          top: '-30px',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(131, 56, 236, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20px',
          right: '10%',
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(255, 0, 110, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div className="footer-content">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={onLogoClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '12px',
                    cursor: 'pointer',
                    width: 'fit-content'
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(131, 56, 236, 0.3)'
                  }}>
                    <Film size={20} color="white" />
                  </div>
                  <span style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #ff006e, #8338ec)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: "'Orbitron', sans-serif"
                  }}>
                    CineVerse
                  </span>
                </motion.div>
                <p>Your ultimate destination for movies, events & entertainment booking.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { icon: Mail, text: 'support@cineverse.com', href: 'mailto:support@cineverse.com' },
                  { icon: Phone, text: '+91 1800-123-4567', href: 'tel:+911800123456' },
                  { icon: MapPin, text: 'Mumbai, India', href: null }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => item.href && window.open(item.href, item.href.startsWith('mailto') ? '_self' : '_blank')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#888',
                      fontSize: '12px',
                      cursor: item.href ? 'pointer' : 'default'
                    }}
                  >
                    <item.icon size={14} color="#8338ec" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="footer-links">
                <h4>{title}</h4>
                <ul>
                  {links.map((link, idx) => (
                    <li key={idx}>
                      <button onClick={() => handleLinkClick(link.id)}>
                        <ChevronRight size={12} style={{ opacity: 0.5 }} />
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter */}
            <div className="footer-newsletter">
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '10px' }}>
                Stay Updated
              </h4>
              <p style={{ color: '#777', fontSize: '12px', marginBottom: '10px' }}>
                Get notified about new releases & offers.
              </p>
              <div className="newsletter-input">
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                  style={{
                    borderColor: subscribeStatus === 'error' ? '#ff4444' : undefined
                  }}
                />
                <button className="newsletter-btn" onClick={handleSubscribe}>
                  Subscribe
                </button>
              </div>

              <AnimatePresence>
                {subscribeStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '11px',
                      color: subscribeStatus === 'success' ? '#4ade80' : '#ff4444',
                      marginBottom: '8px'
                    }}
                  >
                    {subscribeStatus === 'success' ? (
                      <><CheckCircle size={12} /><span>Subscribed!</span></>
                    ) : (
                      <><AlertCircle size={12} /><span>Enter valid email</span></>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="social-links">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon
                  return (
                    <motion.button
                      key={idx}
                      className="social-btn"
                      onClick={() => handleSocialClick(social.href)}
                      aria-label={social.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${social.color}20`
                        e.currentTarget.style.borderColor = social.color
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <Icon size={16} color="#fff" />
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="footer-bottom">
            <p>
              © {currentYear} CineVerse. Made with Bhagya
            </p>
            <div className="footer-bottom-links">
              {['Sitemap', 'Accessibility', 'Security'].map((item, idx) => (
                <button key={idx} onClick={() => handleLinkClick(idx === 2 ? 'privacy' : 'help')}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '15px'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.98), rgba(10, 10, 25, 0.98))',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                maxWidth: '450px',
                width: '100%',
                maxHeight: '70vh',
                overflow: 'hidden'
              }}
            >
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(131, 56, 236, 0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'white', margin: 0 }}>
                  {modalContent.title}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowModal(false)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <X size={16} />
                </motion.button>
              </div>
              <div style={{
                padding: '20px',
                overflowY: 'auto',
                maxHeight: 'calc(70vh - 60px)'
              }}>
                <p style={{
                  color: '#bbb',
                  fontSize: '13px',
                  lineHeight: '1.7',
                  whiteSpace: 'pre-line'
                }}>
                  {modalContent.content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
