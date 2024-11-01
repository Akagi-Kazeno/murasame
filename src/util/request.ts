import type { AxiosError, AxiosPromise, AxiosRequestHeaders } from 'axios';
import axios from 'axios';
import { UniAxiosAdapter } from '@/util/uniAxios';
import envConfig from '@/config/envConfig';
import { get } from '@/util/db';

export interface IResponse<T> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}

export type Response<T = any> = AxiosPromise<IResponse<T>>;

export type ResponseError<T = any> = AxiosError<IResponse<T>>;

export const ToastErrorHandler = (error: ResponseError) => {
  if (error.isAxiosError) {
    uni.hideLoading();
    uni
      .showToast({
        title: error.response?.data.message || '服务器走丢啦，请稍后再试',
        icon: 'none',
        duration: 2000,
      })
      .then(r => {});
    console.error('请求错误', error.response?.data);
  }
};

export const ModalErrorHandler = (
  error: ResponseError,
  onOk: () => void = () => {}
) => {
  if (error.isAxiosError) {
    uni.hideLoading();
    uni.showModal({
      title: '抱歉',
      content: error.response?.data.message || '服务器走丢啦，请稍后再试',
      showCancel: false,
      success(result) {
        if (result.confirm) {
          onOk();
        }
      },
    });
    console.error('请求错误', error.response?.data);
  }
};

const UniAxios = axios.create({
  adapter: UniAxiosAdapter,
});

UniAxios.interceptors.request.use(async config => {
  config.baseURL = envConfig.baseUrl;
  config.params = {
    ...(config.params || {}),
    // app version
    _version: get('systemInfo', true)?.appVersion || 'unknown',
    // app name
    _from: 'murasame',
    // tenant id
    _tenant: get('tenantId', true) || '',
  };
  try {
    config.params._region = get('_Region', true) || 'CN';
    config.headers = {
      ...(config.headers || {}),
      Authorization: get('accessToken', true) || '',
    } as AxiosRequestHeaders;
  } catch (e) {
    console.error(e);
  }
  return config;
});

UniAxios.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    if (error.isAxiosError) {
      if (error.response?.status === 401) {
      } else if (error.response?.status === 400) {
      } else if (error.response?.status && error.response?.status >= 500) {
      }
    }
    return Promise.reject(error);
  }
);

export const Request = UniAxios;
