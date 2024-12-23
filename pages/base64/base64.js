Page({
  data: {
    input: '',
    result: ''
  },

  onInput(e) {
    this.setData({
      input: e.detail.value
    });
  },

  // Base64 编码表
  base64Chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

  // 编码函数
  base64Encode(str) {
    let output = '';
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;

    // 首先进行 UTF-8 编码
    str = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function (match, p1) {
        return String.fromCharCode('0x' + p1);
      });

    while (i < str.length) {
      chr1 = str.charCodeAt(i++);
      chr2 = str.charCodeAt(i++);
      chr3 = str.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output +
        this.base64Chars.charAt(enc1) +
        this.base64Chars.charAt(enc2) +
        this.base64Chars.charAt(enc3) +
        this.base64Chars.charAt(enc4);
    }

    return output;
  },

  // 解码函数
  base64Decode(str) {
    let output = '';
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;

    // 移除非 base64 字符
    str = str.replace(/[^A-Za-z0-9\+\/\=]/g, '');

    while (i < str.length) {
      enc1 = this.base64Chars.indexOf(str.charAt(i++));
      enc2 = this.base64Chars.indexOf(str.charAt(i++));
      enc3 = this.base64Chars.indexOf(str.charAt(i++));
      enc4 = this.base64Chars.indexOf(str.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    }

    // UTF-8 解码
    try {
      output = decodeURIComponent(escape(output));
    } catch (e) {
      throw new Error('Invalid Base64 input');
    }

    return output;
  },

  onEncode() {
    try {
      const encoded = this.base64Encode(this.data.input);
      this.setData({
        result: encoded
      });
    } catch (error) {
      wx.showToast({
        title: '编码失败',
        icon: 'none'
      });
    }
  },

  onDecode() {
    try {
      const decoded = this.base64Decode(this.data.input);
      this.setData({
        result: decoded
      });
    } catch (error) {
      wx.showToast({
        title: '解码失败',
        icon: 'none'
      });
    }
  },

  copyInput() {
    wx.setClipboardData({
      data: this.data.input,
      success: () => {
        wx.showToast({
          title: '已复制',
          icon: 'success'
        });
      }
    });
  },

  copyResult() {
    wx.setClipboardData({
      data: this.data.result,
      success: () => {
        wx.showToast({
          title: '已复制',
          icon: 'success'
        });
      }
    });
  },

  clearInputs() {
    this.setData({
      input: '',
      result: ''
    });
  }
});