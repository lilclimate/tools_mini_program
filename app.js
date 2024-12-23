App({
  onLaunch: function () {
    // 小程序启动时执行的逻辑
    console.log('小程序启动');
  },

  onShow: function () {
    // 小程序从后台进入前台时执行的逻辑
    console.log('小程序显示');
  },

  onHide: function () {
    // 小程序从前台进入后台时执行的逻辑
    console.log('小程序隐藏');
  },

  globalData: {
    // 全局数据
    userInfo: null
  }
}); 