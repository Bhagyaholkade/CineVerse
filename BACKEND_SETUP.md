# Backend Setup Guide

This guide will help you set up the backend server for the Movie Ticket Booking application.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
  - **Option 1**: Install MongoDB locally ([Download](https://www.mongodb.com/try/download/community))
  - **Option 2**: Use MongoDB Atlas (free cloud database) ([Sign up](https://www.mongodb.com/cloud/atlas/register))

## Installation Steps

### 1. Install MongoDB (Local Installation)

**Windows:**
```bash
# Download and install from: https://www.mongodb.com/try/download/community
# After installation, start MongoDB service:
net start MongoDB
```

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
# Follow instructions at: https://docs.mongodb.com/manual/administration/install-on-linux/
```

### 2. Set Up Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
copy .env.example .env     # Windows
cp .env.example .env       # Mac/Linux

# Edit .env file with your configuration
```

### 3. Configure Environment Variables

Edit the `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/movie-booking
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
Replace `MONGODB_URI` with your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/movie-booking?retryWrites=true&w=majority
```

### 4. Seed Database with Sample Data

```bash
npm run seed
```

This will populate your database with:
- 3 sample movies (Cosmic Odyssey, Neon Dreams, Quantum Paradox)
- 3 theatres with multiple screens
- Seat layouts for all screens

### 5. Start Backend Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Movies
- `GET /api/movies` - Get all movies (with filtering, search, pagination)
- `GET /api/movies/:id` - Get movie by ID
- `GET /api/movies/featured/banner` - Get featured movies for banner
- `POST /api/movies` - Create new movie (Admin)
- `PUT /api/movies/:id` - Update movie (Admin)
- `DELETE /api/movies/:id` - Delete movie (Admin)

### Theatres
- `GET /api/theatres` - Get all theatres
- `GET /api/theatres/:id` - Get theatre by ID
- `GET /api/theatres/city/:city` - Get theatres by city
- `POST /api/theatres` - Create theatre (Admin)
- `PUT /api/theatres/:id` - Update theatre (Admin)
- `PATCH /api/theatres/:id/seats` - Update seat availability

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/forgot-password` - Request password reset

### Bookings
- `POST /api/bookings` - Create booking (requires auth)
- `GET /api/bookings` - Get user bookings (requires auth)
- `GET /api/bookings/:id` - Get booking by ID (requires auth)
- `GET /api/bookings/code/:bookingCode` - Get booking by code
- `PATCH /api/bookings/:id/cancel` - Cancel booking (requires auth)

## Frontend Integration

### 1. Update Frontend Environment

Create `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Install Frontend Dependencies (if needed)

The API service layer is already created at `src/services/api.js`

### 3. Start Frontend

```bash
# In project root
npm run dev
```

## Testing the API

### Using cURL

**Get all movies:**
```bash
curl http://localhost:5000/api/movies
```

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "john@example.com",
    "password": "password123"
  }'
```

### Using Postman or Thunder Client

Import the API endpoints from the list above and test each endpoint.

## Database Management

### View Data in MongoDB

**Using MongoDB Compass (GUI):**
1. Download from: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Browse the `movie-booking` database

**Using MongoDB Shell:**
```bash
# Connect to MongoDB
mongosh

# Switch to database
use movie-booking

# View movies
db.movies.find().pretty()

# View theatres
db.theatres.find().pretty()

# View users
db.users.find().pretty()
```

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in .env or kill the process using port 5000

### Seed Script Fails
**Solution:** Make sure MongoDB is running and MONGODB_URI in .env is correct

## Next Steps

1. Start both backend and frontend servers
2. Test the full booking flow
3. Check that data is being fetched from the API
4. Verify authentication works
5. Test booking creation and retrieval

## Production Deployment

For production, consider:
- Using MongoDB Atlas instead of local MongoDB
- Setting strong JWT_SECRET
- Enabling CORS only for your frontend domain
- Adding rate limiting
- Implementing proper error logging
- Using environment-specific configurations
- Setting up HTTPS
- Adding payment gateway integration

## Support

For issues or questions:
1. Check MongoDB is running
2. Verify .env configuration
3. Check server logs for errors
4. Ensure all dependencies are installed
