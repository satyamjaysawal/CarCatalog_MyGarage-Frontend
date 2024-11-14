// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const register = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const createCar = (data, token) =>
  API.post('/cars', data, { headers: { Authorization: `Bearer ${token}` } });
export const getCars = (token) =>
  API.get('/cars', { headers: { Authorization: `Bearer ${token}` } });
export const getCarById = (id, token) =>
  API.get(`/cars/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const updateCar = (id, data, token) =>
  API.put(`/cars/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteCar = (id, token) =>
  API.delete(`/cars/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const searchCars = (keyword, token) =>
  API.get(`/cars/search?keyword=${encodeURIComponent(keyword)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
