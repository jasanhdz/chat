import Toast, { POSITION } from 'vue-toastification';
import { createApp } from 'vue';
import App from './App.vue';
import router from 'app/router/app-router';
import store from 'app/store';
import './styles/global.css';
import 'app/api/interceptors';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

const initializeAuth = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await store.dispatch('auth/renewToken');
    } catch (error) {
      console.error('Error al renovar el token:', error);
    }
  }
};

initializeAuth().then(() => {
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
