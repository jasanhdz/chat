<template>
  <div class="relative flex h-screen py-7 bg-gray-100">
    <div class="mx-auto text-center text-black opacity-90 max-w-[460px] flex flex-col items-center justify-center">
      <div
        class="mx-auto rounded-full bg-no-repeat bg-center bg-cover w-[250px] h-[250px]"
        :style="{ backgroundImage: `url(${require('app/assets/intro-connection-light.jpg')})` }"
      ></div>
      <h1 class="mt-7 font-light text-gray-700">Selecciona un Usuario para comenzar a chatear</h1>
      <!-- Divider -->
      <div class="my-8 w-full border-b border-gray-300"></div>
      <p class="mt-4 text-sm leading-5 flex items-center justify-center">
        <span class="icon text-gray-500 text-xl mr-1">
          <DesktopTowerMonitorIcon width="21" height="21" />
        </span>
        ChatAPP está disponible para chatear
      </p>
    </div>
    <!-- Línea en la parte inferior -->
    <div class="absolute bottom-0 w-full border-t-4 border-gray-300"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DesktopTowerMonitorIcon } from 'mdi-vue3';

export default defineComponent({
  name: 'ChatEmpty',
  components: {
    DesktopTowerMonitorIcon,
  },
});
</script>

<style scoped>
/* Si necesitas estilos adicionales, puedes agregarlos aquí */
</style>
