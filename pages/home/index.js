var msgs = '';
var signature;
var wxUserInfo = {};
var scene;
var appInstance = getApp();
Page({
  data: {

  },
 onLoad: function (options) {
   console.log("[onLoad] 场景值:", scene)
    wx.getUserInfo({
      success: function (res) {
        var user = res;
        user['scene']=scene;
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            var location = res;
            getUser(user, location);
          }
        })
      }
    })
  },
})
App({
  onLaunch: function (options) {
   scene=options.scene;
  },
  onShow: function (options) {
 
  }
})
function getUser(user,location) {
  wx.request({
    url: 'https://www.liaoxianjun.com/wx/user/getUserInfo',
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
    url: 'https://www.liaoxianjun.com/wx/login/save',
    data: {
      signature: user.signature,
      nickname: userInfo.nickName,
      avatarurl: userInfo.avatarUrl,
      loginaddress: location.longitude + ',' + location.latitude,
      brand: system.brand,
      model: system.model,
      version: system.version,
      language: system.language,
      system: system.system,
      scene: user.scene
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {

    }, fail: function (res) {

    }
  })
}
function saveUser(res) {
  var userInfo = res.userInfo;
  wx.request({
    url: 'https://www.liaoxianjun.com/wx/user/save',
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
