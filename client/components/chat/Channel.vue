<template>
  <div
    class="grid grid-cols-[77px_1fr] min-h-[70px] cursor-pointer hover:bg-gray-100"
  >
    <div class="flex items-center pl-4 pr-3">
      <Avatar v-if="avatar" :avatar="avatar" :size="49" />
      <DefaultAvatar v-else :fill="'#dfe5e7'" :size="49" />
    </div>
    <div class="py-3 pr-4 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <span class="text-lg font-medium">{{ userName }}</span>
        <span class="text-xs text-gray-500">{{ formattedDate }}</span>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-sm text-gray-600 truncate">{{ message }}</p>
        <!-- Icono de opciones (si lo deseas) -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Avatar, DefaultAvatar } from 'app/components';

export default defineComponent({
  name: 'Channel',
  components: {
    Avatar,
    DefaultAvatar,
  },
  props: {
    userName: {
      type: String,
      default: 'Usuario',
    },
    message: {
      type: String,
      default: 'Mensaje',
    },
    avatar: {
      type: String,
      default: '',
    },
    timestamp: {
      type: Number,
      default: Date.now(),
    },
  },
  setup(props) {
    const formattedDate = computed(() => {
      const date = new Date(props.timestamp * 1000);
      // Formato de fecha personalizado
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    return {
      formattedDate,
    };
  },
});
</script>
