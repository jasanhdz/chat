<template>
  <figure :style="{ height: size + 'px', width: size + 'px' }"
    class="flex justify-center items-center rounded-full overflow-hidden">
    <img :width="size" :height="size" :src="avatarSrc" alt="avatar" loading="lazy"
      class="rounded-full object-cover" />
  </figure>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import defaultAvatar from 'app/assets/avatar.jpg';

export default defineComponent({
  name: 'Avatar',
  props: {
    avatar: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 40,
    },
  },
  setup(props) {
    const avatarSrc = computed(() => {
      return props.avatar ? props.avatar : defaultAvatar;
    });

    return {
      avatarSrc,
    };
  },
});
</script>
