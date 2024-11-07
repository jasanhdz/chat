<template>
  <div :class="containerClass">
    <div :class="messageContainerClass">
      <img :src="urlImage" alt="image" class="w-[330px] h-[185px]" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'MessageImage',
  props: {
    isFromMe: {
      type: Boolean,
      required: true,
    },
    hasMargin: {
      type: Boolean,
      default: true,
    },
    urlImage: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      default: Date.now(),
    },
  },
  setup(props) {
    const containerClass = computed(() => [
      'flex',
      props.isFromMe ? 'justify-end' : 'justify-start',
      props.hasMargin ? 'mb-3' : 'mb-1',
    ]);

    const messageContainerClass = computed(() => [
      'p-2',
      'shadow',
      'rounded',
      props.isFromMe ? 'bg-green-200' : 'bg-white',
      'max-w-max',
    ]);

    return {
      containerClass,
      messageContainerClass,
    };
  },
});
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
