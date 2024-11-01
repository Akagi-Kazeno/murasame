/**
 * @description: 用户类型定义
 */
declare namespace UserType {
  // 用户信息
  export interface UserInfo {
    openId: string;
    token: string;
    refreshToken: string;
    expiresTime: number;
  }
}
