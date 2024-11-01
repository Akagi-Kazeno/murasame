/**
 * @description: 环境信息
 */
declare namespace EnvInfo {
  // 系统信息
  export interface SystemInfo {
    deviceId: string;
    deviceModel: string;
    deviceType: string;
    platform: string;
    system: string;
    version: string;
    uniPlatform: string;
    appVersion: string;
  }

  // app信息
  export interface AppInfo {
    appIcon: string;
    appId: string;
    appIntro: string;
    appName: string;
  }

  // app运行环境
  export interface AppEnvInfo {
    appId: string;
    envType: string;
    mpVersion: string;
  }
}
