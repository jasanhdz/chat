<template>
  <span class="cursor-pointer" @click="$emit('click')">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Icon',
});
</script>
