<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Usuario</label>
          <input v-model="username" type="text" class="w-full px-3 py-2 border rounded" required />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-2">Contraseña</label>
          <input v-model="password" type="password" class="w-full px-3 py-2 border rounded" required />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Ingresar
        </button>
      </form>
      <p class="mt-4 text-center">
        ¿No tienes una cuenta?
        <router-link to="/register" class="text-blue-500 hover:underline">Regístrate aquí</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Credentials } from '@/types/api';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const store = useStore();
    const router = useRouter();

    const form = reactive<Credentials>({
      username: '',
      password: '',
    });

    const handleLogin = async () => {
      try {
        await store.dispatch('auth/login', form);
        router.push({ name: 'Chat' });
      } catch (error) {
        // Manejar errores de autenticación
        console.error(error);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>

