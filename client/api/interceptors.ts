import { AxiosError, AxiosResponse } from 'axios';
import store from 'app/store';
import router from 'app/router/app-router';
import apiClient from '.';

apiClient.interceptors.request.use(
  (config) => {
    const token = store.state.auth.token || localStorage.getItem('token');
    if (token) {
      config.headers['x-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        store.dispatch('auth/logout');
        router.push({ name: 'Login' });
      }
    }
    return Promise.reject(error);
  }
);
