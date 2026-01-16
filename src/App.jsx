import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Background3D from './components/Background3D'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import MovieListingPage from './pages/MovieListingPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import TheatreSelectionPage from './pages/TheatreSelectionPage'
import SeatSelection from './pages/SeatSelection'
import PaymentPage from './pages/PaymentPage'
import BookingConfirmation from './pages/BookingConfirmation'
import AdminDashboard from './pages/AdminDashboard'
import MovieTrailer from './components/MovieTrailer'
import VoiceSearch from './components/VoiceSearch'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedTheatre, setSelectedTheatre] = useState(null)
  const [bookingDetails, setBookingDetails] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)
  const [trailerMovie, setTrailerMovie] = useState(null)
  const [showVoiceSearch, setShowVoiceSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Initialize authentication state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated')
    return savedAuth === 'true'
  })
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  // Persist authentication state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated)
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [isAuthenticated, user])

  const handleMovieSelect = (movie) => {
    if (!isAuthenticated) {
      setSelectedMovie(movie) // Store the movie for later
      setCurrentPage('login')
      return
    }
    setSelectedMovie(movie)
    setCurrentPage('theatres')
  }

  const handleTheatreSelect = (theatreData) => {
    setSelectedTheatre(theatreData)
    setCurrentPage('seats')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
    setSelectedMovie(null)
    setBookingDetails(null)
  }

  const handleBookingConfirm = (seats, showtime, totalPrice, seatsTotal, foodTotal, theatre) => {
    setBookingDetails({
      seats,
      showtime,
      totalPrice,
      seatsTotal,
      foodTotal,
      theatre
    })
    setCurrentPage('payment')
  }

  const handlePaymentSuccess = () => {
    setCurrentPage('confirmation')
  }

  const handleTrailerClick = (movie) => {
    setTrailerMovie(movie)
    setShowTrailer(true)
  }

  const handleVoiceSearch = (query) => {
    console.log('Voice search:', query)
    setSearchQuery(query)
    setCurrentPage('movies')
    setShowVoiceSearch(false)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim()) {
      setCurrentPage('movies')
    } else if (currentPage === 'movies') {
      // Stay on movies page even with empty search
    }
  }

  const handleLogoClick = () => {
    setCurrentPage('home')
    setSearchQuery('')
  }

  const handleLogin = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    // If user was trying to book a movie, continue to theatres page
    if (selectedMovie) {
      setCurrentPage('theatres')
    } else {
      setCurrentPage('home')
    }
  }

  const handleSignUp = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    // If user was trying to book a movie, continue to theatres page
    if (selectedMovie) {
      setCurrentPage('theatres')
    } else {
      setCurrentPage('home')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
    setCurrentPage('home')
  }

  const handleUserIconClick = () => {
    if (isAuthenticated) {
      // Could navigate to profile page or show a dropdown menu
      // For now, we'll just log out on click (or could show a menu)
      handleLogout()
    } else {
      setCurrentPage('login')
    }
  }

  return (
    <>
      {currentPage === 'admin' ? (
        <AdminDashboard />
      ) : (
        <>
          <Background3D />
          <Header
            onVoiceSearchClick={() => setShowVoiceSearch(true)}
            onSearch={handleSearch}
            searchValue={searchQuery}
            onLogoClick={handleLogoClick}
            onUserClick={handleUserIconClick}
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
          />

          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
          <HomePage
            key="home"
            onMovieSelect={handleMovieSelect}
            onTrailerClick={handleTrailerClick}
          />
        )}

        {currentPage === 'movies' && (
          <MovieListingPage
            key="movies"
            onMovieSelect={handleMovieSelect}
            onTrailerClick={handleTrailerClick}
            searchQuery={searchQuery}
          />
        )}

        {currentPage === 'login' && (
          <LoginPage
            key="login"
            onLogin={handleLogin}
            onNavigateToSignUp={() => setCurrentPage('signup')}
            onNavigateToForgotPassword={() => setCurrentPage('forgot-password')}
            onBack={handleBackToHome}
          />
        )}

        {currentPage === 'signup' && (
          <SignUpPage
            key="signup"
            onSignUp={handleSignUp}
            onNavigateToLogin={() => setCurrentPage('login')}
            onBack={handleBackToHome}
          />
        )}

        {currentPage === 'forgot-password' && (
          <ForgotPasswordPage
            key="forgot-password"
            onNavigateToLogin={() => setCurrentPage('login')}
            onBack={handleBackToHome}
          />
        )}

        {currentPage === 'theatres' && selectedMovie && (
          <TheatreSelectionPage
            key="theatres"
            movie={selectedMovie}
            onBack={handleBackToHome}
            onTheatreSelect={handleTheatreSelect}
          />
        )}

        {currentPage === 'seats' && selectedMovie && selectedTheatre && (
          <SeatSelection
            key="seats"
            movie={selectedMovie}
            theatre={selectedTheatre}
            onBack={() => setCurrentPage('theatres')}
            onConfirm={handleBookingConfirm}
          />
        )}

        {currentPage === 'payment' && selectedMovie && bookingDetails && (
          <PaymentPage
            key="payment"
            movie={selectedMovie}
            bookingDetails={bookingDetails}
            onBack={() => setCurrentPage('seats')}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {currentPage === 'confirmation' && selectedMovie && bookingDetails && (
          <BookingConfirmation
            key="confirmation"
            movie={selectedMovie}
            seats={bookingDetails.seats}
            showtime={bookingDetails.showtime}
            totalPrice={bookingDetails.totalPrice}
            onBackHome={handleBackToHome}
          />
        )}
      </AnimatePresence>

      {/* Modals */}
      {showTrailer && trailerMovie && (
        <MovieTrailer
          movie={trailerMovie}
          onClose={() => setShowTrailer(false)}
        />
      )}

      {showVoiceSearch && (
        <VoiceSearch
          onClose={() => setShowVoiceSearch(false)}
          onSearch={handleVoiceSearch}
        />
      )}
        </>
      )}
    </>
  )
}

export default App
