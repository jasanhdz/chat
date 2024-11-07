<template>
  <header class="bg-gray-200 w-full">
    <Wrapper>
      <div class="flex justify-between items-center">
        <div>
          <Avatar v-if="true" :avatar="profileUrl" />
          <DefaultAvatar v-else :fill="'#dfe5e7'" />
        </div>
        <div class="flex space-x-4">
          <Icon @click="handleMessageClick">
            <MessageIcon width="24" />
          </Icon>
          <Icon @click="handleMenuClick">
            <DotsVerticalIcon width="24" />
          </Icon>
        </div>
      </div>
    </Wrapper>
  </header>
</template>


<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import {
  Wrapper,
  Avatar,
  DefaultAvatar,
  Icon
} from 'app/components';
import { MessageIcon, DotsVerticalIcon } from 'mdi-vue3';

export default defineComponent({
  name: 'HeaderChannel',
  components: {
    Wrapper,
    Avatar,
    Icon,
    DefaultAvatar,
    MessageIcon,
    DotsVerticalIcon,
  },
  setup() {
    const store = useStore();
    const profileUrl = computed(() => store.state.UI.profile?.avatar || null);

    const handleMessageClick = () => {
      // Implementa la lógica para el clic en el icono de mensaje
    };

    const handleMenuClick = () => {
      // Implementa la lógica para el clic en el icono de menú
    };

    return {
      profileUrl: null,
      handleMessageClick,
      handleMenuClick,
    };
  },
});
</script>

<style scoped>
/* No se requieren estilos adicionales debido al uso de Tailwind CSS */
</style>
