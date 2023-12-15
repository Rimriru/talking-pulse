import { ref, onMounted, onUnmounted } from 'vue';

function useWindowResize() {
  const width = ref(window.innerWidth);

  const resizeCallback = () => {
    width.value = window.innerWidth;
  };

  onMounted(() => window.addEventListener('resize', resizeCallback));
  onUnmounted(() => window.removeEventListener('resize', resizeCallback));

  return { width };
}

export default useWindowResize;
