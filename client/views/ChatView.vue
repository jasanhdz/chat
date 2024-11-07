<template>
  <main class="grid grid-cols-[410px_1fr] overflow-hidden">
    <!-- *** Sidebar *** -->
    <div class="flex flex-col border-r border-gray-300 h-full">
      <HeaderChannel />
      <Search />
      <ChannelList />
    </div>
    <!-- *** Message *** -->
    <!-- <ChatEmpty /> -->
    <div class="relative flex flex-col max-h-screen bg-gray-100">
      <!-- Fondo de Pantalla -->
      <div class="absolute inset-0 bg-repeat opacity-6 z-0"
        :style="{ backgroundImage: `url(${bgChatTileLight})`, opacity: 0.06 }"></div>
      <!-- Contenido Principal -->
      <HeaderMessage />
      <MessageList />
      <RichText />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { HeaderChannel, Search, ChannelList, ChatEmpty, HeaderMessage, MessageList, RichText } from 'app/components'
import bgChatTileLight from 'app/assets/bg-chat-tile-light.png';

export default defineComponent({
  name: 'ChatView',
  components: {
    HeaderChannel,
    Search,
    ChannelList,
    ChatEmpty,

    // ** Message Side **
    HeaderMessage,
    MessageList,
    RichText,
  },
  setup() {
    return {
      bgChatTileLight,
    };
  },
});
</script>
