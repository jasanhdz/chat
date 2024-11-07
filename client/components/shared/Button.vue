<template>
  <button :class="classes" @click="onClick">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    variant: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    classes() {
      return `btn btn-${this.variant}`;
    },
  },
  methods: {
    onClick(event: Event) {
      this.$emit('click', event);
    },
  },
});
</script>

<style scoped>
/* Estilos del botón */
</style>
