// src/store/modules/socket.ts

import { Module } from 'vuex';
import { io, Socket } from 'socket.io-client';
import { RootState } from '../index'; // Asegúrate de tener esta definición

interface SocketState {
  socket: Socket | null;
  online: boolean;
}

const socketModule: Module<SocketState, RootState> = {
  namespaced: true,
  state: () => ({
    socket: null,
    online: false,
  }),
  mutations: {
    SET_SOCKET(state, socket: Socket) {
      state.socket = socket;
    },
    SET_ONLINE_STATUS(state, status: boolean) {
      state.online = status;
    },
  },
  actions: {
    /**
     * Inicializa la conexión de Socket.io
     * @param commit - Método para mutar el estado
     * @param serverPath - URL del servidor de Socket.io
     */
    initializeSocket({ commit, state }, serverPath: string) {
      if (state.socket) {
        state.socket.disconnect();
      }

      const socket = io(serverPath, { transports: ['websocket'] });

      commit('SET_SOCKET', socket);

      // Escuchar eventos de conexión y desconexión
      socket.on('connect', () => {
        console.log('Cliente conectado');
        commit('SET_ONLINE_STATUS', true);
      });

      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
        commit('SET_ONLINE_STATUS', false);
      });

      // Puedes agregar más listeners aquí según tus necesidades
    },
    /**
     * Emite un evento al servidor de Socket.io
     * @param state - Estado del módulo
     * @param payload - Objeto que contiene el nombre del evento y los datos
     */
    emitEvent({ state }, payload: { event: string; data: any }) {
      if (state.socket) {
        state.socket.emit(payload.event, payload.data);
      }
    },
    /**
     * Escucha un evento desde el servidor de Socket.io
     * @param state - Estado del módulo
     * @param payload - Objeto que contiene el nombre del evento y la función callback
     */
    listenEvent({ state }, payload: { event: string; callback: (data: any) => void }) {
      if (state.socket) {
        state.socket.on(payload.event, payload.callback);
      }
    },
    /**
     * Remueve un listener de un evento específico
     * @param state - Estado del módulo
     * @param payload - Objeto que contiene el nombre del evento y la función callback
     */
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
