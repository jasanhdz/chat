
import axios from 'axios';
import store from 'app/store';
import router from 'app/router/app-router';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default apiClient;
