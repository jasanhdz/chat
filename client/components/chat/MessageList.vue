<template>
  <div class="z-3 h-full pl-[9%] pr-[9%] overflow-y-auto z-10" ref="containerRef">
    <div v-for="(msg, index) in messages" :key="index">
      <component
        :is="getMessageComponent(msg.messageType)"
        :is-from-me="msg.key.fromMe"
        :conversation="msg.conversation"
        :has-margin="hasMargin(index)"
        :timestamp="msg.messageTimestamp"
        :url-image="getImageUrl(msg)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import MessageText from './MessageText.vue';
import MessageImage from './MessageImage.vue';

export default defineComponent({
  name: 'MessageList',
  components: {
    MessageText,
    MessageImage,
  },
  setup() {
    const store = useStore();

    // Mensajes de ejemplo
    const sampleMessages: any[] = [
      {
        key: { fromMe: true },
        messageType: 'text',
        conversation: 'Hola, ¿cómo estás?',
        messageTimestamp: 1621386636,
      },
      {
        key: { fromMe: false },
        messageType: 'text',
        conversation: '¡Hola! Estoy bien, gracias. ¿Y tú?',
        messageTimestamp: 1621387636,
      },
      {
        key: { fromMe: true },
        messageType: 'text',
        conversation: 'También bien. ¿Qué has estado haciendo?',
        messageTimestamp: 1621388636,
      },
      {
        key: { fromMe: false },
        messageType: 'text',
        conversation: 'He estado trabajando en un proyecto interesante.',
        messageTimestamp: 1621389636,
      },
      {
        key: { fromMe: true },
        messageType: 'text',
        conversation: '¡Genial! Cuéntame más al respecto.',
        messageTimestamp: 1621390636,
      },
      {
        key: { fromMe: false },
        messageType: 'image',
        messageTimestamp: 1621391636,
        imageMessage: {
          jpegThumbnail: '...' // Base64 de una imagen de ejemplo
        },
      },
      {
        key: { fromMe: true },
        messageType: 'text',
        conversation: 'Me encantaría verla cuando esté lista.',
        messageTimestamp: 1621392636,
      },
      {
        key: { fromMe: false },
        messageType: 'text',
        conversation: 'Por supuesto, te avisaré.',
        messageTimestamp: 1621393636,
      },
      {
        key: { fromMe: true },
        messageType: 'text',
        conversation: '¿Quieres salir a comer mañana?',
        messageTimestamp: 1621394636,
      },
      {
        key: { fromMe: false },
        messageType: 'text',
        conversation: '¡Sí, me parece perfecto!',
        messageTimestamp: 1621395636,
      },
    ];

    // Ajustamos currentChannel para incluir los mensajes de ejemplo
    const currentChannel = computed(() => {
      const channelIndex = store.state.UI?.channelIndex ?? 0;
      const channelList = store.state.channel?.list ?? [
        {
          userName: 'Usuario 1',
          messages: sampleMessages,
          avatar: null,
          timestamp: 1621386636,
        },
      ];

      if (channelList.length > channelIndex) {
        return channelList[channelIndex];
      } else {
        return null;
      }
    });

    const messages = computed(() => {
      return currentChannel.value?.messages ?? [];
    });

    const containerRef = ref<HTMLElement | null>(null);

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

    const hasMargin = (index: number) => {
      const msgs = messages.value;
      const isLastMessage = index === msgs.length - 1;
      if (isLastMessage) return true;

      const currentMessage = msgs[index];
      const nextMessage = msgs[index + 1];

      if (
        !currentMessage ||
        !nextMessage ||
        !currentMessage.key ||
        !nextMessage.key ||
        typeof currentMessage.key.fromMe !== 'boolean' ||
        typeof nextMessage.key.fromMe !== 'boolean'
      ) {
        return true;
      }

      return currentMessage.key.fromMe !== nextMessage.key.fromMe;
    };

    const getImageUrl = (msg: any) => {
      if (msg.imageMessage?.jpegThumbnail) {
        return `data:image/jpeg;base64,${msg.imageMessage.jpegThumbnail}`;
      }
      return '';
    };

    return {
      messages,
      containerRef,
      getMessageComponent,
      hasMargin,
      getImageUrl,
    };
  },
});
</script>
