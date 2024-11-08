import apiClient from 'app/api';
import { Credentials, RegisterData, LoginResponse, RegisterResponse } from 'app/types/api';

const authService = {
  login(credentials: Credentials): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/login', credentials).then((response) => response.data);
  },
  register(data: RegisterData): Promise<RegisterResponse> {
    return apiClient.post<RegisterResponse>('/login/new', data).then(response => response.data);
  },
  renewToken(): Promise<LoginResponse> {
    return apiClient.get<LoginResponse>('/login/renew').then(response => response.data);
  },
};

export default authService;
