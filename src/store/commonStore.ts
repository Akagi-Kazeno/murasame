import { defineStore } from 'pinia';
import { get, remove, set } from '@/util/db';

/**
 * @description: 公共store
 */
export const useCommonStore = defineStore('CommonStore', {
  state: () => ({
    // 用户信息
    userInfo: undefined as undefined | UserType.UserInfo,
    sessionKey: get('sessionKey', true) as string,
    systemInfo: undefined as undefined | EnvInfo.SystemInfo,
    userInit: false,
    appEnvInfo: undefined as undefined | EnvInfo.AppEnvInfo,
  }),
  getters: {
    // 是否登录
    isLogin: state => !!state.userInfo?.token,
    isNotLogin: state => !state.userInfo?.token,
  },
  actions: {
    // 设置SessionKey
    setSessionKey(sessionKey: string) {
      this.sessionKey = sessionKey;
      remove('sessionKey', true);
      set({ key: 'sessionKey', data: sessionKey }, true);
    },
    // 移除SessionKey
    removeSessionKey() {
      remove('sessionKey', true);
      this.sessionKey = '';
      this.userInfo = undefined;
    },
    // 等待用户信息初始化
    waitUserInit() {
      return new Promise<void>(async resolve => {
        while (this.userInit === false) {
          await new Promise<void>(next => {
            setTimeout(next, 100);
          });
        }
        resolve();
      });
    },
    // 用户信息初始化
    async userInit() {
      if (!this.userInfo?.openId) {
        const loginResult = await uni.login();
        console.log('loginResult', loginResult);
      }
    },
  },
});
