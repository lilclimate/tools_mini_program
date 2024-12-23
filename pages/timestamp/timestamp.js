import moment from './moment.js';

Page({
  data: {
    dateTime: '',
    timestamp: ''
  },

  onDateTimeInput(e) {
    this.setData({
      dateTime: e.detail.value
    });
  },

  onTimestampInput(e) {
    this.setData({
      timestamp: e.detail.value
    });
  },

  onDateTimeToTimestamp() {
    const dateTime = this.data.dateTime;
    if (!dateTime) {
      wx.showToast({
        title: '请输入日期时间',
        icon: 'none'
      });
      return;
    }

    try {
      const date = new Date(dateTime);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      const timestamp = Math.floor(date.getTime() / 1000);
      this.setData({
        timestamp: timestamp.toString()
      });
    } catch (error) {
      wx.showToast({
        title: '日期格式无效',
        icon: 'none'
      });
    }
  },

  onTimestampToDateTime() {
    let timestamp = this.data.timestamp;
    if (!timestamp) {
      wx.showToast({
        title: '请输入时间戳',
        icon: 'none'
      });
      return;
    }

    try {
      timestamp = parseInt(timestamp, 10);
      if (isNaN(timestamp)) {
        throw new Error('Invalid timestamp');
      }
      
      // Convert to milliseconds if in seconds
      const timestampMs = timestamp.toString().length <= 10 ? timestamp * 1000 : timestamp;
      const date = new Date(timestampMs);
      
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
      this.setData({
        dateTime: formattedDate
      });
    } catch (error) {
      wx.showToast({
        title: '时间戳格式无效',
        icon: 'none'
      });
    }
  },

  copyDateTime() {
    wx.setClipboardData({
      data: this.data.dateTime,
      success: () => {
        wx.showToast({
          title: '已复制',
          icon: 'success'
        });
      }
    });
  },

  copyTimestamp() {
    wx.setClipboardData({
      data: this.data.timestamp,
      success: () => {
        wx.showToast({
          title: '已复制',
          icon: 'success'
        });
      }
    });
  }
});