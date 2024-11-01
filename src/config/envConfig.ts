const CONFIG = {
  //开发环境配置
  development: {
    // 静态资源路径
    assetsPath: '/static',
    // 基础请求路径
    baseUrl: 'https://example.com',
    // 登录标识
    tokenKey: 'WECHAT',
    // 小程序测试openId
    testOpenId: 'self testOpenId',
    // touristMode游客模式下APP是否强制用户登录 场景：当用户进入登录页面后无法后退。
    forcedLogin: false,
    // APP是否开启游客模式， 游客模式true开启：APP打开后可以进入首页和无权限的页面，游客模式false关闭：APP打开后首先需要登录才能进入， 此时forcedLogin配置项失效。
    touristMode: true,
    // appId
    appId: 'self appid',
  },
  //生产环境配置
  production: {
    // 静态资源路径
    assetsPath: '/static',
    // 基础请求路径
    baseUrl: 'https://example.com',
    // 登录标识
    tokenKey: 'WECHAT',
    // 小程序测试openId
    testOpenId: 'self testOpenId',
    // touristMode游客模式下APP是否强制用户登录 场景：当用户进入登录页面后无法后退。
    forcedLogin: false,
    // APP是否开启游客模式， 游客模式true开启：APP打开后可以进入首页和无权限的页面，游客模式false关闭：APP打开后首先需要登录才能进入， 此时forcedLogin配置项失效。
    touristMode: true,
    // appId
    appId: 'self appid',
  },
};
// export default CONFIG[process.env.NODE_ENV];
export default CONFIG[import.meta.env.DEV ? 'development' : 'production'];
