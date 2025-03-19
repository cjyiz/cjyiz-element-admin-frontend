// src/store/counter.ts
import { loginApi } from '@/api/auth';
import { LoginData } from '@/api/auth/type';
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
  /**
   * 登录调用
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((response) => {
          const { tokenType, accessToken } = response.data;
          token.value = tokenType + ' ' + accessToken; // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  return { username, token, increment };
});
