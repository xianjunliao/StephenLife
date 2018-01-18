var msgs = '';
var signature;
var wxUserInfo = {};
Page({
  data: {

  },
  onLoad: function () {
    var that = this;
    

    wx.getUserInfo({
      success: function (res) {
        var user=res;
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            var location = res;
            getUser(user, location);
          }
        })
      }
    })
  }
})
function getUser(user,location) {
  wx.request({
    url: 'http://www.liaoxianjun.com/wx/user/getUserInfo',
    data: {
      signature: user.signature
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (res.data.code == "200") {
        wx.getSystemInfo({
          success: function (res) {
            saveLogin(user, res,location);
          }
        })
      } else if (res.data.code == "404") {
        saveUser(user);
        wx.getSystemInfo({
          success: function (res) {
            saveLogin(user, res, location);
          }
        })
      } else {

      }
    }
  })
}
function saveLogin(user, system, location) {
  var userInfo = user.userInfo;
  wx.request({
    url: 'http://www.liaoxianjun.com/wx/login/save',
    data: {
      signature: user.signature,
      nickname: userInfo.nickName,
      avatarurl: userInfo.avatarUrl,
      loginaddress: location.latitude +','+location.longitude,
      brand: system.brand,
      model: system.model,
      version: system.version,
      language: system.language,
      system: system.system
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)
    }, fail: function (res) {

    }
  })
}
function saveUser(res) {
  var userInfo = res.userInfo;
  wx.request({
    url: 'http://www.liaoxianjun.com/wx/user/save',
    data: {
      signature: res.signature,
      nickname: userInfo.nickName,
      avatarurl: userInfo.avatarUrl,
      gender: userInfo.gender,
      province: userInfo.province,
      city: userInfo.city,
      country: userInfo.country
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
