/**
 * @description: 本地缓存操作
 */
type SuccessCallback = (res: { data: any }) => void;
type StorageOptions = { key: string; data: any; success?: SuccessCallback };

/**
 * 从本地缓存中获取指定 key 的内容
 * @param key
 * @param sync
 */
function get(key: string, sync: boolean): any {
  try {
    if (sync) {
      return uni.getStorageSync(key);
    } else {
      let data = '';
      uni.getStorage({
        key: key,
        success: function (res) {
          data = res.data;
        },
      });
      return data;
    }
  } catch (e) {
    return false;
  }
}

/**
 * 将数据存储在本地缓存中指定的 key 中
 * @param options
 * @param sync
 */
function set(options: StorageOptions, sync: boolean): boolean {
  try {
    if (sync) {
      uni.setStorageSync(options.key, options.data);
    } else {
      uni.setStorage({
        key: options.key,
        data: options.data,
        success(result) {},
      });
    }
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 从本地缓存中移除指定的key
 * @param key
 * @param sync
 */
function remove(key: string, sync: boolean): boolean {
  try {
    if (sync) {
      uni.removeStorageSync(key);
    } else {
      uni.removeStorage({
        key: key,
        success: function (res) {
          console.log('remove {} from storage success', key);
        },
      });
    }
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 清理本地缓存
 * @param sync
 */
function clear(sync: boolean): boolean {
  try {
    if (sync) {
      uni.clearStorageSync();
    } else {
      uni.clearStorage();
    }
    return true;
  } catch (e) {
    return false;
  }
}

export { get, set, remove, clear };
