var msgs = '';
Page({
  data: {
    focus: true
  },
  onLoad: function () {

  },
  inputBut: function (e) {
    var that = this
    var value = e.detail.value
    if (value == null || value == '') {
      that.setData({
        msg: '输入的编码不能为空'
      })
      return;
    }
    wx.request({
      url: 'http://www.liaoxianjun.com/add',
      data: {
        code: value
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == "200") {
          wx.navigateTo({
            url: '../main/main',
            success: function (res) {
              console.log(res);
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        } 
        if (res.data.code == "202") {
          wx.navigateTo({
            url: '../index/error',
            success: function (res) {
              console.log(res);
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        } 
        else {
          that.setData({
            msg: '输入的编码不存在'
          })
          value="";
        }
      }, fail: function (res) {

      }
    })
  }
})