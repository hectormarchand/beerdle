import { getCurrentInstance } from 'vue';

export function useConfetti() {
  const internalInstance = getCurrentInstance();
  const confetti = internalInstance?.appContext.config.globalProperties.$confetti;
  return confetti;
}