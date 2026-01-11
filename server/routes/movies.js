import express from 'express';
import Movie from '../models/Movie.js';

const router = express.Router();

// GET /api/movies - Get all movies with filtering, sorting, and search
router.get('/', async (req, res) => {
  try {
    const {
      status,
      genre,
      language,
      format,
      minRating,
      sortBy = 'releaseDate',
      order = 'desc',
      search,
      page = 1,
      limit = 20
    } = req.query;

    // Build query
    const query = {};

    if (status) query.status = status;
    if (genre) query.genre = { $in: genre.split(',') };
    if (language) query.language = { $in: language.split(',') };
    if (format) query.formats = { $in: format.split(',') };
    if (minRating) query.rating = { $gte: parseFloat(minRating) };
    if (search) query.$text = { $search: search };

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const movies = await Movie.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Movie.countDocuments(query);

    res.json({
      success: true,
      data: movies,
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
      message: 'Error fetching movies',
      error: error.message
    });
  }
});

// GET /api/movies/:id - Get single movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching movie',
      error: error.message
    });
  }
});

// GET /api/movies/featured/banner - Get featured movies for banner
router.get('/featured/banner', async (req, res) => {
  try {
    const movies = await Movie.find({ status: 'now-showing' })
      .sort({ rating: -1 })
      .limit(3);

    res.json({
      success: true,
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured movies',
      error: error.message
    });
  }
});

// POST /api/movies - Create new movie (Admin only - add auth middleware later)
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();

    res.status(201).json({
      success: true,
      data: movie,
      message: 'Movie created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating movie',
      error: error.message
    });
  }
});

// PUT /api/movies/:id - Update movie (Admin only - add auth middleware later)
router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    res.json({
      success: true,
      data: movie,
      message: 'Movie updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating movie',
      error: error.message
    });
  }
});

// DELETE /api/movies/:id - Delete movie (Admin only - add auth middleware later)
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    res.json({
      success: true,
      message: 'Movie deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting movie',
      error: error.message
    });
  }
});

export default router;
