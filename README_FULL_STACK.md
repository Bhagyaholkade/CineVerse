# 🎬 Movie Ticket Booking App - Full Stack

A modern, feature-rich movie ticket booking application with 3D animations, real-time seat selection, and complete backend API.

## 🌟 Features

### Frontend
- ✅ **Hero Banner**: Auto-sliding carousel with featured movies
- ✅ **Movie Browsing**: Grid view with filters (genre, language, format, rating)
- ✅ **Search**: Real-time movie search
- ✅ **Theatre Selection**: Choose city, theatre, screen, and showtime
- ✅ **Seat Selection**: Interactive seat map with real-time availability
- ✅ **User Authentication**: Login, signup, password reset
- ✅ **Booking History**: View past and upcoming bookings
- ✅ **3D Background**: Beautiful cinema-themed animations
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile

### Backend
- ✅ **REST API**: Complete RESTful API with Express.js
- ✅ **Database**: MongoDB with Mongoose ODM
- ✅ **Authentication**: JWT-based secure authentication
- ✅ **Real-time Updates**: Seat availability tracking
- ✅ **Booking System**: Complete booking flow with payment tracking
- ✅ **Admin Ready**: CRUD operations for movies and theatres

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### Installation

#### 1. Install MongoDB
**Choose one option:**

**Option A - Local MongoDB:**
1. Download: https://www.mongodb.com/try/download/community
2. Install with default settings
3. Start MongoDB service: `net start MongoDB`

**Option B - MongoDB Atlas (Cloud):**
1. Sign up: https://www.mongodb.com/cloud/atlas/register
2. Create free cluster
3. Get connection string
4. Update `server/.env` with your connection string

**Detailed guide**: See [INSTALL_MONGODB.md](INSTALL_MONGODB.md)

#### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

#### 3. Seed Database
```bash
cd server
npm run seed
```

#### 4. Start Application

**Using Batch Scripts (Easy):**
- Double-click `start-backend.bat` (starts backend on port 5000)
- Double-click `start-frontend.bat` (starts frontend on port 5173)

**Using Terminal:**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
npm run dev
```

#### 5. Open Application
Navigate to: http://localhost:5173

## 📁 Project Structure

```
movie-ticket-booking-app/
│
├── server/                    # Backend
│   ├── models/               # MongoDB models
│   │   ├── Movie.js
│   │   ├── Theatre.js
│   │   ├── User.js
│   │   └── Booking.js
│   │
│   ├── routes/               # API routes
│   │   ├── movies.js
│   │   ├── theatres.js
│   │   ├── auth.js
│   │   └── bookings.js
│   │
│   ├── server.js             # Main server file
│   ├── seed.js               # Database seeding
│   ├── package.json
│   └── .env                  # Environment config
│
├── src/                      # Frontend
│   ├── components/           # React components
│   │   ├── Background3D.jsx
│   │   ├── Header.jsx
│   │   ├── MovieCard.jsx
│   │   └── ...
│   │
│   ├── pages/                # Page components
│   │   ├── HomePage.jsx
│   │   ├── MovieListingPage.jsx
│   │   ├── TheatreSelectionPage.jsx
│   │   ├── SeatSelection.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignUpPage.jsx
│   │   └── ...
│   │
│   ├── services/             # API services
│   │   └── api.js            # API integration layer
│   │
│   ├── data/                 # Static data (deprecated)
│   │   └── moviesData.js
│   │
│   ├── App.jsx               # Main app component
│   └── main.jsx              # Entry point
│
├── .env                      # Frontend environment
├── package.json              # Frontend dependencies
│
├── start-backend.bat         # Windows: Start backend
├── start-frontend.bat        # Windows: Start frontend
│
└── Documentation/
    ├── START_HERE.md         # Quick start guide
    ├── BACKEND_SETUP.md      # Backend setup guide
    ├── INSTALL_MONGODB.md    # MongoDB installation
    └── README_FULL_STACK.md  # This file
```

## 🔧 API Endpoints

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `GET /api/movies/featured/banner` - Get featured movies
- `POST /api/movies` - Create movie (Admin)
- `PUT /api/movies/:id` - Update movie (Admin)
- `DELETE /api/movies/:id` - Delete movie (Admin)

### Theatres
- `GET /api/theatres` - Get all theatres
- `GET /api/theatres/:id` - Get theatre by ID
- `GET /api/theatres/city/:city` - Get theatres by city
- `PATCH /api/theatres/:id/seats` - Update seat availability

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking by ID
- `GET /api/bookings/code/:code` - Get booking by code
- `PATCH /api/bookings/:id/cancel` - Cancel booking

## 💾 Database Schema

### Movies Collection
```javascript
{
  title: String,
  genre: [String],
  language: String,
  rating: Number,
  duration: String,
  releaseDate: Date,
  description: String,
  poster: String,
  backdrop: String,
  trailer: String,
  cast: [{ name, role, image }],
  crew: [{ name, role }],
  formats: ['2D', '3D', 'IMAX'],
  price: { 2D, 3D, IMAX },
  status: 'now-showing' | 'upcoming' | 'ended'
}
```

### Theatres Collection
```javascript
{
  name: String,
  address: String,
  city: String,
  rating: Number,
  facilities: [String],
  screens: [{
    name: String,
    type: '2D' | '3D' | 'IMAX',
    seats: [{ id, row, number, isOccupied }],
    showtimes: [String]
  }]
}
```

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  phone: String (unique),
  password: String (hashed),
  isEmailVerified: Boolean,
  isPhoneVerified: Boolean
}
```

### Bookings Collection
```javascript
{
  user: ObjectId,
  movie: ObjectId,
  theatre: ObjectId,
  screen: { name, type },
  seats: [String],
  showtime: String,
  showDate: Date,
  totalPrice: Number,
  bookingStatus: 'pending' | 'confirmed' | 'cancelled',
  paymentStatus: 'pending' | 'paid' | 'failed',
  bookingCode: String (unique)
}
```

## 🎨 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Three.js** - 3D graphics
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 🔒 Security

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ CORS configuration
- ✅ Input validation
- ✅ MongoDB injection prevention

## 📊 Sample Data

After seeding, you'll have:

### Movies (3)
1. **Cosmic Odyssey** - Sci-Fi/Adventure (9.2★)
2. **Neon Dreams** - Action/Thriller (8.8★)
3. **Quantum Paradox** - Sci-Fi/Mystery (9.5★) [Upcoming]

### Theatres (3 in New York)
1. **Cineplex Downtown** - 2 screens (IMAX, 3D)
2. **Star Cinema Mall** - 1 screen (2D)
3. **Mega Movies Plaza** - 2 screens (3D, IMAX)

Total: **5 screens, 820+ seats**

## 🧪 Testing

### Test Backend API
```bash
# Get all movies
curl http://localhost:5000/api/movies

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","phone":"1234567890","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"test@test.com","password":"test123"}'
```

### Test Frontend
1. Browse movies on homepage
2. Search for "Cosmic"
3. Click a movie → Select theatre
4. Choose date, theatre, and showtime
5. Select seats → Create booking
6. Register/Login to save booking

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: Start MongoDB
```bash
net start MongoDB  # Windows
```

### Port Already in Use
```
Error: EADDRINUSE
```
**Solution**: Change port in `.env` files or kill the process

### Frontend Not Loading Data
**Solution**:
1. Check backend is running on port 5000
2. Check `.env` file has correct API URL
3. Clear browser cache

### Seed Script Fails
**Solution**:
1. Ensure MongoDB is running
2. Check MONGODB_URI in `server/.env`
3. Try manually: `mongosh` to verify connection

## 🚀 Deployment

### Backend
1. Deploy to Heroku/Railway/Render
2. Set environment variables
3. Use MongoDB Atlas for database
4. Enable CORS for your frontend domain

### Frontend
1. Deploy to Vercel/Netlify
2. Set `VITE_API_URL` to your backend URL
3. Build: `npm run build`
4. Deploy `dist/` folder

## 📝 Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/movie-booking
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Next Features to Implement

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications for bookings
- [ ] SMS notifications
- [ ] QR code for tickets
- [ ] Admin dashboard
- [ ] Movie reviews and ratings
- [ ] Favorite movies
- [ ] Social sharing
- [ ] Real-time seat updates (WebSocket)
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

## 📚 Documentation Files

1. **START_HERE.md** - Quick start guide (5 steps)
2. **BACKEND_SETUP.md** - Detailed backend setup
3. **INSTALL_MONGODB.md** - MongoDB installation guide
4. **README_FULL_STACK.md** - Complete documentation (this file)

## 🤝 Support

Need help? Check:
1. MongoDB is running
2. Both servers are running
3. Environment variables are set correctly
4. Dependencies are installed
5. Database is seeded

## 📄 License

MIT License - Feel free to use for personal or commercial projects

## 🎉 Success Checklist

- [ ] MongoDB installed and running
- [ ] Backend dependencies installed
- [ ] Database seeded successfully
- [ ] Backend server running (port 5000)
- [ ] Frontend dependencies installed
- [ ] Frontend server running (port 5173)
- [ ] Can see movies on homepage
- [ ] Can register/login
- [ ] Can book tickets
- [ ] Data persists in database

---

**Made with ❤️ using React, Express, and MongoDB**

Happy Booking! 🎬🍿
