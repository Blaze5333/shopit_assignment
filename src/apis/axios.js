import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default axiosInstance;
