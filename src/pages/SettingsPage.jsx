import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, User, Mail, Phone, Lock, Bell, Globe, Moon, Sun, Trash2, Save } from 'lucide-react'

export default function SettingsPage({ onBack, user, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState('profile') // 'profile', 'notifications', 'preferences', 'security'
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    language: 'English',
    theme: 'dark',
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      // Save to localStorage or API
      const updatedUser = { ...user, ...formData }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      if (onUpdateUser) onUpdateUser(updatedUser)
      setIsSaving(false)
      alert('Settings saved successfully!')
    }, 1000)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'security', label: 'Security', icon: Lock }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        paddingTop: 'clamp(100px, 15vh, 140px)',
        paddingBottom: '50px'
      }}
    >
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 clamp(15px, 4vw, 40px)'
      }}>
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'transparent',
            border: 'none',
            color: '#888',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '30px',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          <ArrowLeft size={20} />
          Back to Home
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            marginBottom: '40px'
          }}
        >
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: '700',
            marginBottom: '10px',
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(135deg, #3a86ff, #8338ec)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Settings
          </h1>
          <p style={{ color: '#888', fontSize: '16px' }}>
            Manage your account preferences and settings
          </p>
        </motion.div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: window.innerWidth <= 768 ? '8px' : '15px',
          marginBottom: '30px',
          overflowX: 'auto',
          paddingBottom: '10px'
        }}>
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: window.innerWidth <= 768 ? '10px 15px' : '12px 20px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === tab.id
                  ? 'linear-gradient(135deg, #3a86ff, #8338ec)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              <tab.icon size={16} />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: window.innerWidth <= 768 ? '20px' : '30px'
          }}
        >
          {activeTab === 'profile' && (
            <ProfileSettings formData={formData} setFormData={setFormData} />
          )}
          {activeTab === 'notifications' && (
            <NotificationSettings formData={formData} setFormData={setFormData} />
          )}
          {activeTab === 'preferences' && (
            <PreferencesSettings formData={formData} setFormData={setFormData} />
          )}
          {activeTab === 'security' && (
            <SecuritySettings />
          )}
        </motion.div>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={isSaving}
          style={{
            marginTop: '30px',
            padding: '15px 40px',
            borderRadius: '15px',
            border: 'none',
            background: 'linear-gradient(135deg, #3a86ff, #8338ec)',
            color: 'white',
            fontSize: '16px',
            fontWeight: '700',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            fontFamily: "'Poppins', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            opacity: isSaving ? 0.6 : 1
          }}
        >
          <Save size={20} />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </div>
    </motion.div>
  )
}

function ProfileSettings({ formData, setFormData }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>
        Profile Information
      </h3>
      
      <InputField
        icon={User}
        label="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Enter your name"
      />
      
      <InputField
        icon={Mail}
        label="Email Address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Enter your email"
        type="email"
      />
      
      <InputField
        icon={Phone}
        label="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        placeholder="Enter your phone"
        type="tel"
      />
    </div>
  )
}

function NotificationSettings({ formData, setFormData }) {
  const toggleNotification = (type) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [type]: !formData.notifications[type]
      }
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>
        Notification Preferences
      </h3>
      
      <ToggleOption
        label="Email Notifications"
        description="Receive booking confirmations and updates via email"
        checked={formData.notifications.email}
        onChange={() => toggleNotification('email')}
      />
      
      <ToggleOption
        label="SMS Notifications"
        description="Get text messages for important updates"
        checked={formData.notifications.sms}
        onChange={() => toggleNotification('sms')}
      />
      
      <ToggleOption
        label="Push Notifications"
        description="Receive push notifications in your browser"
        checked={formData.notifications.push}
        onChange={() => toggleNotification('push')}
      />
    </div>
  )
}

function PreferencesSettings({ formData, setFormData }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>
        App Preferences
      </h3>
      
      <SelectField
        icon={Globe}
        label="Language"
        value={formData.language}
        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
        options={['English', 'Hindi', 'Spanish', 'French']}
      />
      
      <SelectField
        icon={formData.theme === 'dark' ? Moon : Sun}
        label="Theme"
        value={formData.theme}
        onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
        options={['dark', 'light']}
      />
    </div>
  )
}

function SecuritySettings() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>
        Security Settings
      </h3>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          padding: '15px 20px',
          borderRadius: '12px',
          border: '1px solid rgba(58, 134, 255, 0.5)',
          background: 'rgba(58, 134, 255, 0.1)',
          color: '#3a86ff',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          fontFamily: "'Poppins', sans-serif",
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <Lock size={18} />
        Change Password
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          padding: '15px 20px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 0, 110, 0.5)',
          background: 'rgba(255, 0, 110, 0.1)',
          color: '#ff006e',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          fontFamily: "'Poppins', sans-serif",
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <Trash2 size={18} />
        Delete Account
      </motion.button>
    </div>
  )
}

function InputField({ icon: Icon, label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '8px',
        color: '#888'
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <Icon size={18} color="#888" style={{
          position: 'absolute',
          left: '15px',
          top: '50%',
          transform: 'translateY(-50%)'
        }} />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '12px 15px 12px 45px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            fontSize: '14px',
            fontFamily: "'Poppins', sans-serif",
            outline: 'none'
          }}
        />
      </div>
    </div>
  )
}

function SelectField({ icon: Icon, label, value, onChange, options }) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '8px',
        color: '#888'
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <Icon size={18} color="#888" style={{
          position: 'absolute',
          left: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />
        <select
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            padding: '12px 15px 12px 45px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            fontSize: '14px',
            fontFamily: "'Poppins', sans-serif",
            outline: 'none',
            cursor: 'pointer',
            textTransform: 'capitalize'
          }}
        >
          {options.map(opt => (
            <option key={opt} value={opt} style={{ background: '#1a1a2e', color: 'white' }}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

function ToggleOption({ label, description, checked, onChange }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      borderRadius: '12px',
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>
          {label}
        </div>
        <div style={{ fontSize: '12px', color: '#888' }}>
          {description}
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onChange}
        style={{
          width: '50px',
          height: '28px',
          borderRadius: '14px',
          border: 'none',
          background: checked ? 'linear-gradient(135deg, #3a86ff, #8338ec)' : 'rgba(255, 255, 255, 0.1)',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        <motion.div
          animate={{ x: checked ? 24 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'white',
            position: 'absolute',
            top: '2px'
          }}
        />
      </motion.button>
    </div>
  )
}
