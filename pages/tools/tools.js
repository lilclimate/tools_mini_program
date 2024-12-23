Page({
  data: {
    // 初始数据
  },

  onBase64Decode: function() {
    // 处理Base64编码解码的逻辑
    wx.navigateTo({
      url: '/pages/base64/base64',
    });
  },

  onTimestampConvert: function() {
    // 处理时间戳转化的逻辑
    wx.navigateTo({
      url: '/pages/timestamp/timestamp',
    });
  }
}); 