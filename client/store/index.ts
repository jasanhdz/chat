import { createStore } from 'vuex';
import auth from './modules/auth';
import socket from './modules/socket'
import chat from './modules/chat';

export interface RootState {
  auth: any;
  socket: any;
  chat: any;
}

const store = createStore<RootState>({
  modules: {
    auth,
    socket,
    chat,
  },
});

export default store;
