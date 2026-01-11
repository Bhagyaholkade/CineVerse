import mongoose from 'mongoose';

const castSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String }
});

const crewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }
});

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  genre: [{
    type: String,
    required: true
  }],
  language: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  duration: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  backdrop: {
    type: String
  },
  trailer: {
    type: String
  },
  cast: [castSchema],
  crew: [crewSchema],
  formats: [{
    type: String,
    enum: ['2D', '3D', 'IMAX', '4DX'],
    required: true
  }],
  price: {
    '2D': { type: Number },
    '3D': { type: Number },
    'IMAX': { type: Number },
    '4DX': { type: Number }
  },
  status: {
    type: String,
    enum: ['now-showing', 'upcoming', 'ended'],
    default: 'upcoming'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
movieSchema.index({ title: 'text', description: 'text' });
movieSchema.index({ status: 1, releaseDate: -1 });
movieSchema.index({ genre: 1 });
movieSchema.index({ language: 1 });

export default mongoose.model('Movie', movieSchema);
