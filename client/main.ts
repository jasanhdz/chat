// client/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/app-router';
import store from './store';
import './styles/global.css';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
