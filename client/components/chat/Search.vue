<template>
  <div class="p-2 bg-gray-100">
    <div class="relative">
      <div
        class="flex items-center bg-white rounded-full shadow-sm"
        :class="{ 'ring-2 ring-blue-500': isActive }"
      >
        <span class="pl-4">
          <svg
            v-if="!isActive"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <!-- Icono de búsqueda -->
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-10.6 0 7.5 7.5 0 0 0 10.6 0z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            @click="handleCleanInput"
          >
            <!-- Icono de retroceso -->
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </span>
        <input
          type="text"
          class="flex-grow px-2 py-2 bg-transparent outline-none text-sm"
          placeholder="Buscar o empezar un chat nuevo"
          v-model="searchQuery"
          @focus="handleOpenModal"
          @blur="handleBlur"
        />
        <span class="pr-4" v-if="searchQuery">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            @click="handleCleanInput"
          >
            <!-- Icono de cerrar -->
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Search',
  setup() {
    const searchQuery = ref('');
    const isActive = ref(false);

    const handleOpenModal = () => {
      isActive.value = true;
    };

    const handleBlur = () => {
      if (!searchQuery.value) {
        isActive.value = false;
      }
    };

    const handleCleanInput = () => {
      searchQuery.value = '';
      isActive.value = false;
    };

    return {
      searchQuery,
      isActive,
      handleOpenModal,
      handleBlur,
      handleCleanInput,
    };
  },
});
</script>
