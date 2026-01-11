const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Movies API
export const moviesAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/movies?${queryParams}`);
  },

  getById: async (id) => {
    return apiRequest(`/movies/${id}`);
  },

  getFeaturedBanner: async () => {
    return apiRequest('/movies/featured/banner');
  },

  search: async (query) => {
    return apiRequest(`/movies?search=${encodeURIComponent(query)}`);
  },
};

// Theatres API
export const theatresAPI = {
  getAll: async (city) => {
    const query = city ? `?city=${encodeURIComponent(city)}` : '';
    return apiRequest(`/theatres${query}`);
  },

  getById: async (id) => {
    return apiRequest(`/theatres/${id}`);
  },

  getByCity: async (city) => {
    return apiRequest(`/theatres/city/${encodeURIComponent(city)}`);
  },

  updateSeats: async (theatreId, screenId, seatIds, isOccupied) => {
    return apiRequest(`/theatres/${theatreId}/seats`, {
      method: 'PATCH',
      body: JSON.stringify({ screenId, seatIds, isOccupied }),
    });
  },
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  },

  login: async (identifier, password) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    });

    if (response.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    return apiRequest('/auth/me');
  },

  forgotPassword: async (identifier) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ identifier }),
    });
  },

  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!getAuthToken();
  },
};

// Bookings API
export const bookingsAPI = {
  create: async (bookingData) => {
    return apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/bookings?${queryParams}`);
  },

  getById: async (id) => {
    return apiRequest(`/bookings/${id}`);
  },

  getByBookingCode: async (bookingCode) => {
    return apiRequest(`/bookings/code/${bookingCode}`);
  },

  cancel: async (id) => {
    return apiRequest(`/bookings/${id}/cancel`, {
      method: 'PATCH',
    });
  },
};

export default {
  movies: moviesAPI,
  theatres: theatresAPI,
  auth: authAPI,
  bookings: bookingsAPI,
};
