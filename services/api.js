// services/api.js
import axios from "axios";

const API_URL = "http://192.168.33.58:5000";

export const register = (name, email, password) =>
  axios.post(`${API_URL}/api/auth/register`, { name, email, password });

export const login = (email, password) =>
  axios.post(`${API_URL}/api/auth/login`, { email, password });

export const getOutfits = (token) =>
  axios.get(`${API_URL}/api/outfit`, { headers: { "x-auth-token": token } });

export const createOutfit = (token, image, style) => {
  const formData = new FormData();
  formData.append("image", { uri: image.uri, name: "prenda.jpg", type: "image/jpeg" });
  formData.append("style", style);

  return axios.post(`${API_URL}/api/outfit`, formData, {
    headers: { "Content-Type": "multipart/form-data", "x-auth-token": token },
  });
};
