import { Module } from 'vuex';
import { AuthState, User } from 'app/types/auth';
import { Credentials, UserData } from 'app/types/api';
import api from 'app/services/api';

const auth: Module<AuthState, any> = {
  namespaced: true,
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null,
  }),
  mutations: {
    SET_AUTH(state, payload: User) {
      state.isAuthenticated = true;
      state.user = payload;
    },
    LOGOUT(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, credentials: Credentials) {
      try {
        const response = await api.login(credentials);
        const userData = response.data.user;
        commit('SET_AUTH', userData);
      } catch (error) {
        throw error;
      }
    },
    async register({ commit }, userData: UserData) {
      try {
        const response = await api.register(userData);
        // Opción A: Si el backend devuelve 'user' en la respuesta
        const newUser = response.data.user;
        commit('SET_AUTH', newUser);
        // O bien, podrías almacenar un token o realizar otras acciones
      } catch (error) {
        throw error;
      }
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
  },
  getters: {
    isAuthenticated(state): boolean {
      return state.isAuthenticated;
    },
    currentUser(state): User | null {
      return state.user;
    },
  },
};

export default auth;
