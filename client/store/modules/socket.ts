// client/src/store/modules/socket.ts

import { Module } from 'vuex';
import { io, Socket } from 'socket.io-client';
import { RootState } from '../index';
import Message from 'app/models/Message';
import User from 'app/models/User';
import user from '@/schema/user';

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
    initializeSocket({ commit, dispatch, state }, token: string) {
      if (state.socket) { // Asegúrate de acceder correctamente al estado
        state.socket.disconnect();
      }

      const socket = io('http://localhost:3001', { // Cambia la URL según tu configuración
        transports: ['websocket'],
        auth: {
          token, // Token JWT para autenticación
        },
      });

      commit('SET_SOCKET', socket);

      // Escuchar eventos de conexión y desconexión
      socket.on('connect', () => {
        commit('SET_ONLINE_STATUS', true);
      });

      socket.on('disconnect', () => {
        commit('SET_ONLINE_STATUS', false);
      });

      // Manejar errores de conexión
      socket.on('connect_error', (err) => {
        console.error('Error de conexión de socket:', err.message);
      });

      // Escuchar el evento 'user-list' y actualizar la lista de usuarios en el módulo de chat
      socket.on('user-list', (userList: any[]) => { // Cambiar any[] a User[] si es posible
        const users = userList.map(user => new User(
          user.uid,
          user.fullName,
          user.email,
          user.online,
          user.createdAt,
          user.updatedAt,
          user.avatar,
        ));
        dispatch('chat/updateUsers', users, { root: true });
      });

      // Escuchar cuando un nuevo usuario se conecta
      socket.on('newUserConnected', (payload: { userId: string, online: boolean }) => { // Cambiar any a User si es posible
        dispatch('chat/toggleUserConnected', payload, { root: true });
      });

      // Escuchar cuando un usuario se desconecta
      socket.on('userDisconnected', (payload: { userId: string, online: boolean }) => {
        dispatch('chat/toggleUserConnected', payload, { root: true });
      });

      // Escuchar mensajes recibidos
      socket.on('receiveMessage', (payload: { fromMe: boolean, message: any }) => { // Cambiar any a Message si es posible
        const message = new Message(
          payload?.message?.uid,
          payload?.message?.to?.fullName,
          payload?.message?.content,
          new Date(payload?.message?.timestamp),
          payload?.message?.messageType,
          payload?.fromMe,
        )
        dispatch('chat/receiveMessage', {
          from: payload.message.from.uid,
          message: message,
        }, { root: true });
      });

      // Escuchar cuando se reciben mensajes específicos después de solicitar 'getMessages'
      socket.on('messages', (payload: { userId: string, messages: any[] }) => { // Cambiar any[] a Message[] si es posible
        const messages = payload.messages.map((item) => new Message(
          item.id,
          item.from,
          item.content,
          new Date(item.timestamp),
          item.messageType,
          item.to === payload.userId
        ))
        dispatch('chat/setMessages', {
          userId: payload.userId,
          messages: messages,
        }, { root: true });
      });
    },
    disconnectSocket({ state, commit }) {
      if (state.socket) {
        state.socket.disconnect();
        commit('SET_SOCKET', null);
        commit('SET_ONLINE_STATUS', false);
      }
    },
    /**
     * Emite un evento al servidor, opcionalmente con un callback para manejar la respuesta.
     * @param payload - Objeto que contiene el evento y los datos.
     * @param callback - Función opcional para manejar la respuesta del servidor.
     */
    emitEvent({ state }, payload: { event: string; data: any }, callback?: Function) {
      if (state.socket) {
        if (callback) {
          state.socket.emit(payload.event, payload.data, callback);
        } else {
          state.socket.emit(payload.event, payload.data);
        }
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
}

export default socketModule;
