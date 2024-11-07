<template>
  <div :class="containerClass">
    <div :class="messageContainerClass">
      <div class="flex">
        <p v-html="formattedConversation"></p>
        <p class="date">{{ formattedDate }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { formatAMPM, urlify } from 'app/utils';

export default defineComponent({
  name: 'MessageText',
  props: {
    isFromMe: {
      type: Boolean,
      required: true,
    },
    hasMargin: {
      type: Boolean,
      default: true,
    },
    conversation: {
      type: String,
      default: 'No existe el mensaje o el mensaje aún no está mapeado en el frontend',
    },
    timestamp: {
      type: Number,
      default: Date.now(),
    },
  },
  setup(props) {
    const formattedDate = computed(() => {
      const date = new Date(props.timestamp * 1000);
      return formatAMPM(date);
    });

    const formattedConversation = computed(() => {
      return urlify(props.conversation);
    });

    const containerClass = computed(() => [
      'flex',
      props.isFromMe ? 'justify-end' : 'justify-start',
      props.hasMargin ? 'mb-3' : 'mb-1',
    ]);

    const messageContainerClass = computed(() => [
      'p-2',
      'shadow',
      'rounded',
      props.isFromMe ? 'bg-outgoing' : 'bg-white',
      'max-w-max',
    ]);

    return {
      formattedDate,
      formattedConversation,
      containerClass,
      messageContainerClass,
    };
  },
});
</script>

<style scoped>
.date {
  color: var(--buble-meta);
  font-size: 11px;
  min-width: 84px;
  max-width: 84px;
  text-align: end;
  margin-top: 2px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
</style>
