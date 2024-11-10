<template>
  <header class="relative mb-2 z-10 w-full bg-gray-200 border-l border-gray-300">
    <Wrapper>
      <div class="grid grid-cols-[55px_1fr_80px]">
        <div class="flex items-center">
          <Avatar v-if="user && user.avatar" :avatar="user.avatar" />
          <DefaultAvatar v-else :fill="'#dfe5e7'" />
        </div>
        <div class="flex items-center">
          {{ user ? user.fullName : 'Sin Usuario' }}
        </div>
        <div class="flex items-center space-x-2">
          <Icon>
            <MagnifyIcon width="24" />
          </Icon>
          <Icon>
            <DotsVerticalIcon width="24" />
          </Icon>
        </div>
      </div>
    </Wrapper>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { Wrapper, Avatar, DefaultAvatar, Icon } from 'app/components';
import { MagnifyIcon, DotsVerticalIcon } from 'mdi-vue3';
import User from 'app/models/User';

export default defineComponent({
  name: 'HeaderMessage',
  components: {
    Wrapper,
    Avatar,
    DefaultAvatar,
    Icon,
    MagnifyIcon,
    DotsVerticalIcon,
  },
  setup() {
    const store = useStore();
    const user = computed<User | null>(() => store.getters['chat/currentUser']);

    return {
      user,
    };
  },
});
</script>
