// src/store/modules/socket.ts

import { Module } from 'vuex';
import { io, Socket } from 'socket.io-client';
import { RootState } from '../index'; // Asegúrate de tener esta definición

export interface SocketState {
  socket: Socket | null;
  online: boolean;
}

const initialState: SocketState = {
  socket: null,
  online: false,
}

const socketModule: Module<SocketState, RootState> = {
  namespaced: true,
  state: initialState,
  mutations: {
    SET_SOCKET(state, socket: Socket) {
      state.socket = socket;
    },
    SET_ONLINE_STATUS(state, status: boolean) {
      state.online = status;
    },
  },
  actions: {
    initializeSocket({ commit, state }, token: string) {
      if (state.socket) {
        state.socket.disconnect();
      }
  
      const socket = io('http://localhost:3001', {
        transports: ['websocket'],
        auth: {
          token, // Pasamos el token para la autenticación en el servidor
        },
      });
  
      commit('SET_SOCKET', socket);
  
      // Escuchar eventos de conexión y desconexión
      socket.on('connect', () => {
        console.log('Cliente conectado al socket');
        commit('SET_ONLINE_STATUS', true);
      });
  
      socket.on('disconnect', () => {
        console.log('Cliente desconectado del socket');
        commit('SET_ONLINE_STATUS', false);
      });
  
      // Manejar errores de conexión
      socket.on('connect_error', (err) => {
        console.error('Error de conexión de socket:', err.message);
      });
    },
    disconnectSocket({ state, commit }) {
      if (state.socket) {
        state.socket.disconnect();
        commit('SET_SOCKET', null);
        commit('SET_ONLINE_STATUS', false);
      }
    },
    emitEvent({ state }, payload: { event: string; data: any }) {
      if (state.socket) {
        state.socket.emit(payload.event, payload.data);
      }
    },
    listenEvent({ state }, payload: { event: string; callback: (data: any) => void }) {
      if (state.socket) {
        state.socket.on(payload.event, payload.callback);
      }
    },
    removeListener({ state }, payload: { event: string; callback: (data: any) => void }) {
      if (state.socket) {
        state.socket.off(payload.event, payload.callback);
      }
    },
  },
  getters: {
    isOnline(state): boolean {
      return state.online;
    },
    getSocket(state): Socket | null {
      return state.socket;
    },
  },
};

export default socketModule;
