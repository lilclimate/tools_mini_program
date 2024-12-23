Page({
  data: {
    input: '',
    result: ''
  },

  onInput: function(e) {
    this.setData({
      input: e.detail.value
    });
  },

  onEncode: function() {
    const encoded = wx.base64.encode(this.data.input);
    this.setData({
      result: encoded
    });
  },

  onDecode: function() {
    const decoded = wx.base64.decode(this.data.input);
    this.setData({
      result: decoded
    });
  }
}); 