import { AxiosError } from 'axios';
import type { AxiosAdapter } from 'axios';
import { objectToQueryString } from '@/util/commonUtil';

export const UniAxiosAdapter: AxiosAdapter = config => {
  return new Promise((resolve, reject) => {
    // 处理querystring
    let query = '';
    if (config.params) {
      const flag = config.url?.includes('?') ? '&' : '?';
      if (typeof config.params === 'string') {
        query = `${flag}${config.params}`;
      } else {
        query = `${flag}${objectToQueryString(config.params)}`;
      }
    }
    uni.request({
      url: `${config.url?.startsWith('http') ? '' : config.baseURL}${config.url}${query}`,
      method: (config.method || 'GET').toUpperCase() as any,
      header: config.headers,
      timeout: config.timeout || 60000,
      withCredentials: config.withCredentials,
      data: config.data,
      success(result) {
        // 构造axios响应体
        const axiosResponse = {
          status: result.statusCode,
          config,
          data: result.data,
          headers: result.header,
        };
        // 判断请求是否200
        if (result.statusCode >= 200 && result.statusCode <= 299) {
          resolve({
            ...axiosResponse,
            statusText: 'ok',
          });
        } else {
          reject(
            new AxiosError(
              `${result.statusCode}`,
              `${result.statusCode}`,
              config,
              null,
              {
                ...axiosResponse,
                statusText: 'fail',
              }
            )
          );
        }
      },
      fail(result) {
        reject(new AxiosError(result.errMsg));
      },
    });
  });
};
