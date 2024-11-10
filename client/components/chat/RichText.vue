<template>
  <div class="relative z-10 bg-gray-100 w-full">
    <Wrapper class="py-2">
      <div class="flex items-end">
        <!-- Iconos de la izquierda -->
        <div class="flex items-center px-2 space-x-2">
          <Icon>
            <StickerEmojiIcon width="26" />
          </Icon>
          <Icon :class="{ 'icon-rotate': true }">
            <FileUploadIcon width="24" role="Adjuntar" />
          </Icon>
        </div>
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
import { StickerEmojiIcon, FileUploadIcon, ArrangeSendBackwardIcon, MicrophoneIcon } from 'mdi-vue3';
import { Wrapper, Icon } from 'app/components';
import { useTextarea } from 'app/composables/useTextarea'
import User from 'app/models/User'

export default defineComponent({
  name: 'RichText',
  components: {
    StickerEmojiIcon,
    FileUploadIcon,
    ArrangeSendBackwardIcon,
    MicrophoneIcon,
    Wrapper,
    Icon,
  },
  setup() {
    const store = useStore();

    const currentUser = computed<User | null>(() => store.getters['chat/currentUser']);

    const sendMessage = (messageContent: string) =>{
      if (!currentUser.value) {
        console.warn('No hay un canal seleccionado')
        return;
      }

      store.dispatch('chat/sendMessage', messageContent)
    }

    const { textareaRef, value, isResize, handleInput, handleKeydown } = useTextarea(5, sendMessage);

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