import axios, { AxiosResponse } from 'axios';
import { Credentials, UserData, LoginResponse, RegisterResponse } from 'app/types/api';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  login(credentials: Credentials): Promise<AxiosResponse<LoginResponse>> {
    return apiClient.post('/auth/login', credentials);
  },
  register(userData: UserData): Promise<AxiosResponse<RegisterResponse>> {
    return apiClient.post('/auth/register', userData);
  },
};
