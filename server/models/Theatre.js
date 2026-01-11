import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  id: { type: String, required: true },
  row: { type: String, required: true },
  number: { type: Number, required: true },
  isOccupied: { type: Boolean, default: false }
});

const screenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['2D', '3D', 'IMAX', '4DX'],
    required: true
  },
  seats: [seatSchema],
  showtimes: [{
    type: String,
    required: true
  }]
});

const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  distance: {
    type: String
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  facilities: [{
    type: String,
    enum: ['Parking', 'Food Court', 'Wheelchair Access', 'Dolby Atmos', 'Recliner Seats', 'WiFi', '3D', 'IMAX', '4DX']
  }],
  screens: [screenSchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
theatreSchema.index({ city: 1, isActive: 1 });
theatreSchema.index({ name: 'text' });
theatreSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });

export default mongoose.model('Theatre', theatreSchema);
