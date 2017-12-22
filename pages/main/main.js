var next=1;
var size=0;
Page({
  onReady: function (e) {
    var that = this
    wx.request({
      url: 'https://www.liaoxianjun.com/getAll',
      success:function(res){
          console.log(res.data);
          console.log(res.data.length);
          size= res.data.length;
          that.setData({
            array: res.data,
          })
      }
    }),
    // 使用 wx.createAudioContext 获取 audio 上下文 context
      this.audioCtx = wx.createAudioContext('myAudio' + next);
    this.audioCtx.play();
    next=1;
  },
  audioPlay: function () {
    var a = next - 1;
    wx.createAudioContext('myAudio' + a).play()
  },
  audioPause: function () {
    var a = next - 1;
    wx.createAudioContext('myAudio' + a).pause()
  },
  nextPlay: function () {
    console.log("11:"+size)
    if(next>size){
      return;
    }
    var a=next-1;
    console.log(a)
    wx.createAudioContext('myAudio' + a).seek(0)
    wx.createAudioContext('myAudio' + a).pause()
    console.log(next)
    wx.createAudioContext('myAudio' + next).play()
    next += 1;
    console.log(next)
  },
  lastPlay: function () {
    var a = next - 1;
    var b = next - 2;
    if (next > size) {
      b = size-1;
    }
    console.log("  ")
    console.log(a)
    wx.createAudioContext('myAudio' + a).seek(0)
    wx.createAudioContext('myAudio' + a).pause()
  
    console.log(b)
    wx.createAudioContext('myAudio' + b).play()
    next = b+1;
    console.log(next)
  },
})