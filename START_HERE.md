# 🎬 Quick Start Guide - Movie Booking App

## 🚀 Complete Setup in 5 Steps

### Step 1: Install MongoDB

**Choose ONE option:**

#### Option A: MongoDB Local (Recommended for Development)
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will start automatically as a service

#### Option B: MongoDB Atlas (Free Cloud Database)
1. Sign up at: https://www.mongodb.com/cloud/atlas/register
2. Create a free cluster
3. Get your connection string
4. Update `server/.env` with your connection string

### Step 2: Install All Dependencies

Open terminal in project root:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 3: Seed Database with Sample Data

```bash
cd server
npm run seed
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Inserted 3 movies
✅ Inserted 3 theatres
🎉 Database seeded successfully!
```

### Step 4: Start Backend Server

**Keep this terminal open!**

```bash
# In server directory
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📍 Environment: development
🔗 API URL: http://localhost:5000/api
✅ Connected to MongoDB
```

### Step 5: Start Frontend (New Terminal)

**Open a NEW terminal window**, navigate to project root:

```bash
npm run dev
```

You should see:
```
VITE v5.0.0  ready in 667 ms
➜  Local:   http://localhost:5173/
```

## ✅ Verify Everything Works

1. Open browser: http://localhost:5173
2. You should see movies loaded from the database
3. Try searching for movies
4. Try clicking on a movie to book tickets
5. Try registering a new account

## 🎯 What's Working Now

### ✅ Backend (Port 5000)
- **Movies API**: Browse, search, filter movies
- **Theatres API**: Get theatres by city, view screens and showtimes
- **Auth API**: Register, login, JWT authentication
- **Bookings API**: Create bookings, view booking history

### ✅ Database (MongoDB)
- 3 Sample Movies:
  - Cosmic Odyssey (Sci-Fi)
  - Neon Dreams (Action/Thriller)
  - Quantum Paradox (Upcoming)

- 3 Theatres (New York):
  - Cineplex Downtown (2 screens)
  - Star Cinema Mall (1 screen)
  - Mega Movies Plaza (2 screens)

### ✅ Frontend Integration
- API service layer connected
- Real data fetching ready
- Authentication flow ready

## 🔧 Common Issues

### "Cannot connect to MongoDB"
**Solution**: Make sure MongoDB is running
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Check if MongoDB is running
mongosh
```

### "Port 5000 already in use"
**Solution**: Change port in `server/.env`:
```env
PORT=5001
```
Then update `VITE_API_URL` in root `.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

### "Vite port already in use"
Just use the new port Vite suggests, or close other apps using that port

## 📊 Test the API Directly

### Get Movies
```bash
curl http://localhost:5000/api/movies
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","phone":"1234567890","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"test@test.com","password":"test123"}'
```

## 📁 Project Structure

```
project1/
├── server/                 # Backend (Node.js/Express)
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   ├── seed.js            # Database seeding
│   └── .env               # Backend config
│
├── src/                   # Frontend (React)
│   ├── components/        # React components
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   │   └── api.js         # API functions
│   └── data/              # Static data (will be replaced)
│
├── .env                   # Frontend config
└── START_HERE.md          # This file
```

## 🎨 Features Already Implemented

### Frontend
✅ Hero banner with movie slider
✅ Movie listing with filters
✅ Theatre selection by city
✅ Seat selection interface
✅ Booking confirmation
✅ Authentication pages (Login/Signup)
✅ Movie search
✅ Responsive design
✅ 3D background animations

### Backend
✅ RESTful API
✅ MongoDB database
✅ User authentication (JWT)
✅ Movie management
✅ Theatre management
✅ Booking system
✅ Seat availability tracking

## 🔜 Next Steps

1. **Update Components**: Replace static data with API calls
2. **Add Loading States**: Show spinners while fetching data
3. **Error Handling**: Display user-friendly error messages
4. **Payment Integration**: Add payment gateway (Stripe/PayPal)
5. **Image Upload**: Add ability to upload movie posters
6. **Admin Panel**: Create admin dashboard
7. **Email Notifications**: Send booking confirmations
8. **Real-time Updates**: WebSocket for seat availability

## 📚 Documentation

- Backend API: See `BACKEND_SETUP.md`
- API Endpoints: Check `server/routes/` folder
- Database Models: Check `server/models/` folder
- Frontend Services: Check `src/services/api.js`

## 🆘 Need Help?

1. Check terminal for error messages
2. Verify MongoDB is running
3. Check both servers are running (frontend + backend)
4. Clear browser cache and try again
5. Review `BACKEND_SETUP.md` for detailed instructions

## 🎉 Success!

If you see movies loading on the homepage, congratulations! 🎊
Your full-stack movie booking application is now running with:
- React frontend
- Express backend
- MongoDB database
- Real API integration

Happy coding! 🚀
