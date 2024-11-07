<template>
  <div :style="wrapperStyle" class="mx-auto">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Wrapper',
  props: {
    paddingVertical: {
      type: Number,
      default: 10,
    },
    paddingHorizontal: {
      type: Number,
      default: 16,
    },
    maxWidth: {
      type: Number,
      default: null,
    },
  },
  computed: {
    wrapperStyle(): object {
      return {
        padding: `${this.paddingVertical}px ${this.paddingHorizontal}px`,
        maxWidth: this.maxWidth ? `${this.maxWidth}px` : undefined,
      };
    },
  },
});
</script>