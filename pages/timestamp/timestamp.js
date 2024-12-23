import moment from './moment.js';

Page({
  data: {
    dateTime: '',
    timestamp: ''
  },

  onDateTimeInput: function(e) {
    this.setData({
      dateTime: e.detail.value
    });
  },

  onTimestampInput: function(e) {
    this.setData({
      timestamp: e.detail.value
    });
  },

  onDateTimeToTimestamp: function() {
    const dateTime = this.data.dateTime;
    if (!moment(dateTime, 'YYYY-MM-DD HH:mm', true).isValid()) {
      wx.showToast({
        title: '请输入有效的日期时间',
        icon: 'none'
      });
      return;
    }
    const timestamp = moment(dateTime, 'YYYY-MM-DD HH:mm').valueOf();
    this.setData({
      timestamp: timestamp.toString()
    });
  },

  onTimestampToDateTime: function() {
    const timestamp = this.data.timestamp;
    const isMilliseconds = timestamp.length > 10;
    const timestampValue = isMilliseconds ? parseInt(timestamp, 10) : parseInt(timestamp, 10) * 1000;

    if (isNaN(timestampValue)) {
      wx.showToast({
        title: '请输入有效的时间戳',
        icon: 'none'
      });
      return;
    }

    const dateTime = moment(timestampValue).format('YYYY-MM-DD HH:mm');
    this.setData({
      dateTime: dateTime
    });
  },

  copyDateTime: function() {
    wx.setClipboardData({
      data: this.data.dateTime,
      success: function() {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        });
      }
    });
  },

  copyTimestamp: function() {
    wx.setClipboardData({
      data: this.data.timestamp,
      success: function() {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        });
      }
    });
  }
}); 