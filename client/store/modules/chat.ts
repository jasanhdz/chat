import { Module } from 'vuex';
import Message from 'app/models/Message';
import User from 'app/models/User';

export interface ChatState {
  users: User[];
  currentUser: User | null;
  messages: Record<string, Message[]>; // key: userId
}

const initialState: ChatState = {
  users: [],
  currentUser: null,
  messages: {},
}

const chat: Module<ChatState, any> = {
  namespaced: true,
  state: initialState,
  mutations: {
    SET_CURRENT_USER(state, user: User | null) {
      state.currentUser = user;
    },
    SET_USERS(state, users: User[]) {
      state.users = users
    },
    ADD_USER(state, user: User) {
      if (!state.users.find(u => u.uid === user.uid)) {
        state.users.push(user);
      }
    },
    REMOVE_USER(state, uid: string) {
      state.users = state.users.filter(user => user.uid !== uid);
    },
    ADD_MESSAGE(state, payload: { userId: string, message: Message }) {
      if (!state.messages[payload.userId]) {
        state.messages[payload.userId] = [];
      }
      state.messages[payload.userId].push(payload.message);
    },
    UPDATE_USER_ONLINE(state, payload: { userId: string, online: boolean }) {
      const user = state.users.find(u => u.uid === payload.userId);
      if (user) {
        user.setOnline(payload.online);
      } else {
        console.warn(`Usuario con ID ${payload.userId} no encontrado en la lista.`);
      }
    },
    SET_MESSAGES(state, payload: { userId: string, messages: Message[] }) {
      state.messages[payload.userId] = payload.messages;
    },
  },
  actions: {
    selectUser({ commit, dispatch }, user: User) {
      commit('SET_CURRENT_USER', user);
      dispatch('socket/emitEvent', { event: 'getMessages', data: { userId: user.uid } }, { root: true });
    },
    sendMessage({ commit, state, dispatch }, content: string) {
      if (!state.currentUser) {
        console.warn('No hay un usuario seleccionado');
        return;
      }

      // Emitir el mensaje al backend a través de Socket.io
      dispatch('socket/emitEvent', { event: 'sendMessage', data: { to: state.currentUser.uid, content } }, { root: true });
    },
    receiveMessage({ commit, state }, payload: { from: string, message: Message }) {
      const currentUser = state.currentUser;
      if (!currentUser) return;
      commit('ADD_MESSAGE', { userId: currentUser.uid, message: payload.message });
    },
    updateUsers({ commit }, users: User[]) {
      commit('SET_USERS', users);
    },
    addUser({ commit }, user: any) { // Cambiar a User si es posible
      const userInstance = new User(
        user.uid,
        user.fullName,
        user.email,
        user.online,
        user.createdAt,
        user.updatedAt,
        user.avatar,
      );
      commit('ADD_USER', userInstance);
    },
    toggleUserConnected({ commit }, payload: { userId: string, online: boolean }) {
      commit('UPDATE_USER_ONLINE', payload)
    },
    removeUser({ commit }, uid: string) {
      commit('REMOVE_USER', uid);
    },
    setMessages({ commit }, payload: { userId: string, messages: Message[] }) { // Cambiar any[] a Message[]
      commit('SET_MESSAGES', { userId: payload.userId, messages: payload.messages });
    }
  },
  getters: {
    currentUser(state): User | null {
      return state.currentUser;
    },
    messages(state): Message[] {
      if (state.currentUser) {
        return state.messages[state.currentUser.uid] || [];
      }
      return [];
    },
    getUsers(state): User[] {
      return state.users;
    },
  }
}

export default chat;
