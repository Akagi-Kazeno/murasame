<script lang="ts" setup>
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import { useCommonStore } from '@/store/commonStore';
import { getAppEnvInfo, getSystemInfo } from '@/util/commonUtil';
import { ref } from 'vue';
import { clear, get } from './util/db';

const launchFinished = ref(false);
onLaunch(() => {
  Promise.prototype.finally = function (callback: any) {
    return this.then(
      async value => {
        return Promise.resolve(callback()).then(() => value);
      },
      async reason => {
        return Promise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  };
  // 获取数据存储至commonStore
  const commonStore = useCommonStore();
  const systemInfo = uni.getSystemInfoSync();
  if (
    get('systemInfo', true) &&
    systemInfo.appVersionCode !== get('systemInfo', true)?.appVersion
  ) {
    clear(true);
    console.log('clear cache');
  }
  commonStore.systemInfo = getSystemInfo();
  commonStore.appEnvInfo = getAppEnvInfo();
  console.log('App Launch');
  launchFinished.value = true;
});
onShow(async () => {
  const commonStore = useCommonStore();
  if (!launchFinished.value) {
    await new Promise(resolve => {
      const checkInterval = setInterval(() => {
        if (launchFinished.value) {
          clearInterval(checkInterval);
          resolve(null);
        }
      }, 100);
    });
  }
  console.log('App Show');
});
onHide(() => {
  const commonStore = useCommonStore();
  console.log('App Hide');
});
</script>
<style lang="scss">
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
