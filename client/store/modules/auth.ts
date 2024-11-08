// src/store/modules/auth.ts

import { Module } from 'vuex';
import authService from 'app/services/auth'; // Importa tus servicios de autenticación
import { RootState } from '../index';
import { Credentials } from 'app/types';

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
}

const authModule: Module<AuthState, RootState> = {
  namespaced: true,
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  mutations: {
    SET_AUTH(state, payload: { user: any; token: string }) {
      state.isAuthenticated = true;
      state.user = payload.user;
      state.token = payload.token;
    },
    CLEAR_AUTH(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  actions: {
    async login({ commit }, credentials: Credentials) {
      try {
        const response = await authService.login(credentials);
        const { user, token } = response;
        localStorage.setItem('token', token);
        commit('SET_AUTH', { user, token });
      } catch (error) {
        throw error;
      }
    },
    async renewToken({ commit }) {
      try {
        const response = await authService.renewToken();
        const { user, token } = response;
        localStorage.setItem('token', token);
        commit('SET_AUTH', { user, token });
      } catch (error) {
        commit('CLEAR_AUTH');
        throw error;
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('CLEAR_AUTH');
    },
  },
  getters: {
    isAuthenticated(state): boolean {
      return state.isAuthenticated;
    },
    getToken(state): string | null {
      return state.token;
    },
    getUser(state): any | null {
      return state.user;
    },
  },
};

export default authModule;
