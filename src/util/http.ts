import { getSystemInfo } from '@/util/commonUtil';

interface HTTPConfig {
  isRes?: boolean;
  loading?: boolean;
  ignoreTenantId?: boolean;
  ignoreToken?: boolean;
}

interface HTTPObject {
  url: string;
  method: string;
  data: any;
}

/**
 * @deprecated 使用axios替代
 *
 * @description: HTTP请求
 *
 * @param obj
 * @param config
 * @constructor
 */
function HTTP(obj: HTTPObject, config: HTTPConfig = {}) {
  let defaultConfig: HTTPConfig = {
    isRes: false,
    loading: false,
  };

  config = {
    ...defaultConfig,
    ...config,
  };

  config.loading &&
    uni.showLoading({
      title: '加载中',
      mask: true,
    });

  return new Promise<any>(async (resolve, reject) => {
    let options: any = {
      url: '',
      method: 'GET',
      data: {},
      header: {
        'client-id': getSystemInfo().uniPlatform,
      },
      success: (res: any) => {
        uni.hideLoading();
        if (res.statusCode == 200) {
          let data = res.data;
          if (data.code == '0') {
            resolve(data.data);
          } else if (data.code == 401) {
          } else if (data.code == 403) {
          } else {
            reject(data.msg);
          }
        } else {
          reject('HTTP:状态码异常！');
        }
      },
      fail: (err: any) => {
        uni.hideLoading();
        uni.showToast({
          title: '网络异常，请稍后再试!',
          icon: 'none',
        });
        reject('网络异常，请稍后再试!');
      },
      complete: () => {},
    };

    if (!config.ignoreTenantId) {
      let tenantId = uni.getStorageSync('tenantId');
      if (tenantId == null) {
        // tenantId = getTenantId();
      }
      options.header['tenant-id'] = tenantId || '';
    }

    options = {
      ...options,
      ...obj,
    };

    if (!config.ignoreToken) {
      let userInfo = uni.getStorageSync('userInfo');
      if (userInfo == null) {
        console.log('未登录');
        // userInfo = await login();
      }
      let token = userInfo.token || '';
      if (token) {
        options.header.Authorization = `Bearer ${token}`;
      }
    }
    if (options.url && options.method) {
      uni.request(options);
    } else {
      await uni.showToast({
        title: 'HTTP：缺失参数',
        icon: 'none',
        duration: 2000,
      });
    }
  });
}

export default {
  GET(url: string, data: any = {}, config: HTTPConfig) {
    return HTTP(
      {
        url,
        data,
        method: 'GET',
      },
      config
    );
  },
  POST(url: string, data: any = {}, config: HTTPConfig) {
    return HTTP(
      {
        url,
        data,
        method: 'POST',
      },
      config
    );
  },

  POSTformdata(url: string, data: any = {}, config: HTTPConfig) {
    return HTTP(
      {
        url,
        data,
        method: 'POST',
      },
      config
    );
  },
};
