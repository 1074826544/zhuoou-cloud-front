module.exports = {
  appId: 'zhuooucloud',
  name: 'zhuooucloud',
  copyText: 'Copyright©2020 ',
  sysTitle: 'zhuooucloud 管理平台',
  logintype: '1',
  authPre: 'Bearer ',
  logo: '',
  iconFontUrl: '',
  whiteList: ['/login', '/reset'],
  apiPrefix: '/api',
  devHost: 'http://192.168.10.7:9001',
  pubHost: 'http://192.168.10.7:9001',
  captchaEnable: true,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  api: {
    userLogin: '/auth/auth',
    userLogout: '/auth/logout',
    captcha: '/sys/captcha/captcha?',
    isLogined: '/auth/isLogined',
    dict: '/sys/sysDict/getDictListByCode?code=',
    dictMapList: '/sys/sysDict/getDictMapListByCodes?codes='
  }
}
