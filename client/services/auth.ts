// src/services/auth.ts

import apiClient from 'app/api';
import { Credentials, RegisterData, LoginResponse, RegisterResponse } from 'app/types/api';

const authService = {
  /**
   * Iniciar sesión
   * @param credentials Objeto con email, password y rememberMe
   * @returns Promesa con la respuesta del servidor
   */
  login(credentials: Credentials & { rememberMe: boolean }): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/login', credentials).then(response => response.data);
  },

  /**
   * Registrar un nuevo usuario
   * @param data Objeto con fullName, email y password
   * @returns Promesa con la respuesta del servidor
   */
  register(data: RegisterData): Promise<RegisterResponse> {
    return apiClient.post<RegisterResponse>('/login/new', data).then(response => response.data);
  },

  /**
   * Renovar token JWT
   * @returns Promesa con la nueva respuesta del servidor
   */
  renewToken(): Promise<LoginResponse> {
    return apiClient.get<LoginResponse>('/login/renew').then(response => response.data);
  },
};

export default authService;
