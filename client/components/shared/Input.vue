<template>
  <input :type="type" :value="modelValue" @input="onInput" :placeholder="placeholder" :class="classes" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    modelValue: String,
    placeholder: String,
  },
  emits: ['update:modelValue'],
  computed: {
    classes() {
      return 'input-class';
    },
  },
  methods: {
    onInput(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit('update:modelValue', target.value);
    },
  },
});
</script>

<style scoped>
/* Estilos del input */
</style>
