<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">{{ title }}</h2>
      <slot></slot>
      <p class="mt-4 text-center">
        <slot name="footer"></slot>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormContainer',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
