// src/store/counter.ts
import { defineStore } from 'pinia';

export const useUserStoreHook = defineStore('user', () => {
  // ref变量 → state 属性
  const username = ref('');
  // computed计算属性 → getters
  const token = ref('');
  // function函数 → actions
  function increment(name: string) {
    username.value = name;
  }

  return { username, token, increment };
});
