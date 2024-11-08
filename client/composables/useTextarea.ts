import { ref } from 'vue';

export function useTextarea(maxRows: number, callback?: (value: string) => void) {
  const textareaRef = ref<HTMLTextAreaElement | null>(null);
  const value = ref('');
  const isResize = ref(true);

  const handleInput = () => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto';
      textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;

      const lines = textareaRef.value.value.split('\n').length;
      isResize.value = lines <= maxRows;
    }
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      } else {
        event.preventDefault();
        if (callback && value.value.trim() !== '') {
          callback(value.value.trim());
          value.value = '';
          if (textareaRef.value) {
            textareaRef.value.style.height = 'auto';
          }
        }
      }
    }
  };

  return {
    textareaRef,
    value,
    isResize,
    handleInput,
    handleKeydown,
  };
}
