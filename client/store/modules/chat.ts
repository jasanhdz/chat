import Channel from 'app/models/Channel';
import { Module } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import Message from 'app/models/Message';

export interface ChatState {
  channels: Channel[];
  usersOnline: string[];
  currentChannelId: string | null;
}

const initialState: ChatState = {
  channels: [
    new Channel(
      uuidv4(),
      'Usuario 1',
      null,
      [
        new Message(uuidv4(), 'Usuario 1', 'Hola, ¿cómo estás?', new Date(), 'text'),
        new Message(uuidv4(), 'Usuario 2', '¡Hola! Estoy bien, gracias. ¿Y tú?', new Date(), 'text'),
      ],
      new Date(),
    ),
    new Channel(
      uuidv4(),
      'Usuario 2',
      null,
      [
        new Message(uuidv4(), 'Usuario 2', 'Este es un mensaje de prueba.', new Date(), 'text'),
      ],
      new Date()
    )
  ],
  usersOnline: ['Usuario 1', 'Usuario 2'],
  currentChannelId: null
}

const chat: Module<ChatState, any> = {
  namespaced: true,
  state: initialState,
  mutations: {
    SET_CURRENT_CHANNEL(state, channelId: string) {
      state.currentChannelId = channelId
    },
    ADD_MESSAGE(state, payload: { channelId: string, message: Message }) {
      const channel = state.channels.find((item) => item.id === payload.channelId)
      if (channel) {
        channel.addMessage(payload.message)
      }
    },
    SET_USERS_ONLINE(state, users: string[]) {
      state.usersOnline = users;
    },
    ADD_CHANNEL(state, channel: Channel) {
      state.channels.push(channel)
    }
  },
  actions: {
    selectChannel({ commit }, channelId: string) {
      commit('SET_CURRENT_CHANNEL', channelId)
    },
    sendMessage({ commit, state }, content: string) {
      if (!state.currentChannelId) {
        console.warn('No hay un canal seleccionado')
        return;
      }

      const message = new Message(
        uuidv4(),
        'Mi Usuario',
        content,
        new Date(),
        'text',
        true,
      )

      // Aquí iría la lógica para enviar el mensaje al backend a través de WebSockets

      // Por ahora, simplemente agregamos el mensaje al estado
      commit('ADD_MESSAGE', { channelId: state.currentChannelId, message });
    },
    receiveMessage({ commit }, payload: { channelId: string, message: Message }) {
      commit('ADD_MESSAGE', payload)
    },
    updateUsersOnline({ commit }, users: string[]) {
      commit('SET_USERS_ONLINE', users);
    },
    registerChannel({ commit }, userName: string) {
      const newChannel = new Channel(uuidv4(), userName, null, [], new Date())
      commit('ADD_CHANNEL', newChannel)
      commit('SET_CURRENT_CHANNEL', newChannel.id)
    }
  },
  getters: {
    currentChannel(state): Channel | null {
      if (!state.currentChannelId) return null;
      return state.channels.find((item) => item.id === state.currentChannelId) || null
    },
    getMessages(state, getters): Message[] {
      const channel = getters.currentChannel;
      return channel ? channel.messages : [];
    },
    getUsersOnline(state): string[] {
      return state.usersOnline;
    },
    getChannels(state): Channel[] {
      return state.channels
    }
  }
}

export default chat;
