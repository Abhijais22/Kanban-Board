import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Attach token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (data) => API.post('/users/login', data);
export const signup = (data) => API.post('/users/signup', data);
export const getTasks = () => API.get('/tasks');
export const createTask = (data) => API.post('/tasks', data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const getTaskById = (id) => API.get(`/tasks/${id}`);
