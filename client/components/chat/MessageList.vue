<template>
  <div class="z-3 h-full pl-[9%] pr-[9%] overflow-y-auto z-10" ref="containerRef">
    <div v-for="(msg, index) in messages" :key="index">
      <component
        :is="getMessageComponent(msg.messageType)"
        :is-from-me="msg.fromMe"
        :conversation="msg.content"
        :has-margin="hasMargin(msg)"
        :timestamp="msg.timestamp.getTime() / 1000"
        :url-image="msg.messageType === 'image' ? msg.content : ''"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import MessageText from './MessageText.vue';
import MessageImage from './MessageImage.vue';
import { Message as MessageClass } from "app/models/Message";

export default defineComponent({
  name: 'MessageList',
  components: {
    MessageText,
    MessageImage,
  },
  setup() {
    const store = useStore();
    const containerRef = ref<HTMLElement | null>(null);

    const messages = computed<MessageClass[]>(() => store.getters['chat/getMessages']);

    const scrollToBottom = () => {
      if (containerRef.value) {
        containerRef.value.scrollTop = containerRef.value.scrollHeight;
      }
    };

    onMounted(() => {
      scrollToBottom();
    });

    watch(messages, () => {
      scrollToBottom();
    });

    const getMessageComponent = (messageType: string) => {
      switch (messageType) {
        case 'text':
          return 'MessageText';
        case 'image':
          return 'MessageImage';
        default:
          return 'MessageText';
      }
    };

    const hasMargin = (currentMessage: MessageClass): boolean => {
      const index = messages.value.indexOf(currentMessage);
      if (index === messages.value.length - 1) return true;

      const nextMessage = messages.value[index + 1];
      return nextMessage.author !== currentMessage.author;
    };

    return {
      messages,
      containerRef,
      getMessageComponent,
      hasMargin,
    };
  },
});
</script>
