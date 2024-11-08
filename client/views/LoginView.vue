<template>
  <FormContainer title="Iniciar Sesión">
    <form @submit.prevent="handleLogin">
      <InputField label="Correo Electrónico" type="email" v-model="form.email" required />
      <InputField label="Contraseña" type="password" v-model="form.password" required />

      <!-- Checkbox para "Recordar Usuario" -->
      <div class="flex items-center mb-4">
        <input
          id="rememberMe"
          type="checkbox"
          v-model="form.rememberMe"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label for="rememberMe" class="ml-2 text-sm text-gray-900">
          Recordar mi cuenta
        </label>
      </div>

      <!-- Mostrar mensaje de error si existe -->
      <div v-if="errorMessage" class="mb-4 text-red-500">
        {{ errorMessage }}
      </div>

      <!-- Botón con estado de carga -->
      <Button type="submit" variant="primary" :disabled="isLoading" :loading="isLoading">
        Ingresar
      </Button>
    </form>
    <template #footer>
      ¿No tienes una cuenta?
      <router-link to="/register" class="text-blue-500 hover:underline">Regístrate aquí</router-link>
    </template>
  </FormContainer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { FormContainer, InputField, Button } from 'app/components';
import { Credentials } from 'app/types';
import { useToast } from 'vue-toastification'; // Asegúrate de que la versión 2 está instalada

export default defineComponent({
  name: 'LoginView',
  components: {
    FormContainer,
    InputField,
    Button,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();

    // Estado del formulario
    const form = reactive<Credentials & { rememberMe: boolean }>({
      email: '',
      password: '',
      rememberMe: false,
    });

    const isLoading = ref(false);
    const errorMessage = ref<string | null>(null);

    const handleLogin = async () => {
      isLoading.value = true;
      errorMessage.value = null;

      try {
        await store.dispatch('auth/login', {
          email: form.email,
          password: form.password,
          rememberMe: form.rememberMe,
        });
        toast.success('Inicio de sesión exitoso');
        router.push({ name: 'Chat' });
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage.value = error.response.data.message;
          toast.error(error.response.data.message);
        } else {
          errorMessage.value = 'Ocurrió un error inesperado.';
          toast.error('Ocurrió un error inesperado.');
        }
      } finally {
        isLoading.value = false;
      }
    };

    return {
      form,
      handleLogin,
      isLoading,
      errorMessage,
    };
  },
});
</script>