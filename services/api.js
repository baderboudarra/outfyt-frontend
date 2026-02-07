// services/api.js
import axios from "axios";

export const API_URL = "https://outfyt-backend.onrender.com";

const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "x-auth-token": token,
});

export const register = (name, email, password) =>
  axios.post(`${API_URL}/api/auth/register`, { name, email, password });

export const login = (email, password) =>
  axios.post(`${API_URL}/api/auth/login`, { email, password });

export const getOutfits = (token) =>
  axios.get(`${API_URL}/api/outfits`, { headers: authHeaders(token) });

export const createOutfit = (token, image, description) => {
  const formData = new FormData();
  formData.append("image", {
    uri: image.uri,
    name: "outfit.jpg",
    type: "image/jpeg",
  });
  formData.append("description", description);

  return axios.post(`${API_URL}/api/outfits`, formData, {
    headers: {
      ...authHeaders(token),
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getOutfitHistory = (token) =>
  axios.get(`${API_URL}/api/outfit/history`, {
    headers: authHeaders(token),
  });
