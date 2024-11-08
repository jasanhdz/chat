<template>
  <FormContainer title="Registro">
    <form @submit.prevent="handleRegister">
      <InputField
        label="Usuario"
        type="text"
        v-model="form.username"
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
      <Button type="submit" variant="secondary">
        Registrarse
      </Button>
    </form>
    <template #footer>
      ¿Ya tienes una cuenta?
      <router-link to="/" class="text-blue-500 hover:underline">Inicia sesión aquí</router-link>
    </template>
  </FormContainer>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { FormContainer, InputField, Button } from 'app/components'

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
      form,
      handleRegister,
    };
  },
});
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
