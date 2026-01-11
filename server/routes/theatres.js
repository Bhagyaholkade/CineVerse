import express from 'express';
import Theatre from '../models/Theatre.js';

const router = express.Router();

// GET /api/theatres - Get all theatres with filtering
router.get('/', async (req, res) => {
  try {
    const { city, movieId, page = 1, limit = 10 } = req.query;

    const query = { isActive: true };
    if (city) query.city = city;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const theatres = await Theatre.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ rating: -1 });

    const total = await Theatre.countDocuments(query);

    res.json({
      success: true,
      data: theatres,
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
      message: 'Error fetching theatres',
      error: error.message
    });
  }
});

// GET /api/theatres/:id - Get single theatre by ID
router.get('/:id', async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.id);

    if (!theatre) {
      return res.status(404).json({
        success: false,
        message: 'Theatre not found'
      });
    }

    res.json({
      success: true,
      data: theatre
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching theatre',
      error: error.message
    });
  }
});

// GET /api/theatres/city/:city - Get theatres by city
router.get('/city/:city', async (req, res) => {
  try {
    const theatres = await Theatre.find({
      city: req.params.city,
      isActive: true
    }).sort({ rating: -1 });

    res.json({
      success: true,
      data: theatres
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching theatres by city',
      error: error.message
    });
  }
});

// POST /api/theatres - Create new theatre (Admin only)
router.post('/', async (req, res) => {
  try {
    const theatre = new Theatre(req.body);
    await theatre.save();

    res.status(201).json({
      success: true,
      data: theatre,
      message: 'Theatre created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating theatre',
      error: error.message
    });
  }
});

// PUT /api/theatres/:id - Update theatre (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!theatre) {
      return res.status(404).json({
        success: false,
        message: 'Theatre not found'
      });
    }

    res.json({
      success: true,
      data: theatre,
      message: 'Theatre updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating theatre',
      error: error.message
    });
  }
});

// PATCH /api/theatres/:id/seats - Update seat availability
router.patch('/:id/seats', async (req, res) => {
  try {
    const { screenId, seatIds, isOccupied } = req.body;

    const theatre = await Theatre.findById(req.params.id);
    if (!theatre) {
      return res.status(404).json({
        success: false,
        message: 'Theatre not found'
      });
    }

    const screen = theatre.screens.id(screenId);
    if (!screen) {
      return res.status(404).json({
        success: false,
        message: 'Screen not found'
      });
    }

    // Update seat availability
    seatIds.forEach(seatId => {
      const seat = screen.seats.find(s => s.id === seatId);
      if (seat) {
        seat.isOccupied = isOccupied;
      }
    });

    await theatre.save();

    res.json({
      success: true,
      data: theatre,
      message: 'Seats updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating seats',
      error: error.message
    });
  }
});

export default router;
