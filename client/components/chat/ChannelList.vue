<template>
  <div class="bg-white overflow-y-auto" style="max-height: calc(100vh - 109px);">
    <Channel
      v-for="channel in channels"
      :key="channel.id || ''"
      :user-name="channel.userName"
      :avatar="channel.avatar || ''"
      :message="channel.getRecentMessages(1)[0]?.content || ''"
      :timestamp="channel.getRecentMessages(1)[0]?.timestamp.getTime() / 1000 || 0"
      @click="selectChannel(channel.id ?? '')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex';
import Channel from './Channel.vue';
import ChannelClass from 'app/models/Channel';

export default defineComponent({
  name: 'ChannelList',
  components: {
    Channel,
  },
  setup() {
    const store = useStore()
    const channels = computed<ChannelClass[]>(() => store.getters['chat/getChannels'])

    const selectChannel = (channelId: string) => {
      store.dispatch('chat/selectChannel', channelId)
    }

    return {
      channels,
      selectChannel
    }
  }
});
</script>
