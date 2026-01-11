import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theatre',
    required: true
  },
  screen: {
    name: { type: String, required: true },
    type: { type: String, required: true }
  },
  seats: [{
    type: String,
    required: true
  }],
  showtime: {
    type: String,
    required: true
  },
  showDate: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'wallet'],
    default: null
  },
  bookingCode: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true
});

// Generate unique booking code before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingCode) {
    this.bookingCode = 'BK' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

// Indexes
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ bookingCode: 1 });
bookingSchema.index({ showDate: 1, showtime: 1 });

export default mongoose.model('Booking', bookingSchema);
