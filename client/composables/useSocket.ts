import { computed } from 'vue';
import { useStore } from 'vuex';
import { Socket } from 'socket.io-client';

export function useSocket() {
  const store = useStore();

  const socket = computed<Socket | null>(() => store.getters['socket/getSocket']);
  const online = computed(() => store.getters['socket/isOnline']);

  /**
   * Emite un evento al servidor de Socket.io
   * @param event - Nombre del evento
   * @param data - Datos a enviar
   */
  const emit = (event: string, data: any) => {
    if (socket.value) {
      socket.value.emit(event, data);
    }
  };

  /**
   * Escucha un evento desde el servidor de Socket.io
   * @param event - Nombre del evento
   * @param callback - Función a ejecutar cuando se recibe el evento
   */
  const listen = (event: string, callback: (data: any) => void) => {
    if (socket.value) {
      socket.value.on(event, callback);
    }
  };

  /**
   * Remueve un listener de un evento específico
   * @param event - Nombre del evento
   * @param callback - Función que se usó como listener
   */
  const removeListener = (event: string, callback: (data: any) => void) => {
    if (socket.value) {
      socket.value.off(event, callback);
    }
  };

  return {
    socket,
    online,
    emit,
    listen,
    removeListener,
  };
}
