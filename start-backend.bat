@echo off
echo ========================================
echo   Movie Booking App - Backend Server
echo ========================================
echo.

cd server

echo Checking MongoDB connection...
node -e "require('mongoose').connect('mongodb://localhost:27017/movie-booking').then(() => { console.log('MongoDB Connected!'); process.exit(0); }).catch(err => { console.log('MongoDB NOT running. Please start MongoDB first.'); process.exit(1); })" 2>nul

if errorlevel 1 (
    echo.
    echo [ERROR] MongoDB is not running!
    echo.
    echo Please start MongoDB first:
    echo   - Option 1: Run "net start MongoDB" as Administrator
    echo   - Option 2: Install MongoDB from INSTALL_MONGODB.md
    echo   - Option 3: Use MongoDB Atlas cloud database
    echo.
    pause
    exit /b 1
)

echo.
echo Starting backend server on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

npm run dev
