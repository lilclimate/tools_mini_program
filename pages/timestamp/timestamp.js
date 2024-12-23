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

    const m = moment(dateTime, 'YYYY/MM/DD HH:mm:ss');
    if (!m.isValid()) {
      wx.showToast({
        title: '日期格式无效',
        icon: 'none'
      });
      return;
    }

    const timestamp = m.unix();
    this.setData({
      timestamp: timestamp.toString()
    });
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
      
      // 如果是毫秒级时间戳，转换为秒级
      if (timestamp.toString().length > 10) {
        timestamp = Math.floor(timestamp / 1000);
      }

      const m = moment.unix(timestamp);
      if (!m.isValid()) {
        throw new Error('Invalid date');
      }

      const formattedDate = m.format('YYYY/MM/DD HH:mm:ss');
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