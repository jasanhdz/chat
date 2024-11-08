<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    variant: {
      type: String,
      default: 'primary', // 'primary', 'secondary', 'danger', etc.
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props) {
    const buttonClasses = computed(() => {
      let classes = 'w-full py-2 rounded text-white focus:outline-none focus:ring';
      switch (props.variant) {
        case 'primary':
          classes += ' bg-blue-500 hover:bg-blue-600';
          break;
        case 'secondary':
          classes += ' bg-green-500 hover:bg-green-600';
          break;
        case 'danger':
          classes += ' bg-red-500 hover:bg-red-600';
          break;
        default:
          classes += ' bg-blue-500 hover:bg-blue-600';
      }

      if (props.disabled) {
        classes += ' opacity-50 cursor-not-allowed';
      }

      return classes;
    });

    return {
      buttonClasses,
    };
  },
});
</script>
