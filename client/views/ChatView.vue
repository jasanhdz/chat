<template>
  <main class="grid grid-cols-[410px_1fr] overflow-hidden">
    <!-- *** Sidebar *** -->
    <div class="flex flex-col border-r border-gray-300 h-full">
      <HeaderChannel />
      <Search />
      <ChannelList />
    </div>
    <!-- *** Message *** -->
    <div v-if="currentChannel" class="relative flex flex-col h-screen max-h-screen bg-gray-100">
      <div class="absolute inset-0 bg-repeat opacity-6 z-0" :style="{ backgroundImage: `url(${bgChatTileLight})`, opacity: 0.06 }"></div>
      <HeaderMessage />
      <MessageList />
      <RichText />
    </div>
    <ChatEmpty v-else />
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
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
    const store = useStore();

    const currentChannel = computed(() => store.getters['chat/currentChannel']);

    return {
      bgChatTileLight,
      currentChannel
    };
  },
});
</script>
