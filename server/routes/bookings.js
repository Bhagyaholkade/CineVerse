import express from 'express';
import jwt from 'jsonwebtoken';
import Booking from '../models/Booking.js';
import Theatre from '../models/Theatre.js';

const router = express.Router();

// Middleware to verify JWT token
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// POST /api/bookings - Create new booking
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      movie,
      theatre,
      screen,
      seats,
      showtime,
      showDate,
      totalPrice,
      paymentMethod
    } = req.body;

    // Create booking
    const booking = new Booking({
      user: req.userId,
      movie,
      theatre,
      screen,
      seats,
      showtime,
      showDate,
      totalPrice,
      paymentMethod,
      bookingStatus: 'confirmed',
      paymentStatus: 'paid'
    });

    await booking.save();

    // Update seat availability in theatre
    const theatreDoc = await Theatre.findById(theatre);
    if (theatreDoc) {
      const screenDoc = theatreDoc.screens.find(s => s.name === screen.name);
      if (screenDoc) {
        seats.forEach(seatId => {
          const seat = screenDoc.seats.find(s => s.id === seatId);
          if (seat) {
            seat.isOccupied = true;
          }
        });
        await theatreDoc.save();
      }
    }

    // Populate booking data
    await booking.populate('movie theatre user');

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
});

// GET /api/bookings - Get user's bookings
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = { user: req.userId };
    if (status) query.bookingStatus = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const bookings = await Booking.find(query)
      .populate('movie theatre')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      data: bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
});

// GET /api/bookings/:id - Get booking by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.userId
    }).populate('movie theatre user');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
});

// GET /api/bookings/code/:bookingCode - Get booking by booking code
router.get('/code/:bookingCode', async (req, res) => {
  try {
    const booking = await Booking.findOne({
      bookingCode: req.params.bookingCode
    }).populate('movie theatre user');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
});

// PATCH /api/bookings/:id/cancel - Cancel booking
router.patch('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.bookingStatus === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking already cancelled'
      });
    }

    // Update booking status
    booking.bookingStatus = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    // Release seats
    const theatre = await Theatre.findById(booking.theatre);
    if (theatre) {
      const screen = theatre.screens.find(s => s.name === booking.screen.name);
      if (screen) {
        booking.seats.forEach(seatId => {
          const seat = screen.seats.find(s => s.id === seatId);
          if (seat) {
            seat.isOccupied = false;
          }
        });
        await theatre.save();
      }
    }

    res.json({
      success: true,
      data: booking,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message
    });
  }
});

export default router;
