<template>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2">{{ label }}</label>
    <input
      :type="type"
      v-model="internalValue"
      :placeholder="placeholder"
      :required="required"
      class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, watch } from 'vue';

export default defineComponent({
  name: 'InputField',
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);
    const internalValue = ref(modelValue.value);

    watch(modelValue, (newVal) => {
      internalValue.value = newVal;
    });

    watch(internalValue, (newVal) => {
      emit('update:modelValue', newVal);
    });

    return {
      internalValue,
    };
  },
});
</script>
