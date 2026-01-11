import { useState } from 'react'
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
import BookingConfirmation from './pages/BookingConfirmation'
import AdminDashboard from './pages/AdminDashboard'
import MovieTrailer from './components/MovieTrailer'
import VoiceSearch from './components/VoiceSearch'
import WatchParty from './components/WatchParty'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedTheatre, setSelectedTheatre] = useState(null)
  const [bookingDetails, setBookingDetails] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)
  const [trailerMovie, setTrailerMovie] = useState(null)
  const [showVoiceSearch, setShowVoiceSearch] = useState(false)
  const [showWatchParty, setShowWatchParty] = useState(false)
  const [watchPartyMovie, setWatchPartyMovie] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleMovieSelect = (movie) => {
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

  const handleBookingConfirm = (seats, showtime, totalPrice) => {
    setBookingDetails({ seats, showtime, totalPrice })
    setCurrentPage('confirmation')
  }

  const handleTrailerClick = (movie) => {
    setTrailerMovie(movie)
    setShowTrailer(true)
  }

  const handleWatchPartyClick = (movie) => {
    setWatchPartyMovie(movie)
    setShowWatchParty(true)
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

  const handleLogin = (identifier) => {
    setIsAuthenticated(true)
    setUser({ identifier })
    setCurrentPage('home')
  }

  const handleSignUp = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    setCurrentPage('home')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
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
          />

          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
          <HomePage
            key="home"
            onMovieSelect={handleMovieSelect}
            onTrailerClick={handleTrailerClick}
            onWatchPartyClick={handleWatchPartyClick}
          />
        )}

        {currentPage === 'movies' && (
          <MovieListingPage
            key="movies"
            onMovieSelect={handleMovieSelect}
            onTrailerClick={handleTrailerClick}
            onWatchPartyClick={handleWatchPartyClick}
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

      {showWatchParty && watchPartyMovie && (
        <WatchParty
          movie={watchPartyMovie}
          onClose={() => setShowWatchParty(false)}
        />
      )}
        </>
      )}
    </>
  )
}

export default App
