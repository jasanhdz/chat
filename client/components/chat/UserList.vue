<template>
  <div class="bg-white overflow-y-auto" style="max-height: calc(100vh - 109px);">
    <div
      v-for="user in users"
      :key="user.uid"
      class="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
      @click="selectUser(user)"
    >
      <div class="flex items-center pl-4 pr-3">
        <Avatar v-if="user.avatar" :avatar="user.avatar" :size="49" />
        <DefaultAvatar v-else :fill="'#dfe5e7'" :size="49" />
      </div>
      <div>
        <div class="font-semibold">{{ user.fullName }}</div>
        <div class="text-sm text-gray-500">{{ user.email }}</div>
      </div>
      <span
        :class="['ml-auto w-3 h-3 rounded-full', user.online ? 'bg-green-500' : 'bg-gray-400']"
        title="Estado de conexión"
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import User from 'app/models/User';
import { Avatar, DefaultAvatar } from 'app/components'

export default defineComponent({
  name: 'UserList',
  components: {
    Avatar,
    DefaultAvatar
  },
  setup() {
    const store = useStore();
    const users = computed<User[]>(() => store.getters['chat/getUsers']);

    const selectUser = (user: User) => {
      store.dispatch('chat/selectUser', user);
      store.dispatch('socket/emitEvent', { event: 'getMessages', data: { userId: user.uid } });
    };

    return {
      users,
      selectUser,
    };
  },
});
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>
