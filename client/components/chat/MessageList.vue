<template>
  <div class="z-3 h-full pl-[9%] pr-[9%] overflow-y-auto z-10" ref="containerRef">
    <div v-for="msg in messages" :key="msg.id">
      <component
        :is="getMessageComponent(msg.messageType)"
        :is-from-me="msg.fromMe"
        :conversation="msg.content"
        :has-margin="hasMargin(msg)"
        :timestamp="msg.timestamp.getTime() / 1000"
        :url-image="msg.messageType === 'image' ? msg.content : ''"
      />
    </div>
    <!-- Elemento ancla para el scroll -->
    <div ref="scrollAnchor"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch, nextTick, onUpdated } from 'vue';
import { useStore } from 'vuex';
import MessageText from './MessageText.vue';
import MessageImage from './MessageImage.vue';
import Message from 'app/models/Message'; // Importa la interfaz Message
import User from 'app/models/User';

export default defineComponent({
  name: 'MessageList',
  components: {
    MessageText,
    MessageImage,
  },
  setup() {
    const store = useStore();
    const containerRef = ref<HTMLElement | null>(null);
    const scrollAnchor = ref<HTMLElement | null>(null); // Referencia al elemento ancla

    // Obtener el usuario actualmente seleccionado
    const currentUser = computed<User | null>(() => store.getters['chat/currentUser']);

    // Obtener los mensajes para el usuario actualmente seleccionado
    const messages = computed<Message[]>(() => {
      if (currentUser.value) {
        return store.getters['chat/messages'];
      }
      return [];
    });

    // Función para desplazar el scroll hacia el ancla
    const scrollToBottom = () => {
      if (scrollAnchor.value) {
        scrollAnchor.value.scrollIntoView({ behavior: 'smooth' });
      }
    };

    onMounted(() => {
      scrollToBottom();
    });

    // Watcher para cambios en messages.length
    watch(
      () => messages.value.length,
      (newLength, oldLength) => {
        if (newLength > oldLength) {
          // Usar nextTick para asegurarse de que el DOM se ha actualizado
          nextTick(() => {
            scrollToBottom();
          });
        }
      }
    );

    // Hook 'onUpdated' para asegurarse de que el scroll se realiza después de cada actualización
    onUpdated(() => {
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

    const hasMargin = (currentMessage: Message): boolean => {
      const index = messages.value.indexOf(currentMessage);
      if (index === messages.value.length - 1) return true;

      const nextMessage = messages.value[index + 1];
      return nextMessage.author !== currentMessage.author;
    };

    return {
      messages,
      containerRef,
      scrollAnchor, // Asegúrate de devolver 'scrollAnchor'
      getMessageComponent,
      hasMargin,
    };
  },
});
</script>
