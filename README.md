# CineVerse - Movie Ticket Booking App

A stunning 3D movie ticket booking application with an immersive user experience, built with React, Three.js, and Framer Motion.

## Features

### 🎬 Unique 3D Background
- **Cinematic Film Reel Tunnel** - Animated rotating film reels creating a tunnel effect
- **Neon Light Trails** - 2000+ flowing particles with additive blending
- **Holographic Rings** - Rotating wireframe rings with dynamic movement
- **Floating Movie Posters** - Animated 3D poster elements
- **Energy Orbs** - Pulsating spheres with emissive materials
- **Custom Lighting** - Multi-colored point lights and spotlights

### ✨ Interactive Features
- **Movie Trailer Player** - Full-screen trailer viewer with controls
- **Voice Search** - AI-powered voice search with visual audio feedback
- **Watch Party** - Invite friends to watch movies together
- **3D Movie Cards** - Cards with 3D tilt and hover effects
- **Smooth Animations** - Framer Motion powered transitions
- **Seat Selection** - Interactive 3D seat picker
- **Booking Confirmation** - Animated success page with confetti

### 🎨 UI/UX Elements
- **Glassmorphism Design** - Frosted glass effects throughout
- **Gradient Accents** - Pink, purple, and blue color scheme
- **Responsive Animations** - Micro-interactions on all elements
- **Horizontal Scrolling** - Smooth movie carousel
- **Custom Scrollbar** - Gradient styled scrollbar
- **Interactive Buttons** - Quick actions for Trailer and Watch Party

## Tech Stack

- React 18
- Three.js & React Three Fiber
- Framer Motion
- Vite
- Lucide React Icons

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Background3D.jsx       # 3D animated background
│   ├── Header.jsx             # App header with voice search
│   ├── MovieCard.jsx          # Interactive movie card
│   ├── MovieTrailer.jsx       # Trailer player modal
│   ├── VoiceSearch.jsx        # Voice search interface
│   └── WatchParty.jsx         # Watch party invitation
├── pages/
│   ├── HomePage.jsx           # Main landing page
│   ├── SeatSelection.jsx      # Seat selection interface
│   └── BookingConfirmation.jsx # Booking success page
├── data/
│   └── movies.js              # Movie data
├── App.jsx                    # Main app component
├── main.jsx                   # App entry point
└── index.css                  # Global styles
```

## New Features

### 1. Movie Trailer
Click the "Trailer" button on any movie card to watch a full-screen trailer with video controls.

### 2. Voice Search
Click the microphone icon in the header to activate voice search with animated audio visualization.

### 3. Watch Party
Click the "Party" button to invite friends to watch movies together with video chat and live chat features.

### 4. Enhanced 3D Background
- Film reel tunnel effect
- Flowing neon particles
- Holographic rings
- Floating poster elements
- Energy orbs

## Customization

### Adding Movies
Edit `src/data/movies.js`:

```javascript
{
  id: 1,
  title: "Your Movie",
  genre: "Genre",
  rating: 9.0,
  duration: "2h 30m",
  description: "Description",
  poster: "poster-url",
  backdrop: "backdrop-url",
  showtimes: ["10:00 AM", "2:00 PM"],
  price: 15
}
```

### Styling
- Global styles: `src/index.css`
- Component styles are inline with styled props
- Color scheme: `#ff006e` (pink), `#8338ec` (purple), `#3a86ff` (blue)

## Performance

- Optimized 3D rendering with React Three Fiber
- Efficient particle systems
- Smooth 60fps animations
- Minimal re-renders

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

MIT

## Credits

Built with modern web technologies for an immersive cinema experience.
