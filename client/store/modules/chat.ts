import { Module } from 'vuex';

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

interface ChatState {
  messages: Message[];
  usersOnline: string[];
}

const chat: Module<ChatState, any> = {
  namespaced: true,
  state: {
    messages: [],
    usersOnline: [],
  },
  mutations: {
    ADD_MESSAGE(state, message: Message) {
      state.messages.push(message);
    },
    SET_USERS_ONLINE(state, users: string[]) {
      state.usersOnline = users;
    },
  },
  actions: {
    sendMessage({ commit }, messageContent) {
      // Lógica para enviar mensaje (a través de sockets)
      // commit('ADD_MESSAGE', newMessage);
    },
    receiveMessage({ commit }, message) {
      commit('ADD_MESSAGE', message);
    },
    updateUsersOnline({ commit }, users) {
      commit('SET_USERS_ONLINE', users);
    },
  },
  getters: {
    getMessages(state) {
      return state.messages;
    },
    getUsersOnline(state) {
      return state.usersOnline;
    },
  },
};

export default chat;
