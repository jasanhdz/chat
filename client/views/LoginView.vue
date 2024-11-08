<template>
  <FormContainer title="Iniciar Sesión">
    <form @submit.prevent="handleLogin">
      <InputField label="Usuario" type="text" v-model="form.username" required />
      <InputField label="Contraseña" type="password" v-model="form.password" required />
      <Button type="submit" variant="primary">
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
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { FormContainer, InputField, Button } from 'app/components';
import { Credentials } from 'app/types';

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

    const form = reactive<Credentials>({
      username: '',
      password: '',
    });

    const handleLogin = async () => {
      try {
        await store.dispatch('auth/login', form);
        router.push({ name: 'Chat' });
      } catch (error) {
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
