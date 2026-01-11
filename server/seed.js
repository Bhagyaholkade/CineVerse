import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/Movie.js';
import Theatre from './models/Theatre.js';

dotenv.config();

const movies = [
  {
    title: "Cosmic Odyssey",
    genre: ["Sci-Fi", "Adventure"],
    language: "English",
    rating: 9.2,
    duration: "2h 45m",
    releaseDate: new Date("2024-03-15"),
    description: "An epic journey through space and time as humanity discovers ancient alien technology that could save or destroy civilization.",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "John Carter", role: "Captain Marcus", image: "👨‍🚀" },
      { name: "Sarah Chen", role: "Dr. Elena Park", image: "👩‍🔬" },
      { name: "David Johnson", role: "Commander Hayes", image: "👨‍✈️" },
      { name: "Emma Wilson", role: "Navigator Ross", image: "👩‍💼" }
    ],
    crew: [
      { name: "Christopher Nolan", role: "Director" },
      { name: "Hans Zimmer", role: "Music" }
    ],
    formats: ["2D", "3D", "IMAX"],
    price: { "2D": 12, "3D": 15, "IMAX": 20 },
    status: "now-showing"
  },
  {
    title: "Neon Dreams",
    genre: ["Action", "Thriller"],
    language: "English",
    rating: 8.8,
    duration: "2h 15m",
    releaseDate: new Date("2024-03-20"),
    description: "A cyberpunk adventure in a neon-lit city where a skilled hacker must take down a corrupt corporation.",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Alex Turner", role: "Neo", image: "🧑‍💻" },
      { name: "Lisa Anderson", role: "Trinity", image: "👩‍💻" },
      { name: "Mike Brown", role: "Morpheus", image: "🕴️" }
    ],
    crew: [
      { name: "Denis Villeneuve", role: "Director" },
      { name: "Ludwig Göransson", role: "Music" }
    ],
    formats: ["2D", "3D"],
    price: { "2D": 12, "3D": 15 },
    status: "now-showing"
  },
  {
    title: "Quantum Paradox",
    genre: ["Sci-Fi", "Mystery"],
    language: "English",
    rating: 9.5,
    duration: "2h 30m",
    releaseDate: new Date("2024-04-10"),
    description: "A brilliant physicist discovers a way to manipulate time, but each change creates unexpected consequences across multiple realities.",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Robert Hayes", role: "Dr. Marcus Cole", image: "👨‍🔬" },
      { name: "Emily Stone", role: "Sarah Mitchell", image: "👩‍🎓" }
    ],
    crew: [
      { name: "Greta Gerwig", role: "Director" }
    ],
    formats: ["2D", "IMAX"],
    price: { "2D": 12, "IMAX": 20 },
    status: "upcoming"
  }
];

const generateSeats = (rows, seatsPerRow) => {
  const seats = [];
  const rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let r = 0; r < rows; r++) {
    for (let s = 1; s <= seatsPerRow; s++) {
      seats.push({
        id: `${rowLabels[r]}${s}`,
        row: rowLabels[r],
        number: s,
        isOccupied: Math.random() > 0.8 // 20% occupied
      });
    }
  }

  return seats;
};

const theatres = [
  {
    name: "Cineplex Downtown",
    address: "123 Main St, Downtown",
    city: "New York",
    distance: "2.5 km",
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060
    },
    rating: 4.5,
    facilities: ["Parking", "Food Court", "Wheelchair Access"],
    screens: [
      {
        name: "Screen 1",
        type: "IMAX",
        seats: generateSeats(12, 20),
        showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"]
      },
      {
        name: "Screen 2",
        type: "3D",
        seats: generateSeats(10, 18),
        showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"]
      }
    ],
    isActive: true
  },
  {
    name: "Star Cinema Mall",
    address: "456 Park Ave, Central Mall",
    city: "New York",
    distance: "4.2 km",
    coordinates: {
      latitude: 40.7589,
      longitude: -73.9851
    },
    rating: 4.3,
    facilities: ["Parking", "Food Court", "Wheelchair Access", "Dolby Atmos"],
    screens: [
      {
        name: "Screen 1",
        type: "2D",
        seats: generateSeats(10, 16),
        showtimes: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"]
      }
    ],
    isActive: true
  },
  {
    name: "Mega Movies Plaza",
    address: "789 Cinema Blvd, West End",
    city: "New York",
    distance: "6.8 km",
    coordinates: {
      latitude: 40.7589,
      longitude: -73.9851
    },
    rating: 4.7,
    facilities: ["Parking", "Food Court", "Wheelchair Access", "Recliner Seats"],
    screens: [
      {
        name: "Screen 1",
        type: "3D",
        seats: generateSeats(8, 14),
        showtimes: ["12:00 PM", "3:30 PM", "7:00 PM", "10:30 PM"]
      },
      {
        name: "Screen 2",
        type: "IMAX",
        seats: generateSeats(12, 20),
        showtimes: ["11:30 AM", "3:00 PM", "6:30 PM", "10:00 PM"]
      }
    ],
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/movie-booking', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Movie.deleteMany({});
    await Theatre.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert movies
    const insertedMovies = await Movie.insertMany(movies);
    console.log(`✅ Inserted ${insertedMovies.length} movies`);

    // Insert theatres
    const insertedTheatres = await Theatre.insertMany(theatres);
    console.log(`✅ Inserted ${insertedTheatres.length} theatres`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
