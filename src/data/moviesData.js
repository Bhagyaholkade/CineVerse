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
      { id: 603, name: 'Mantri Square Mall', area: 'Malleshwaram', theatres: 2, distance: '4.8 km' },
      { id: 604, name: 'VR Bangalore', area: 'Whitefield', theatres: 5, distance: '3.5 km' },
      { id: 605, name: 'Lulu Mall', area: 'Rajajinagar', theatres: 4, distance: '6.2 km' },
      { id: 606, name: 'Park Square Mall', area: 'ITPL Main Road', theatres: 3, distance: '4.1 km' },
      { id: 607, name: 'Forum Mall', area: 'Koramangala', theatres: 4, distance: '5.8 km' },
      { id: 608, name: 'Garuda Mall', area: 'Magrath Road', theatres: 2, distance: '6.5 km' },
      { id: 609, name: 'UB City Mall', area: 'Vittal Mallya Road', theatres: 2, distance: '7.2 km' },
      { id: 610, name: 'GT World Mall', area: 'Magadi Road', theatres: 3, distance: '8.1 km' },
      { id: 611, name: 'Gopalan Arcade Mall', area: 'Bannerghatta Road', theatres: 2, distance: '9.3 km' },
      { id: 612, name: 'Nexus Shantiniketan', area: 'Whitefield', theatres: 4, distance: '3.8 km' },
      { id: 613, name: 'RMZ Galleria', area: 'Yelahanka', theatres: 3, distance: '10.2 km' }
    ]
  }
]

export const genres = [
  'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi',
  'Romance', 'Thriller', 'Animation', 'Adventure'
]

export const languages = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam', 'Spanish', 'French', 'Mandarin', 'Korean', 'Japanese']

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
  },
  {
    id: 7,
    title: "Pathaan",
    genre: ["Action", "Thriller"],
    language: "Hindi",
    rating: 8.9,
    duration: "2h 26m",
    releaseDate: "2024-03-28",
    description: "A spy who has been exiled returns for a dangerous mission to stop a massive attack on his homeland.",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Shah Rukh Khan", role: "Pathaan", image: "🕵️" },
      { name: "Deepika Padukone", role: "Rubina", image: "👩‍✈️" },
      { name: "John Abraham", role: "Jim", image: "🦹" }
    ],
    crew: [
      { name: "Siddharth Anand", role: "Director" },
      { name: "Vishal-Shekhar", role: "Music" }
    ],
    formats: ["2D", "3D", "IMAX"],
    price: { "2D": 10, "3D": 13, "IMAX": 18 },
    status: "now-showing"
  },
  {
    id: 8,
    title: "RRR: Rise Roar Revolt",
    genre: ["Action", "Drama", "Adventure"],
    language: "Telugu",
    rating: 9.3,
    duration: "3h 7m",
    releaseDate: "2024-03-15",
    description: "A fictional story about two legendary revolutionaries and their fight against the British Raj in the 1920s.",
    poster: "https://images.unsplash.com/photo-1574267432644-f610cab7aec1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1574267432644-f610cab7aec1?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "N. T. Rama Rao Jr.", role: "Komaram Bheem", image: "⚔️" },
      { name: "Ram Charan", role: "Alluri Sitarama Raju", image: "🏹" },
      { name: "Alia Bhatt", role: "Sita", image: "👸" }
    ],
    crew: [
      { name: "S. S. Rajamouli", role: "Director" },
      { name: "M. M. Keeravani", role: "Music" }
    ],
    formats: ["2D", "3D", "IMAX"],
    price: { "2D": 11, "3D": 14, "IMAX": 19 },
    status: "now-showing"
  },
  {
    id: 9,
    title: "Ponniyin Selvan: Part II",
    genre: ["Drama", "Adventure", "Historical"],
    language: "Tamil",
    rating: 8.7,
    duration: "2h 44m",
    releaseDate: "2024-04-05",
    description: "The epic tale of the Chola dynasty continues as conspiracies unfold and kingdoms clash.",
    poster: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Vikram", role: "Aditya Karikalan", image: "🤴" },
      { name: "Aishwarya Rai", role: "Nandini", image: "👑" },
      { name: "Jayam Ravi", role: "Ponniyin Selvan", image: "🗡️" }
    ],
    crew: [
      { name: "Mani Ratnam", role: "Director" },
      { name: "A. R. Rahman", role: "Music" }
    ],
    formats: ["2D", "3D"],
    price: { "2D": 10, "3D": 13 },
    status: "upcoming"
  },
  {
    id: 10,
    title: "KGF: Chapter 3",
    genre: ["Action", "Drama"],
    language: "Kannada",
    rating: 9.1,
    duration: "2h 55m",
    releaseDate: "2024-04-15",
    description: "Rocky's empire reaches new heights as he faces his most dangerous enemies yet.",
    poster: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Yash", role: "Rocky", image: "👊" },
      { name: "Srinidhi Shetty", role: "Reena", image: "💎" },
      { name: "Sanjay Dutt", role: "Adheera", image: "⚡" }
    ],
    crew: [
      { name: "Prashanth Neel", role: "Director" },
      { name: "Ravi Basrur", role: "Music" }
    ],
    formats: ["2D", "3D", "IMAX"],
    price: { "2D": 11, "3D": 14, "IMAX": 19 },
    status: "upcoming"
  },
  {
    id: 11,
    title: "Varathan",
    genre: ["Thriller", "Drama"],
    language: "Malayalam",
    rating: 8.4,
    duration: "2h 20m",
    releaseDate: "2024-03-30",
    description: "A software engineer and his wife move to the countryside, only to encounter dangerous locals.",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Fahadh Faasil", role: "Abin", image: "🧔" },
      { name: "Aishwarya Lekshmi", role: "Priya", image: "👩" }
    ],
    crew: [
      { name: "Amal Neerad", role: "Director" },
      { name: "Sushin Shyam", role: "Music" }
    ],
    formats: ["2D"],
    price: { "2D": 9 },
    status: "now-showing"
  },
  {
    id: 12,
    title: "Parasite: Reborn",
    genre: ["Thriller", "Drama"],
    language: "Korean",
    rating: 9.0,
    duration: "2h 18m",
    releaseDate: "2024-04-08",
    description: "A new chapter in class warfare as another family schemes their way into the lives of the wealthy.",
    poster: "https://images.unsplash.com/photo-1574267432644-f610cab7aec1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1574267432644-f610cab7aec1?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Song Kang-ho", role: "Mr. Kim", image: "👨‍👦" },
      { name: "Lee Sun-kyun", role: "Mr. Park", image: "💼" },
      { name: "Choi Woo-shik", role: "Ki-woo", image: "🎓" }
    ],
    crew: [
      { name: "Bong Joon-ho", role: "Director" },
      { name: "Jung Jae-il", role: "Music" }
    ],
    formats: ["2D"],
    price: { "2D": 12 },
    status: "upcoming"
  },
  {
    id: 13,
    title: "Spirited Away: The Return",
    genre: ["Animation", "Fantasy", "Adventure"],
    language: "Japanese",
    rating: 8.8,
    duration: "2h 5m",
    releaseDate: "2024-03-22",
    description: "Chihiro returns to the spirit world for a new magical adventure filled with wonder and danger.",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Rumi Hiiragi", role: "Chihiro (Voice)", image: "👧" },
      { name: "Miyu Irino", role: "Haku (Voice)", image: "🐉" }
    ],
    crew: [
      { name: "Hayao Miyazaki", role: "Director" },
      { name: "Joe Hisaishi", role: "Music" }
    ],
    formats: ["2D"],
    price: { "2D": 11 },
    status: "now-showing"
  },
  {
    id: 14,
    title: "Tres Metros Sobre El Cielo",
    genre: ["Romance", "Drama"],
    language: "Spanish",
    rating: 8.2,
    duration: "2h 0m",
    releaseDate: "2024-04-12",
    description: "An intense love story between two young people from different worlds in the streets of Barcelona.",
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Mario Casas", role: "Hugo", image: "🏍️" },
      { name: "María Valverde", role: "Babi", image: "💕" }
    ],
    crew: [
      { name: "Fernando González Molina", role: "Director" }
    ],
    formats: ["2D"],
    price: { "2D": 10 },
    status: "now-showing"
  },
  {
    id: 15,
    title: "Le Fabuleux Destin",
    genre: ["Romance", "Comedy"],
    language: "French",
    rating: 8.6,
    duration: "2h 2m",
    releaseDate: "2024-03-25",
    description: "A whimsical tale of love and destiny in the charming streets of Paris.",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Audrey Tautou", role: "Amélie", image: "🎨" },
      { name: "Mathieu Kassovitz", role: "Nino", image: "📸" }
    ],
    crew: [
      { name: "Jean-Pierre Jeunet", role: "Director" },
      { name: "Yann Tiersen", role: "Music" }
    ],
    formats: ["2D"],
    price: { "2D": 11 },
    status: "now-showing"
  },
  {
    id: 16,
    title: "Crouching Tiger: Hidden Dragon",
    genre: ["Action", "Drama", "Adventure"],
    language: "Mandarin",
    rating: 9.2,
    duration: "2h 0m",
    releaseDate: "2024-04-03",
    description: "Master warriors battle for honor, love, and the legendary Green Destiny sword.",
    poster: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Chow Yun-fat", role: "Li Mu Bai", image: "🗡️" },
      { name: "Michelle Yeoh", role: "Yu Shu Lien", image: "⚔️" },
      { name: "Zhang Ziyi", role: "Jen Yu", image: "🥋" }
    ],
    crew: [
      { name: "Ang Lee", role: "Director" },
      { name: "Tan Dun", role: "Music" }
    ],
    formats: ["2D", "IMAX"],
    price: { "2D": 12, "IMAX": 18 },
    status: "upcoming"
  },
  {
    id: 17,
    title: "Jawan",
    genre: ["Action", "Thriller"],
    language: "Hindi",
    rating: 8.6,
    duration: "2h 49m",
    releaseDate: "2024-03-20",
    description: "A high-octane action thriller about a man on a mission to rectify the wrongs in society.",
    poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Shah Rukh Khan", role: "Azad", image: "🦸" },
      { name: "Nayanthara", role: "Narmada", image: "👩‍⚕️" },
      { name: "Vijay Sethupathi", role: "Kaali", image: "🎭" }
    ],
    crew: [
      { name: "Atlee", role: "Director" },
      { name: "Anirudh Ravichander", role: "Music" }
    ],
    formats: ["2D", "3D", "IMAX"],
    price: { "2D": 10, "3D": 13, "IMAX": 18 },
    status: "now-showing"
  },
  {
    id: 18,
    title: "Dunki",
    genre: ["Drama", "Comedy"],
    language: "Hindi",
    rating: 8.3,
    duration: "2h 40m",
    releaseDate: "2024-04-10",
    description: "A heartwarming tale of friends who dream of going abroad and the journey they undertake.",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Shah Rukh Khan", role: "Hardy", image: "🧳" },
      { name: "Taapsee Pannu", role: "Manu", image: "👩" },
      { name: "Vicky Kaushal", role: "Sukhi", image: "🎒" }
    ],
    crew: [
      { name: "Rajkumar Hirani", role: "Director" },
      { name: "Pritam", role: "Music" }
    ],
    formats: ["2D"],
    price: { "2D": 10 },
    status: "upcoming"
  },
  {
    id: 19,
    title: "Salaar",
    genre: ["Action", "Drama"],
    language: "Telugu",
    rating: 8.9,
    duration: "2h 55m",
    releaseDate: "2024-03-25",
    description: "A violent gang leader's life takes an unexpected turn when his past comes back to haunt him.",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Prabhas", role: "Salaar", image: "⚔️" },
      { name: "Prithviraj Sukumaran", role: "Vardha", image: "🔥" },
      { name: "Shruti Haasan", role: "Aadhya", image: "💎" }
    ],
    crew: [
      { name: "Prashanth Neel", role: "Director" },
      { name: "Ravi Basrur", role: "Music" }
    ],
    formats: ["2D", "3D", "IMAX"],
    price: { "2D": 11, "3D": 14, "IMAX": 19 },
    status: "now-showing"
  },
  {
    id: 20,
    title: "Pushpa 2: The Rule",
    genre: ["Action", "Drama"],
    language: "Telugu",
    rating: 9.0,
    duration: "3h 5m",
    releaseDate: "2024-04-08",
    description: "Pushpa returns with a vengeance as he faces new enemies and challenges in the red sandalwood smuggling empire.",
    poster: "https://images.unsplash.com/photo-1574267432644-f610cab7aec1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1574267432644-f610cab7aec1?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Allu Arjun", role: "Pushpa Raj", image: "🌲" },
      { name: "Rashmika Mandanna", role: "Srivalli", image: "👰" },
      { name: "Fahadh Faasil", role: "Bhanwar Singh Shekhawat", image: "👮" }
    ],
    crew: [
      { name: "Sukumar", role: "Director" },
      { name: "Devi Sri Prasad", role: "Music" }
    ],
    formats: ["2D", "3D", "IMAX"],
    price: { "2D": 11, "3D": 14, "IMAX": 19 },
    status: "upcoming"
  },
  {
    id: 21,
    title: "Jailer",
    genre: ["Action", "Comedy", "Drama"],
    language: "Tamil",
    rating: 8.8,
    duration: "2h 48m",
    releaseDate: "2024-03-28",
    description: "A retired jailer comes out of retirement to track down a dangerous criminal who threatens his family.",
    poster: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Rajinikanth", role: "Muthuvel Pandian", image: "👮" },
      { name: "Vinayakan", role: "Varman", image: "😈" },
      { name: "Ramya Krishnan", role: "Muthu's Wife", image: "👩‍👦" }
    ],
    crew: [
      { name: "Nelson Dilipkumar", role: "Director" },
      { name: "Anirudh Ravichander", role: "Music" }
    ],
    formats: ["2D", "3D"],
    price: { "2D": 10, "3D": 13 },
    status: "now-showing"
  },
  {
    id: 22,
    title: "Leo",
    genre: ["Action", "Thriller"],
    language: "Tamil",
    rating: 8.5,
    duration: "2h 44m",
    releaseDate: "2024-04-12",
    description: "A mild-mannered cafe owner's past catches up with him when gangsters mistake him for someone else.",
    poster: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Vijay", role: "Parthiban/Leo", image: "🦁" },
      { name: "Trisha", role: "Sathya", image: "👩‍❤️‍👨" },
      { name: "Sanjay Dutt", role: "Antony", image: "💀" }
    ],
    crew: [
      { name: "Lokesh Kanagaraj", role: "Director" },
      { name: "Anirudh Ravichander", role: "Music" }
    ],
    formats: ["2D", "3D", "IMAX"],
    price: { "2D": 10, "3D": 13, "IMAX": 18 },
    status: "upcoming"
  },
  {
    id: 23,
    title: "Kantara: Chapter 2",
    genre: ["Action", "Drama", "Thriller"],
    language: "Kannada",
    rating: 9.2,
    duration: "2h 50m",
    releaseDate: "2024-03-30",
    description: "The prequel to Kantara explores the ancient folklore and mystical traditions of coastal Karnataka.",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Rishab Shetty", role: "Shiva", image: "🏹" },
      { name: "Sapthami Gowda", role: "Leela", image: "🌺" },
      { name: "Kishore", role: "Forest Officer", image: "🌲" }
    ],
    crew: [
      { name: "Rishab Shetty", role: "Director" },
      { name: "B. Ajaneesh Loknath", role: "Music" }
    ],
    formats: ["2D", "3D"],
    price: { "2D": 11, "3D": 14 },
    status: "now-showing"
  },
  {
    id: 24,
    title: "Roberrt",
    genre: ["Action", "Thriller"],
    language: "Kannada",
    rating: 8.1,
    duration: "2h 40m",
    releaseDate: "2024-04-05",
    description: "A corrupt cop transforms into a savior when his family is threatened by a ruthless criminal gang.",
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Darshan", role: "Roberrt", image: "💪" },
      { name: "Asha Bhat", role: "Aishwarya", image: "👸" },
      { name: "Jagapathi Babu", role: "Villain", image: "😡" }
    ],
    crew: [
      { name: "Tharun Sudhir", role: "Director" },
      { name: "Arjun Janya", role: "Music" }
    ],
    formats: ["2D", "3D"],
    price: { "2D": 10, "3D": 13 },
    status: "upcoming"
  },
  {
    id: 25,
    title: "Drishyam 3",
    genre: ["Thriller", "Drama", "Mystery"],
    language: "Malayalam",
    rating: 8.9,
    duration: "2h 35m",
    releaseDate: "2024-03-22",
    description: "Georgekutty faces new challenges as the past refuses to stay buried and new evidence surfaces.",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Mohanlal", role: "Georgekutty", image: "🎬" },
      { name: "Meena", role: "Rani", image: "👩‍👧" },
      { name: "Ansiba Hassan", role: "Anju", image: "👧" }
    ],
    crew: [
      { name: "Jeethu Joseph", role: "Director" },
      { name: "Anil Johnson", role: "Music" }
    ],
    formats: ["2D"],
    price: { "2D": 9 },
    status: "now-showing"
  },
  {
    id: 26,
    title: "Trance",
    genre: ["Drama", "Thriller"],
    language: "Malayalam",
    rating: 8.3,
    duration: "2h 22m",
    releaseDate: "2024-04-15",
    description: "A motivational speaker gets caught in a dangerous web of deceit and manipulation.",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Fahadh Faasil", role: "Viju Prasad", image: "🎤" },
      { name: "Nazriya Nazim", role: "Esther", image: "👩" },
      { name: "Gautham Vasudev Menon", role: "Isaac", image: "👨‍💼" }
    ],
    crew: [
      { name: "Anwar Rasheed", role: "Director" },
      { name: "Jackson Vijayan", role: "Music" }
    ],
    formats: ["2D"],
    price: { "2D": 9 },
    status: "upcoming"
  },
  {
    id: 27,
    title: "The Roundup: No Way Out",
    genre: ["Action", "Crime", "Thriller"],
    language: "Korean",
    rating: 8.7,
    duration: "2h 5m",
    releaseDate: "2024-03-26",
    description: "Detective Ma Seok-do faces off against a new villain in this action-packed crime thriller.",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Ma Dong-seok", role: "Ma Seok-do", image: "👊" },
      { name: "Lee Jun-hyuk", role: "Jang Isu", image: "🔪" }
    ],
    crew: [
      { name: "Lee Sang-yong", role: "Director" }
    ],
    formats: ["2D"],
    price: { "2D": 12 },
    status: "now-showing"
  },
  {
    id: 28,
    title: "Seoul Vibe",
    genre: ["Action", "Comedy"],
    language: "Korean",
    rating: 8.2,
    duration: "2h 20m",
    releaseDate: "2024-04-02",
    description: "A crew of drivers are recruited by the prosecution to take down a powerful money laundering ring.",
    poster: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Yoo Ah-in", role: "Dong-wook", image: "🏎️" },
      { name: "Go Kyung-pyo", role: "Woo-sam", image: "🚗" },
      { name: "Lee Kyu-hyung", role: "Joon-ki", image: "🚙" }
    ],
    crew: [
      { name: "Moon Hyun-sung", role: "Director" }
    ],
    formats: ["2D"],
    price: { "2D": 12 },
    status: "upcoming"
  },
  {
    id: 29,
    title: "Your Name: Another Side",
    genre: ["Animation", "Romance", "Fantasy"],
    language: "Japanese",
    rating: 9.1,
    duration: "1h 52m",
    releaseDate: "2024-03-18",
    description: "A new chapter in the beloved Your Name universe exploring alternate timelines and new connections.",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Ryunosuke Kamiki", role: "Taki (Voice)", image: "👨" },
      { name: "Mone Kamishiraishi", role: "Mitsuha (Voice)", image: "👩" }
    ],
    crew: [
      { name: "Makoto Shinkai", role: "Director" },
      { name: "RADWIMPS", role: "Music" }
    ],
    formats: ["2D"],
    price: { "2D": 11 },
    status: "now-showing"
  },
  {
    id: 30,
    title: "Demon Slayer: Infinity Castle",
    genre: ["Animation", "Action", "Fantasy"],
    language: "Japanese",
    rating: 9.0,
    duration: "2h 15m",
    releaseDate: "2024-04-10",
    description: "Tanjiro and the Demon Slayer Corps face their greatest challenge in the Infinity Castle.",
    poster: "https://images.unsplash.com/photo-1555993539-1732b0258fed?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1555993539-1732b0258fed?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Natsuki Hanae", role: "Tanjiro (Voice)", image: "⚔️" },
      { name: "Akari Kito", role: "Nezuko (Voice)", image: "🎀" },
      { name: "Hiro Shimono", role: "Zenitsu (Voice)", image: "⚡" }
    ],
    crew: [
      { name: "Haruo Sotozaki", role: "Director" },
      { name: "Yuki Kajiura", role: "Music" }
    ],
    formats: ["2D", "IMAX"],
    price: { "2D": 12, "IMAX": 18 },
    status: "upcoming"
  },
  {
    id: 31,
    title: "La Casa de Papel: El Final",
    genre: ["Action", "Thriller", "Drama"],
    language: "Spanish",
    rating: 8.6,
    duration: "2h 25m",
    releaseDate: "2024-03-24",
    description: "The Professor and his crew attempt their most audacious heist yet in this thrilling conclusion.",
    poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Álvaro Morte", role: "El Profesor", image: "🎭" },
      { name: "Úrsula Corberó", role: "Tokyo", image: "💣" },
      { name: "Itziar Ituño", role: "Lisboa", image: "👮‍♀️" }
    ],
    crew: [
      { name: "Álex Pina", role: "Director" },
      { name: "Manel Santisteban", role: "Music" }
    ],
    formats: ["2D"],
    price: { "2D": 11 },
    status: "now-showing"
  },
  {
    id: 32,
    title: "The Platform 2",
    genre: ["Thriller", "Sci-Fi", "Horror"],
    language: "Spanish",
    rating: 8.4,
    duration: "2h 0m",
    releaseDate: "2024-04-14",
    description: "A new group of prisoners must navigate the brutal vertical prison system with a twist.",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Milena Smit", role: "Perempuán", image: "😨" },
      { name: "Hovik Keuchkerian", role: "Zamiatin", image: "🔨" }
    ],
    crew: [
      { name: "Galder Gaztelu-Urrutia", role: "Director" }
    ],
    formats: ["2D"],
    price: { "2D": 10 },
    status: "upcoming"
  },
  {
    id: 33,
    title: "Intouchables: Reunion",
    genre: ["Comedy", "Drama"],
    language: "French",
    rating: 8.7,
    duration: "2h 10m",
    releaseDate: "2024-03-29",
    description: "Philippe and Driss reunite after years apart for a new adventure filled with humor and heart.",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "François Cluzet", role: "Philippe", image: "🎨" },
      { name: "Omar Sy", role: "Driss", image: "😄" }
    ],
    crew: [
      { name: "Olivier Nakache", role: "Director" },
      { name: "Ludovico Einaudi", role: "Music" }
    ],
    formats: ["2D"],
    price: { "2D": 11 },
    status: "now-showing"
  },
  {
    id: 34,
    title: "Les Misérables: Nouvelle Ère",
    genre: ["Drama", "Musical"],
    language: "French",
    rating: 8.5,
    duration: "2h 35m",
    releaseDate: "2024-04-06",
    description: "A modern retelling of Victor Hugo's classic set in contemporary Paris.",
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Vincent Cassel", role: "Jean Valjean", image: "⚖️" },
      { name: "Léa Seydoux", role: "Fantine", image: "💔" }
    ],
    crew: [
      { name: "Ladj Ly", role: "Director" }
    ],
    formats: ["2D"],
    price: { "2D": 12 },
    status: "upcoming"
  },
  {
    id: 35,
    title: "The Wandering Earth 3",
    genre: ["Sci-Fi", "Action", "Adventure"],
    language: "Mandarin",
    rating: 8.9,
    duration: "2h 50m",
    releaseDate: "2024-03-27",
    description: "Humanity faces a new cosmic threat as Earth continues its journey through space.",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Wu Jing", role: "Liu Peiqiang", image: "🚀" },
      { name: "Andy Lau", role: "Tu Hengyu", image: "🛸" }
    ],
    crew: [
      { name: "Frant Gwo", role: "Director" }
    ],
    formats: ["2D", "3D", "IMAX"],
    price: { "2D": 12, "3D": 15, "IMAX": 20 },
    status: "now-showing"
  },
  {
    id: 36,
    title: "Shadow Warriors",
    genre: ["Action", "Historical"],
    language: "Mandarin",
    rating: 8.6,
    duration: "2h 18m",
    releaseDate: "2024-04-11",
    description: "Elite warriors from different dynasties unite to protect ancient Chinese secrets.",
    poster: "https://images.unsplash.com/photo-1574267432644-f610cab7aec1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1574267432644-f610cab7aec1?w=1200&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=example",
    cast: [
      { name: "Donnie Yen", role: "Master Zhao", image: "🥋" },
      { name: "Zhang Ziyi", role: "Mei Lin", image: "🗡️" }
    ],
    crew: [
      { name: "Zhang Yimou", role: "Director" }
    ],
    formats: ["2D", "3D"],
    price: { "2D": 12, "3D": 15 },
    status: "upcoming"
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

// Comedy Shows Data
export const comedyShows = [
  {
    id: 1,
    title: "Kapil Sharma Live",
    artist: "Kapil Sharma",
    category: "Stand-Up Comedy",
    rating: 9.1,
    duration: "2h 30m",
    date: "2024-03-25",
    venue: "Phoenix Marketcity, Bangalore",
    price: { "Regular": 999, "Premium": 1999, "VIP": 3999 },
    poster: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=1200&h=600&fit=crop",
    description: "Get ready for a night of non-stop laughter with India's comedy king!",
    language: "Hindi",
    ageRating: "16+",
    tags: ["Comedy", "Stand-Up", "Hindi", "Family Entertainment"]
  },
  {
    id: 2,
    title: "Zakir Khan: Tathastu",
    artist: "Zakir Khan",
    category: "Stand-Up Comedy",
    rating: 8.9,
    duration: "2h 0m",
    date: "2024-03-28",
    venue: "Orion Mall, Bangalore",
    price: { "Regular": 799, "Premium": 1499, "VIP": 2999 },
    poster: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=1200&h=600&fit=crop",
    description: "Sakht Launda returns with hilarious stories from everyday life!",
    language: "Hindi",
    ageRating: "16+",
    tags: ["Comedy", "Stand-Up", "Hindi", "Relatable"]
  },
  {
    id: 3,
    title: "Trevor Noah: Off The Record",
    artist: "Trevor Noah",
    category: "Stand-Up Comedy",
    rating: 9.3,
    duration: "1h 45m",
    date: "2024-04-05",
    venue: "VR Bangalore",
    price: { "Regular": 1999, "Premium": 3999, "VIP": 6999 },
    poster: "https://images.unsplash.com/photo-1542309667-2a115d1f54c6?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1542309667-2a115d1f54c6?w=1200&h=600&fit=crop",
    description: "The Daily Show host brings his sharp wit to Bangalore!",
    language: "English",
    ageRating: "18+",
    tags: ["Comedy", "Stand-Up", "English", "International"]
  },
  {
    id: 4,
    title: "Biswa Kalyan Rath: Mood Kharab",
    artist: "Biswa Kalyan Rath",
    category: "Stand-Up Comedy",
    rating: 8.7,
    duration: "1h 30m",
    date: "2024-04-10",
    venue: "Forum Mall, Bangalore",
    price: { "Regular": 699, "Premium": 1299, "VIP": 2499 },
    poster: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&h=600&fit=crop",
    description: "Dark humor and witty observations in this hilarious show!",
    language: "Hindi/English",
    ageRating: "18+",
    tags: ["Comedy", "Stand-Up", "Dark Humor"]
  },
  {
    id: 5,
    title: "Kenny Sebastian: The Most Interesting Person",
    artist: "Kenny Sebastian",
    category: "Stand-Up Comedy",
    rating: 8.8,
    duration: "1h 50m",
    date: "2024-04-15",
    venue: "Lulu Mall, Bangalore",
    price: { "Regular": 799, "Premium": 1499, "VIP": 2799 },
    poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=600&fit=crop",
    description: "Musical comedy and hilarious stories from Kenny's life!",
    language: "English",
    ageRating: "13+",
    tags: ["Comedy", "Stand-Up", "Musical", "English"]
  }
]

// Music Concerts Data
export const concerts = [
  {
    id: 1,
    title: "AR Rahman Live in Concert",
    artist: "AR Rahman",
    category: "Music Concert",
    rating: 9.5,
    duration: "3h 0m",
    date: "2024-04-20",
    venue: "Phoenix Marketcity Arena, Bangalore",
    price: { "Silver": 2999, "Gold": 5999, "Platinum": 9999 },
    poster: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=600&fit=crop",
    description: "The maestro returns with a magical evening of music!",
    language: "Multi-lingual",
    ageRating: "All Ages",
    tags: ["Concert", "Music", "Live", "AR Rahman"]
  },
  {
    id: 2,
    title: "Arijit Singh: The Soulful Evening",
    artist: "Arijit Singh",
    category: "Music Concert",
    rating: 9.4,
    duration: "2h 45m",
    date: "2024-04-25",
    venue: "Orion Mall Arena, Bangalore",
    price: { "Silver": 2499, "Gold": 4999, "Platinum": 7999 },
    poster: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=600&fit=crop",
    description: "Experience the voice that touches millions of hearts!",
    language: "Hindi",
    ageRating: "All Ages",
    tags: ["Concert", "Music", "Bollywood", "Romantic"]
  },
  {
    id: 3,
    title: "Coldplay: Music of the Spheres Tour",
    artist: "Coldplay",
    category: "Music Concert",
    rating: 9.7,
    duration: "2h 30m",
    date: "2024-05-05",
    venue: "VR Bangalore Stadium",
    price: { "Silver": 4999, "Gold": 9999, "Platinum": 19999 },
    poster: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&h=600&fit=crop",
    description: "A spectacular show with breathtaking visuals and iconic hits!",
    language: "English",
    ageRating: "All Ages",
    tags: ["Concert", "Music", "International", "Rock"]
  },
  {
    id: 4,
    title: "Diljit Dosanjh: Born to Shine Tour",
    artist: "Diljit Dosanjh",
    category: "Music Concert",
    rating: 9.2,
    duration: "3h 0m",
    date: "2024-05-10",
    venue: "Mantri Square Mall, Bangalore",
    price: { "Silver": 1999, "Gold": 3999, "Platinum": 6999 },
    poster: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1200&h=600&fit=crop",
    description: "Punjabi music sensation brings the energy to Bangalore!",
    language: "Punjabi/Hindi",
    ageRating: "All Ages",
    tags: ["Concert", "Music", "Punjabi", "Bollywood"]
  }
]

// Live Events & Shows
export const liveEvents = [
  {
    id: 1,
    title: "IPL 2024: RCB vs MI",
    artist: "Royal Challengers Bangalore",
    category: "Sports",
    rating: 9.0,
    duration: "4h 0m",
    date: "2024-04-12",
    venue: "M. Chinnaswamy Stadium, Bangalore",
    price: { "General": 999, "Premium": 2999, "Corporate": 5999 },
    poster: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=600&fit=crop",
    description: "Witness the clash of titans in this high-voltage IPL match!",
    language: "All",
    ageRating: "All Ages",
    tags: ["Sports", "Cricket", "IPL", "Live"]
  },
  {
    id: 2,
    title: "TEDx Bangalore 2024",
    artist: "Various Speakers",
    category: "Conference",
    rating: 8.9,
    duration: "6h 0m",
    date: "2024-04-18",
    venue: "VR Bangalore Convention Center",
    price: { "Standard": 2999, "VIP": 5999 },
    poster: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=600&fit=crop",
    description: "Ideas worth spreading - inspiring talks from innovators!",
    language: "English",
    ageRating: "All Ages",
    tags: ["Conference", "TEDx", "Inspiration", "Innovation"]
  },
  {
    id: 3,
    title: "Bangalore Food Festival 2024",
    artist: "Multiple Vendors",
    category: "Food & Lifestyle",
    rating: 8.7,
    duration: "All Day",
    date: "2024-04-22",
    venue: "Phoenix Marketcity Grounds, Bangalore",
    price: { "Entry": 299, "VIP": 999 },
    poster: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=600&fit=crop",
    description: "A culinary journey featuring the best food from around the world!",
    language: "All",
    ageRating: "All Ages",
    tags: ["Food", "Festival", "Lifestyle", "Entertainment"]
  },
  {
    id: 4,
    title: "Comic Con Bangalore 2024",
    artist: "Various Artists & Exhibitors",
    category: "Entertainment",
    rating: 9.1,
    duration: "All Day",
    date: "2024-05-01",
    venue: "Bangalore International Exhibition Centre",
    price: { "Day Pass": 799, "Weekend Pass": 1299, "VIP": 2999 },
    poster: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=1200&h=600&fit=crop",
    description: "Celebrate pop culture, comics, gaming, and cosplay!",
    language: "All",
    ageRating: "All Ages",
    tags: ["Comic Con", "Gaming", "Cosplay", "Entertainment"]
  }
]

// Theatre & Plays
export const theatrePlays = [
  {
    id: 1,
    title: "The Lion King - Musical",
    artist: "Broadway India Productions",
    category: "Musical Theatre",
    rating: 9.4,
    duration: "2h 30m",
    date: "2024-04-08",
    venue: "Chowdiah Memorial Hall, Bangalore",
    price: { "Balcony": 1499, "Stall": 2499, "Royal": 3999 },
    poster: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&h=600&fit=crop",
    description: "Disney's award-winning musical comes to Bangalore!",
    language: "English",
    ageRating: "All Ages",
    tags: ["Theatre", "Musical", "Broadway", "Disney"]
  },
  {
    id: 2,
    title: "Hamlet - The Classic",
    artist: "Bangalore Theatre Company",
    category: "Drama",
    rating: 8.8,
    duration: "2h 45m",
    date: "2024-04-14",
    venue: "Ranga Shankara, Bangalore",
    price: { "General": 499, "Premium": 799 },
    poster: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=1200&h=600&fit=crop",
    description: "Shakespeare's masterpiece brought to life on stage!",
    language: "English",
    ageRating: "13+",
    tags: ["Theatre", "Drama", "Shakespeare", "Classic"]
  },
  {
    id: 3,
    title: "Naatak - A Kannada Play",
    artist: "Rangayana Theatre Group",
    category: "Regional Theatre",
    rating: 8.6,
    duration: "2h 0m",
    date: "2024-04-20",
    venue: "Ravindra Kalakshetra, Bangalore",
    price: { "General": 299, "Premium": 599 },
    poster: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=600&fit=crop",
    description: "A contemporary Kannada play exploring modern relationships!",
    language: "Kannada",
    ageRating: "16+",
    tags: ["Theatre", "Drama", "Kannada", "Contemporary"]
  }
]
