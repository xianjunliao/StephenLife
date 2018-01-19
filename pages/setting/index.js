Page({
  data: {
  },
  onLoad: function (options) {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        var signature = res.signature;
        getUser(signature, that);
      }
    })
  }
})

function getUser(signature, that) {
  wx.request({
    url: 'https://www.liaoxianjun.com/wx/user/getUserInfo',
    data: {
      signature: signature
    },
    header: {
      'content-type': 'application/json' // 默认值
    }, success: function (res) {
      that.setData({
        headImgUrl: res.data.data.avatarurl,
        nickName: res.data.data.nickname
      })
      getAddress(that);
    }
  })
}
function getAddress(that){
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      var location = res;
      console.log(location);
      wx.request({
        url: 'https://www.liaoxianjun.com/wx/user/getAddress',
        data: {
          latitude: location.latitude,
          longitude: location.longitude
        }, header: {
          'content-type': 'application/json' // 默认值
        }, success: function (res) {
          console.log(res);
          that.setData({
            address: res.data.data
          })
        }
      })
    }
  })

}