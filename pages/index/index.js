var msgs = '';
var value=null;
Page({
  data: {
    focus: true,
    vlaue: ''
  },
  onLoad:function(){

  },
  inputCode: function (e) {
  value = e.detail.value
  this.setData({
    msg: ''
  })

  },
  inputBut:function(){
    var that=this
    if(value==null||value==''){
      that.setData({
        msg:'can not null'
      })
      return ;
    }
    wx.request({
      url: 'http://www.liaoxianjun.com/enterCode',
      data: {
        code: value
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.userCode != null) {
          wx.navigateTo({
            url: '../main/main?userCode=' + res.data.userCode,
            success: function (res) {
              console.log(res);
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          that.setData({
            msg: 'not exist'
          })
        }
      }, fail: function (res) {

      }
    })
  }
})