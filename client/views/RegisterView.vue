<template>
  <FormContainer title="Registro">
    <form @submit.prevent="handleRegister">
      <InputField
        label="Nombre Completo"
        type="text"
        v-model="form.fullName"
        required
      />
      <InputField
        label="Correo Electrónico"
        type="email"
        v-model="form.email"
        required
      />
      <InputField
        label="Contraseña"
        type="password"
        v-model="form.password"
        required
      />

      <div v-if="errorMessage" class="mb-4 text-red-500">
        {{ errorMessage }}
      </div>

      <Button type="submit" variant="secondary" :disabled="isLoading" :loading="isLoading">
        <span v-if="isLoading">Registrando...</span>
        <span v-else>Registrarse</span>
      </Button>
    </form>
    <template #footer>
      ¿Ya tienes una cuenta?
      <router-link to="/" class="text-blue-500 hover:underline">Inicia sesión aquí</router-link>
    </template>
  </FormContainer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { FormContainer, InputField, Button } from 'app/components';
import { RegisterData } from 'app/types/api';
import { useToast } from 'vue-toastification';

export default defineComponent({
  name: 'RegisterView',
  components: {
    FormContainer,
    InputField,
    Button,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();

    const form = reactive<RegisterData>({
      fullName: '',
      email: '',
      password: '',
    });

    const isLoading = ref(false);
    const errorMessage = ref<string | null>(null);

    const handleRegister = async () => {
      isLoading.value = true;
      errorMessage.value = null;

      try {
        await store.dispatch('auth/register', {
          fullName: form.fullName,
          email: form.email,
          password: form.password,
        });
        toast.success('Registro exitoso. Bienvenido!');
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
      handleRegister,
      isLoading,
      errorMessage,
    };
  },
});
</script>
