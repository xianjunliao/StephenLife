var msgs = '';
Page({
  data: {
    focus: true
  },
  onLoad: function () {
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        console.log(res);
        var that = this
        wx.request({
          url: 'http://www.liaoxianjun.com/add',
          data: {
            code: nickName
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.code == "200") {
         
            }
            if (res.data.code == "202") {
          
            }
            else {
     
            }
          }, fail: function (res) {

          }
        })
      }
    })
  }
})