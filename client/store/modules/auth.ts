// src/store/module/auth.ts

import { Module } from 'vuex';
import { AuthState, User } from 'app/types/auth';
import { Credentials, LoginResponse, RegisterResponse } from 'app/types/api';
import api from 'app/services/auth';

const auth: Module<AuthState, any> = {
  namespaced: true,
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  mutations: {
    SET_AUTH(state, payload: { user: User; token: string }) {
      state.isAuthenticated = true;
      state.user = payload.user;
      state.token = payload.token;
    },
    LOGOUT(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  actions: {
    async login({ commit }, credentials: Credentials & { rememberMe: boolean }) {
      try {
        const response: LoginResponse = (await api.login(credentials));
        const userData = response.user;
        const token = response.token;

        // Si "Recordar Usuario" está activado, guardar el token en localStorage
        if (credentials.rememberMe) {
          localStorage.setItem('token', token);
        }

        commit('SET_AUTH', { user: userData, token });
      } catch (error) {
        // Re-lanzar el error para manejarlo en el componente
        throw error;
      }
    },
    async register({ commit }, userData: any) {
      try {
        const response: RegisterResponse = (await api.register(userData));
        const newUser = response.user;
        const token = response.token;

        // Opcional: Guardar el token en localStorage si es necesario
        localStorage.setItem('token', token);

        commit('SET_AUTH', { user: newUser, token });
      } catch (error) {
        throw error;
      }
    },
    logout({ commit }) {
      // Eliminar el token de localStorage al cerrar sesión
      localStorage.removeItem('token');
      commit('LOGOUT');
    },
    async renewToken({ commit, state }) {
      try {
        if (!state.token) throw new Error('No token found');

        const response: LoginResponse = (await api.renewToken());
        const userData = response.user;
        const newToken = response.token;

        if (state.token) {
          localStorage.setItem('token', newToken);
        }

        commit('SET_AUTH', { user: userData, token: newToken });
      } catch (error) {
        commit('LOGOUT');
        throw error;
      }
    },
  },
  getters: {
    isAuthenticated(state): boolean {
      return state.isAuthenticated;
    },
    currentUser(state): User | null {
      return state.user;
    },
    getToken(state): string | null {
      return state.token;
    },
  },
};

export default auth;
