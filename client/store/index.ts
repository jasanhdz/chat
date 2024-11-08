import { createStore } from 'vuex';
import auth, { AuthState } from './modules/auth';
import socket, { SocketState } from './modules/socket'
import chat, { ChatState } from './modules/chat';

export interface RootState {
  auth: AuthState;
  socket: SocketState;
  chat: ChatState;
}

const store = createStore<RootState>({
  modules: {
    auth,
    socket,
    chat,
  },
});

export default store;
