import Toast, { POSITION } from 'vue-toastification';
import { createApp } from 'vue';
import App from './App.vue';
import router from 'app/router/app-router';
import store from 'app/store';
import './styles/global.css';
import 'app/api/interceptors';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

store.subscribe((mutation, state) => {
  if (mutation.type === 'auth/SET_AUTH') {
    if (state.auth.token) {
      store.dispatch('socket/initializeSocket', state.auth.token);
    }
  }

  if (mutation.type === 'auth/CLEAR_AUTH') {
    store.dispatch('socket/disconnectSocket');
  }
});

const initializeApp = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await store.dispatch('auth/renewToken');
    } catch (error) {
      console.error('Error al renovar el token:', error);
      store.dispatch('auth/logout');
    }
  }
};

initializeApp().then(() => {
  app.use(store);
  app.use(router);
  app.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
  });
  app.mount('#app');
});
