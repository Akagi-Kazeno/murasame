import { get } from '@/util/db';

/**
 * @description: 获取系统信息
 *
 * @return {EnvInfo.SystemInfo}
 */
export function getSystemInfo(): EnvInfo.SystemInfo {
  const cachePlatform = get('systemInfo', true);
  if (cachePlatform) {
    return cachePlatform;
  }
  const systemInfo = uni.getSystemInfoSync();
  const info = {
    deviceId: systemInfo.deviceId,
    deviceModel: systemInfo.model,
    deviceType: systemInfo.deviceType,
    platform: systemInfo.platform,
    system: systemInfo.osName,
    version: systemInfo.osVersion,
    uniPlatform: systemInfo.uniPlatform,
    appVersion: systemInfo.appVersionCode,
  };
  console.info('systemInfo', info);
  return info;
}

/**
 * @description: 获取小程序运行环境信息
 *
 * @return {EnvInfo.AppEnvInfo}
 */
export function getAppEnvInfo(): EnvInfo.AppEnvInfo {
  // 抖音小程序获取环境信息
  // const envInfo = uni.getEnvInfoSync();
  // const appEnvInfo = {
  //   appId: envInfo?.microapp?.appId || '',
  //   envType: envInfo?.microapp?.envType || '',
  //   mpVersion: envInfo?.microapp?.mpVersion || '',
  // };
  // 微信小程序获取环境信息
  const envInfo = uni.getAccountInfoSync();
  const appEnvInfo = {
    appId: envInfo?.miniProgram?.appId || '',
    envType: envInfo?.miniProgram?.envVersion || '',
    mpVersion: envInfo?.miniProgram?.version || '',
  };
  console.info('appEnvInfo', appEnvInfo);
  return appEnvInfo;
}

/**
 * @description: 拼接url
 *
 * @param params  参数
 * @param baseurl 基础url
 * @return {string}
 */
export function constructUrl(params: any, baseurl: string): string {
  let pathUrl = baseurl;
  let first = true;
  for (const key in params) {
    if (
      params[key] !== undefined &&
      params[key] !== null &&
      params[key] !== ''
    ) {
      if (first) {
        pathUrl += `?${key}=${params[key]}`;
        first = false;
      } else {
        pathUrl += `&${key}=${params[key]}`;
      }
    }
  }
  return pathUrl;
}

/**
 * @description: 验证手机号
 *
 * @param phone 手机号
 * @param containLandLine 是否包含座机
 * @return {boolean}
 */
export function validPhoneNumber(
  phone: string,
  containLandLine: boolean
): boolean {
  const reg: RegExp =
    /^(13[0-9]|14[0-9]|15[0-35-9]|16[25-7]|17[0-9]|18[0-9]|19[0-35-9])\d{8}$/;
  const LandLineReg: RegExp = /^(\d{2,4})-(\d{7,8})$/;
  if (!containLandLine) {
    return reg.test(phone);
  }
  return reg.test(phone) || LandLineReg.test(phone);
}

/**
 * @description: 计算相隔年限
 *
 * @param date 日期
 * @return {number}
 */
export function calYear(date: Date): number {
  return new Date().getFullYear() - date.getFullYear();
}

/**
 * @description: 计算相隔天数
 *
 * @param date 日期
 * @return {number}
 */
export function calDate(date: Date): number {
  const diff: number = new Date().getTime() - date.getTime();
  return Math.floor(diff / (24 * 3600 * 1000));
}

/**
 * @description: 限制按钮点击频率
 *
 * @param isClicking 是否处于点击事件中
 * @param timeout 超时时间
 */
export function handleButtonClick(isClicking: boolean, timeout: number) {
  if (isClicking) {
    return;
  }
  isClicking = true;
  setTimeout(() => {
    isClicking = false;
  }, timeout);
}

/**
 * @description: 格式化时间
 *
 * @param time  时间(timestamp|Date)
 */
export function formatTimestamp(time: number | Date): string {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * @description: 计算年龄
 *
 * @param bornYear 出生年份
 */
export function calculateAge(bornYear: string): string {
  const now = new Date();
  const year = now.getFullYear();
  const age = year - parseInt(bornYear);
  return age.toString();
}

/**
 * @description: 获取几天前的日期
 *
 * @param days  天数
 * @param months  月数
 * @param years 年数
 * @return {Date}
 */
export function getDateAgo(days = 0, months = 0, years = 0): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setMonth(date.getMonth() - months);
  date.setFullYear(date.getFullYear() - years);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @description: 转换请求参数
 *
 * @param params
 */
export function objectToQueryString(params: Record<string, any>): string {
  return Object.keys(params)
    .map(key => {
      const value = params[key];
      if (value === undefined || value === null) {
        return '';
      }
      if (Array.isArray(value)) {
        return value
          .map(
            arrayValue =>
              `${encodeURIComponent(key)}=${encodeURIComponent(arrayValue)}`
          )
          .join('&');
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(part => part.length > 0)
    .join('&');
}
