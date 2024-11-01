<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ state.title }}</text>
      <!--      使用组件内state的内容      -->
      <div>
        <text>{{ state.info?.deviceModel || 'unknown' }}</text>
      </div>
    </view>
    <!--    使用commonStore内存储的内容       -->
    <div>
      <text>{{ info?.system || 'unknown' }}</text>
    </div>
    <div class="change" @click="change">
      <text>{{ state.isL }}</text>
    </div>
    <div>
      <!--      获取commonStore内的state       -->
      <text>{{ commonStore.$state.userInit }}</text>
    </div>
    <div>
      <text>{{ commonStore.$state.appEnvInfo?.appId }}</text>
    </div>
    <div class="colorbox">
      <div class="wh10px mx1"></div>
      <div class="wh1rem mx1"></div>
      <div class="wh10upx mx1"></div>
      <div class="wh10rpx mx1"></div>
      <div class="wh1em"></div>
    </div>
    <div class="fontbox">
      <div class="bold mx1">1</div>
      <div class="mx1">1</div>
      <div class="thin mx1">1</div>
      <div class="italic">1</div>
    </div>
    <div class="popup" @click="popup">popup</div>
    <div class="changeFlavor" @click="changeTheme">change</div>
    <div
      :style="{ backgroundColor: state.backgroundColor }"
      class="wh10rem"
    ></div>
    <div class="text-blue-500 font-bold mt-8">tailwind test</div>
  </view>
  <kira-popup
    v-model:visible="state.isPop"
    position="bottom"
    :close="true"
    :hide-tab-bar="false"
  >
    <div class="poped">popup</div>
  </kira-popup>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { useCommonStore } from '@/store/commonStore';
import { set } from '@/util/db';
import KiraPopup from '@/components/kira-popup.vue';
import { UserService } from '@/service/UserService';
import axiosGetExample = UserService.axiosGetExample;

onMounted(() => {
  axiosGetExample().then(res => {
    console.info(res);
  });
});
const commonStore = useCommonStore();
const info = commonStore.systemInfo;
const state = reactive({
  title: 'Hello',
  info: commonStore.systemInfo,
  isL: false,
  isPop: false,
  backgroundColor: 'green',
});
const change = () => {
  // 更改当前组件state中的值
  state.isL = !state.isL;
  // 更改commonStore中的值
  commonStore.$state.userInit = state.isL;
};
const popup = async () => {
  // 弹出弹窗时，将commonStore中的systemInfo值存入本地存储
  set({ data: info, key: 'systemInfo' }, true);
  state.isPop = !state.isPop;
  if (state.isPop) {
    console.log();
  }
};
// 更改主题(更改全部主题将主题属性放置在commonStore)
const changeTheme = () => {
  state.backgroundColor = state.backgroundColor === 'green' ? 'black' : 'green';
  console.log('theme changed');
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.wh10px {
  width: 10px;
  height: 10px;
  background-color: red;
}

.wh1rem {
  width: 1rem;
  height: 1rem;
  background-color: green;
}

.wh10upx {
  width: 10upx;
  height: 10upx;
  background-color: blue;
}

.wh10rpx {
  width: 10rpx;
  height: 10rpx;
  background-color: orange;
}

.wh1em {
  width: 1em;
  height: 1em;
  background: aqua;
}

.colorbox {
  display: flex;
}

.fontbox {
  display: flex;
}

.bold {
  font-weight: bold;
}

.thin {
  font-weight: 345;
}

.italic {
  font-style: italic;
}

.poped {
  width: 100%;
  height: 30vh;
  background: linear-gradient(
      217deg,
      rgba(255, 0, 0, 0.8),
      rgba(255, 0, 0, 0) 70.71%
    ),
    linear-gradient(127deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%);
  text-align: center;
  line-height: 100rpx;
}

.px1 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py1 {
  padding-bottom: 1rem;
  padding-top: 1rem;
}

.mx1 {
  margin-left: 1rem;
  margin-right: 1rem;
}

.my1 {
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.wh10rem {
  width: 10rem;
  height: 10rem;
}
</style>
