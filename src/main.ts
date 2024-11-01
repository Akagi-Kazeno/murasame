import { createSSRApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { clear } from './util/db';

export function createApp() {
  const app = createSSRApp(App);
  app.use(createPinia());
  /**
   * 小程序版本更新
   */
  try {
    const updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      console.log('检查小程序版本更新', res.hasUpdate);
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            showCancel: true,
            success: function (res) {
              if (res.confirm) {
                // 更新前清理本地缓存
                clear(true);
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              }
            },
          });
        });
        updateManager.onUpdateFailed(function (err) {
          console.log('新版本下载失败', err);
        });
      }
    });
  } catch (e) {
    console.log('小程序版本更新失败', e);
  }
  return {
    app,
  };
}
