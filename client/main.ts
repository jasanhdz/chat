// client/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/app-router';
import store from './store';
import './styles/global.css';
import 'app/api/interceptors'
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

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