<template>
  <uni-popup
    ref="popup"
    :is-mask-click="closeOnClickOverlay"
    :safe-area="props.safeArea"
    :type="props.type ? props.type : 'bottom'"
    :change="props.hideTabBar ? hideTabBar : null"
    @mask-click="onMaskClick"
  >
    <div
      :class="props.padding ? props.padding : 'py-4'"
      :style="{
        ...(props.popStyle as any),
        background: props.background,
        maxHeight: props.maxHeight,
      }"
      class="upWindow"
    >
      <slot></slot>
      <div v-if="props.close" class="closeIcon" @click="close">
        <img
          v-if="props.close"
          alt="close"
          class="close"
          src="@/static/icon/close.png"
        />
      </div>
    </div>
  </uni-popup>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';

/**
 * @description 弹窗组件
 * @param {boolean} visible 是否显示弹窗
 * @param {boolean} closeOnClickOverlay 是否点击遮罩关闭弹窗
 * @param {boolean} safeArea 是否适配底部安全区域
 * @param {string} popStyle 弹窗样式
 * @param {boolean} close 是否显示关闭按钮
 * @param {string} type 弹窗类型
 * @param {string} padding 弹窗内边距
 * @param {string} background 弹窗背景色
 * @param {string} maxHeight 弹窗最大高度
 * @param {boolean} hideTabBar 是否隐藏底部栏
 */
const props = withDefaults(
  defineProps<{
    visible: boolean;
    closeOnClickOverlay?: boolean;
    safeArea?: boolean;
    popStyle?: string;
    close?: boolean;
    type?: string;
    padding?: string;
    background?: string;
    maxHeight?: string;
    hideTabBar?: boolean;
  }>(),
  {
    closeOnClickOverlay: true,
    popStyle: '',
    background: 'white',
    maxHeight: '70vh',
    hideTabBar: false,
  }
);

const { closeOnClickOverlay = true, hideTabBar = false } = props;

const emit = defineEmits<{
  (e: 'update:visible', v: boolean): void;
  (e: 'onMaskClick', v: boolean): void;
}>();
const popup = ref();

onMounted(() => {
  if (props.visible) {
    popup.value?.open();
    if (hideTabBar) {
      hideTabBarFunc();
    }
  }
});

watch(
  () => props.visible,
  () => {
    console.log('popup', popup.value);
    if (props.visible) {
      popup.value?.open();
      popup.value?.open();
      if (hideTabBar) {
        hideTabBarFunc();
      }
    } else {
      close();
    }
  }
);

function close() {
  popup.value?.close();
  emit('update:visible', false);
}

function onMaskClick() {
  closeOnClickOverlay && close();
  close();
  emit('onMaskClick', false);
}

// 弹窗显示时隐藏底栏
const hideTabBarFunc = () => {
  uni.hideTabBar();
  setTimeout(() => {
    uni.showTabBar();
  }, 300);
};
</script>

<style lang="scss" scoped>
.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.upWindow {
  position: relative;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.closeIcon {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.close {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
