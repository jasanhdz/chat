<!-- src/views/ChatView.vue -->

<template>
  <main class="grid grid-cols-[410px_1fr] overflow-hidden">
    <!-- *** Sidebar *** -->
    <div class="flex flex-col border-r border-gray-300 h-full">
      <HeaderChannel />
      <Search />
      <UserList />
    </div>
    <!-- *** Message *** -->
    <div v-if="currentUser" class="relative flex flex-col h-screen max-h-screen bg-gray-100">
      <div class="absolute inset-0 bg-repeat opacity-6 z-0" :style="{ backgroundImage: `url(${bgChatTileLight})`, opacity: 0.06 }"></div>
      <HeaderMessage />
      <MessageList :messages="messages" />
      <RichText />
    </div>
    <ChatEmpty v-else />
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { HeaderChannel, Search, UserList, ChatEmpty, HeaderMessage, MessageList, RichText } from 'app/components';
import bgChatTileLight from 'app/assets/bg-chat-tile-light.png';
import User from 'app/models/User';
import MessageClass from 'app/models/MessageClass';

export default defineComponent({
  name: 'ChatView',
  components: {
    HeaderChannel,
    Search,
    UserList,
    ChatEmpty,

    // ** Message Side **
    HeaderMessage,
    MessageList,
    RichText,
  },
  setup() {
    const store = useStore();

    const currentUser = computed<User | null>(() => store.getters['chat/currentUser']);
    
    const messages = computed<MessageClass[]>(() => store.getters['chat/messages']);

    return {
      bgChatTileLight,
      currentUser,
      messages,
    };
  },
});
</script>

<style scoped>
/* Añade estilos según tus necesidades */
</style>
