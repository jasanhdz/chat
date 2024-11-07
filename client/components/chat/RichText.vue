<template>
  <div class="relative z-10 bg-gray-100 w-full">
    <Wrapper class="py-2">
      <div class="flex items-end">
        <!-- Iconos de la izquierda -->
        <div class="flex items-center px-2 space-x-2">
          <Icon>
            <StickerEmojiIcon width="26" />
          </Icon>
          <Icon rotate="true">
            <FileUploadIcon width="24" role="Adjuntar" />
          </Icon>
        </div>
        <!-- Área de texto -->
        <div class="flex-1 mx-2">
          <textarea
            ref="textareaRef"
            v-model="value"
            @input="handleInput"
            @keydown="handleKeydown"
            rows="1"
            placeholder="Escribe un mensaje aquí"
            class="w-full p-3 -mb-2 rounded-lg resize-none outline-none text-base font-normal bg-white shadow"
          ></textarea>
        </div>
        <!-- Icono de enviar o de voz -->
        <div class="flex items-center px-2">
          <Icon v-if="value.length">
            <InvoiceTextSendIcon @click="sendMessage" width="24" role="Enviar" />
          </Icon>
          <Icon v-else>
            <MicrophoneIcon width="24" role="Grabar" />
          </Icon>
        </div>
      </div>
    </Wrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { StickerEmojiIcon, FileUploadIcon, InvoiceTextSendIcon, MicrophoneIcon } from 'mdi-vue3';
import { Wrapper, Icon } from 'app/components';
import { useTextarea } from 'app/composables/useTextarea'

export default defineComponent({
  name: 'RichText',
  components: {
    StickerEmojiIcon,
    FileUploadIcon,
    InvoiceTextSendIcon,
    MicrophoneIcon,
    Wrapper,
    Icon,
  },
  setup() {
    const store = useStore();

    // Validaciones para acceder al store
    const channelIndex = computed(() => {
      return store.state.UI?.channelIndex ?? 0;
    });

    const channelList = computed(() => {
      return store.state.channel?.list ?? [];
    });

    const channel = computed(() => {
      const index = channelIndex.value;
      if (channelList.value.length > index) {
        return channelList.value[index];
      }
      return null;
    });

    const jid = computed(() => {
      return channel.value?.jid ?? null;
    });

    // Usar el hook useTextarea
    const { textareaRef, value, isResize, handleInput, handleKeydown } = useTextarea(5, sendMessage);

    // Función para enviar mensajes
    function sendMessage(message: string) {
      if (!jid.value) {
        console.warn('jid no está disponible.');
        return;
      }

      // Crear el mensaje
      const msg = Message.createTextMessage(jid.value, message);

      // Despachar las acciones al store
      store.dispatch('addMessage', { index: channelIndex.value, message: msg });
      store.dispatch('setChannelIndex', channelIndex.value);
    }

    return {
      textareaRef,
      value,
      isResize,
      handleInput,
      handleKeydown,
      sendMessage,
    };
  },
});
</script>