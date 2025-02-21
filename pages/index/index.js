Page({
  data: {
    motto: '欢迎来到我的小程序',
    userInfo: {},
    hasUserInfo: false
  },
  onLoad() {
    
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goToShop() {
    wx.navigateTo({
      url: '/packages/shop/pages/shop/shop'
    });
  },
  
  goToMonitor() {
    wx.navigateTo({
      url: '/packages/monitor/pages/crowdMonitor/crowdMonitor'
    });
  }
}) 