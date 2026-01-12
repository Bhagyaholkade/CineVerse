export const cities = [
  {
    id: 1,
    name: 'New York',
    malls: [
      { id: 101, name: 'Manhattan Mall', area: 'Midtown', theatres: 3, distance: '2.5 km' },
      { id: 102, name: 'Westfield World Trade Center', area: 'Financial District', theatres: 2, distance: '4.2 km' },
      { id: 103, name: 'Queens Center', area: 'Queens', theatres: 4, distance: '8.5 km' }
    ]
  },
  {
    id: 2,
    name: 'Los Angeles',
    malls: [
      { id: 201, name: 'The Grove', area: 'Fairfax', theatres: 2, distance: '3.1 km' },
      { id: 202, name: 'Beverly Center', area: 'Beverly Hills', theatres: 3, distance: '5.4 km' },
      { id: 203, name: 'Westfield Century City', area: 'Century City', theatres: 4, distance: '6.8 km' }
    ]
  },
  {
    id: 3,
    name: 'Chicago',
    malls: [
      { id: 301, name: 'Water Tower Place', area: 'Magnificent Mile', theatres: 2, distance: '1.8 km' },
      { id: 302, name: 'Woodfield Mall', area: 'Schaumburg', theatres: 5, distance: '7.2 km' }
    ]
  },
  {
    id: 4,
    name: 'Miami',
    malls: [
      { id: 401, name: 'Aventura Mall', area: 'Aventura', theatres: 3, distance: '4.5 km' },
      { id: 402, name: 'Dolphin Mall', area: 'Sweetwater', theatres: 2, distance: '9.1 km' }
    ]
  },
  {
    id: 5,
    name: 'San Francisco',
    malls: [
      { id: 501, name: 'Westfield San Francisco Centre', area: 'Union Square', theatres: 3, distance: '2.2 km' },
      { id: 502, name: 'Stonestown Galleria', area: 'Stonestown', theatres: 2, distance: '6.5 km' }
    ]
  },
  {
    id: 6,
    name: 'Bangalore',
    malls: [
      { id: 601, name: 'Phoenix Marketcity', area: 'Whitefield', theatres: 4, distance: '3.2 km' },
      { id: 602, name: 'Orion Mall', area: 'Rajajinagar', theatres: 3, distance: '5.5 km' },
      { id: 603, name: 'Mantri Square', area: 'Malleshwaram', theatres: 2, distance: '4.8 km' },
      { id: 604, name: 'VR Bangalore', area: 'Whitefield', theatres: 5, distance: '3.5 km' },
      { id: 605, name: 'Lulu Mall', area: 'Rajajinagar', theatres: 4, distance: '6.2 km' }
    ]
  }
]

export const genres = [
  'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi',
  'Romance', 'Thriller', 'Animation', 'Adventure'
]

export const languages = ['English', 'Spanish', 'French', 'Hindi', 'Mandarin']

export const moviesData = [
  {
    id: 1,
    title: "Cosmic Odyssey",
    genre: ["Sci-Fi", "Adventure"],
    language: "English",
    rating: 9.2,
    duration: "2h 45m",
    releaseDate: "2024-03-15",
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
    id: 2,
    title: "Neon Dreams",
    genre: ["Action", "Thriller"],
    language: "English",
    rating: 8.8,
    duration: "2h 15m",
    releaseDate: "2024-03-20",
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
    id: 3,
    title: "Quantum Legacy",
    genre: ["Mystery", "Drama"],
    language: "English",
    rating: 9.0,
    duration: "2h 30m",
    releaseDate: "2024-04-01",
    description: "Unravel the mysteries of quantum reality as a physicist discovers parallel universes.",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Robert Kim", role: "Dr. Strange", image: "🧙‍♂️" },
      { name: "Anna Lee", role: "Christine", image: "👩‍⚕️" }
    ],
    crew: [
      { name: "Scott Derrickson", role: "Director" }
    ],
    formats: ["2D", "IMAX"],
    price: { "2D": 12, "IMAX": 20 },
    status: "upcoming"
  },
  {
    id: 4,
    title: "Starlight Serenade",
    genre: ["Romance", "Fantasy"],
    language: "English",
    rating: 8.5,
    duration: "2h 10m",
    releaseDate: "2024-03-25",
    description: "A magical love story under the stars where two souls from different worlds meet.",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Ryan Mitchell", role: "Jack", image: "👨‍🎤" },
      { name: "Emily Stone", role: "Rose", image: "👩‍🎨" }
    ],
    crew: [
      { name: "James Cameron", role: "Director" }
    ],
    formats: ["2D", "3D"],
    price: { "2D": 12, "3D": 15 },
    status: "now-showing"
  },
  {
    id: 5,
    title: "Eclipse Protocol",
    genre: ["Sci-Fi", "Horror"],
    language: "English",
    rating: 8.9,
    duration: "2h 20m",
    releaseDate: "2024-04-10",
    description: "When darkness falls, terror awakens in a research facility on Mars.",
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Tom Hardy", role: "Commander", image: "👨‍🚀" },
      { name: "Jessica Chastain", role: "Scientist", image: "👩‍🔬" }
    ],
    crew: [
      { name: "Ridley Scott", role: "Director" }
    ],
    formats: ["2D", "3D", "IMAX"],
    price: { "2D": 12, "3D": 15, "IMAX": 20 },
    status: "upcoming"
  },
  {
    id: 6,
    title: "Velocity Shift",
    genre: ["Action", "Racing"],
    language: "English",
    rating: 8.7,
    duration: "2h 5m",
    releaseDate: "2024-03-18",
    description: "Speed beyond imagination in the world's most dangerous street racing circuit.",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Vin Diesel", role: "Dom", image: "🏎️" },
      { name: "Michelle Rodriguez", role: "Letty", image: "🏍️" }
    ],
    crew: [
      { name: "Justin Lin", role: "Director" }
    ],
    formats: ["2D", "3D"],
    price: { "2D": 12, "3D": 15 },
    status: "now-showing"
  }
]

export const theatres = [
  {
    id: 1,
    name: "Cineplex Downtown",
    address: "123 Main St, Downtown",
    distance: "2.5 km",
    rating: 4.5,
    coordinates: { lat: 40.7580, lon: -73.9855 }, // Example: Times Square, NYC
    facilities: ["Parking", "Food Court", "Wheelchair Access"],
    screens: [
      {
        id: 101,
        name: "Screen 1",
        type: "IMAX",
        seats: generateSeats(12, 20),
        showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"]
      },
      {
        id: 102,
        name: "Screen 2",
        type: "3D",
        seats: generateSeats(10, 18),
        showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"]
      }
    ]
  },
  {
    id: 2,
    name: "Star Cinema Mall",
    address: "456 Park Ave, Central Mall",
    distance: "4.2 km",
    rating: 4.3,
    coordinates: { lat: 40.7614, lon: -73.9776 }, // Example: Central Park area
    facilities: ["Parking", "Food Court", "Wheelchair Access", "Dolby Atmos"],
    screens: [
      {
        id: 201,
        name: "Screen 1",
        type: "2D",
        seats: generateSeats(10, 16),
        showtimes: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"]
      }
    ]
  },
  {
    id: 3,
    name: "Mega Movies Plaza",
    address: "789 Cinema Blvd, West End",
    distance: "6.8 km",
    rating: 4.7,
    coordinates: { lat: 40.7489, lon: -73.9680 }, // Example: Midtown East
    facilities: ["Parking", "Food Court", "Wheelchair Access", "Recliner Seats"],
    screens: [
      {
        id: 301,
        name: "Screen 1",
        type: "3D",
        seats: generateSeats(8, 14),
        showtimes: ["12:00 PM", "3:30 PM", "7:00 PM", "10:30 PM"]
      },
      {
        id: 302,
        name: "Screen 2",
        type: "IMAX",
        seats: generateSeats(12, 20),
        showtimes: ["11:30 AM", "3:00 PM", "6:30 PM", "10:00 PM"]
      }
    ]
  }
]

function generateSeats(rows, seatsPerRow) {
  const rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const seats = []

  for (let i = 0; i < rows; i++) {
    for (let j = 1; j <= seatsPerRow; j++) {
      const seatId = `${rowLabels[i]}${j}`
      const isOccupied = Math.random() > 0.7 // 30% occupied randomly
      const type = i < 2 ? 'premium' : i < rows - 2 ? 'standard' : 'economy'

      seats.push({
        id: seatId,
        row: rowLabels[i],
        number: j,
        type: type,
        isOccupied: isOccupied,
        price: type === 'premium' ? 18 : type === 'standard' ? 12 : 10
      })
    }
  }

  return seats
}

export const bannerMovies = [
  {
    id: 1,
    title: "Cosmic Odyssey",
    tagline: "Journey Beyond The Stars",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=800&fit=crop"
  },
  {
    id: 2,
    title: "Neon Dreams",
    tagline: "Enter The Digital Realm",
    backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=800&fit=crop"
  },
  {
    id: 4,
    title: "Starlight Serenade",
    tagline: "A Love Written In The Stars",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=800&fit=crop"
  }
]
