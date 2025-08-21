export const API_BASE = (process.env.REACT_APP_API_BASE_URL || "http://localhost:3001").replace(/\/+$/, "");
export const API_URL = `${API_BASE}/api/ads`;

export const MAX_FILES = 5;
export const MAX_SIZE_MB = 5;

export const initialForm = {
  houseName: "",
  location: "",
  price: "",
  contact: "",
  bedrooms: "",
  bathrooms: "",
  rooms: "",
  persons: "",
  distance: "",
  notes: "",
};

export const numberOptions = Array.from({ length: 11 }, (_, i) => i);
export const distanceOptions = ["< 500 m", "500 m - 1 km", "1 - 2 km", "2 - 5 km", "> 5 km"];