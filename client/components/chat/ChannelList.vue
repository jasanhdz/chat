<template>
  <div class="bg-white overflow-y-auto" style="max-height: calc(100vh - 109px);">
    <Channel
      v-for="(channel, index) in channels"
      :key="index"
      :user-name="channel.userName"
      :avatar="channel.avatar"
      :message="channel.message"
      :timestamp="channel.timestamp"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Channel from './Channel.vue';

export default defineComponent({
  name: 'ChannelList',
  components: {
    Channel,
  },
  data() {
    return {
      channels: [
        { userName: 'Usuario 1', message: 'Mensaje 1', avatar: null, timestamp: 1621386636 },
        { userName: 'Usuario 2', message: 'Mensaje 2', avatar: null, timestamp: 1621386636 },
        { userName: 'Usuario 2', message: 'Mensaje 2', avatar: null, timestamp: 1621386636 },
        { userName: 'Usuario 2', message: 'Mensaje 2', avatar: null, timestamp: 1621386636 },
        { userName: 'Usuario 2', message: 'Mensaje 2', avatar: null, timestamp: 1621386636 },
        { userName: 'Usuario 2', message: 'Mensaje 2', avatar: null, timestamp: 1621386636 },
        { userName: 'Usuario 2', message: 'Mensaje 2', avatar: null, timestamp: 1621386636 },
        { userName: 'Usuario 2', message: 'Mensaje 2', avatar: null, timestamp: 1621386636 },
        { userName: 'Usuario 2', message: 'Mensaje 2', avatar: null, timestamp: 1621386636 },
        { userName: 'Usuario 2', message: 'Mensaje 2', avatar: null, timestamp: 1621386636 },
        { userName: 'Usuario 2', message: 'Mensaje 2', avatar: null, timestamp: 1621386636 },
      ],
    };
  },
});
</script>
