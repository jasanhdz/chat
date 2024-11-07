<!-- client/views/RegisterView.vue -->
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Registro</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Usuario</label>
          <input v-model="username" type="text" class="w-full px-3 py-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Correo Electrónico</label>
          <input v-model="email" type="email" class="w-full px-3 py-2 border rounded" required />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-2">Contraseña</label>
          <input v-model="password" type="password" class="w-full px-3 py-2 border rounded" required />
        </div>
        <button type="submit" class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Registrarse
        </button>
      </form>
      <p class="mt-4 text-center">
        ¿Ya tienes una cuenta?
        <router-link to="/" class="text-blue-500 hover:underline">Inicia sesión aquí</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'RegisterView',
  setup() {
    const store = useStore();
    const router = useRouter();

    const form = reactive({
      username: '',
      email: '',
      password: '',
    });

    const handleRegister = async () => {
      try {
        await store.dispatch('auth/register', {
          username: form.username,
          email: form.email,
          password: form.password,
        });
        router.push({ name: 'Chat' });
      } catch (error) {
        // Manejar errores de registro
        console.error(error);
      }
    };

    return {
      ...form,
      handleRegister,
    };
  },
});
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
