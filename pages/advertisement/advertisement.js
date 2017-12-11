// pages/advertisement/advertisement.js
var timer=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    devHeight:0,
    devWidth:0,
    jumpTime:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // var res = wx.getSystemInfoSync()
    // that.setData({
    //   devWidth: res.screenWidth,
    //   devHeight:res.screenHeight
    // })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          devWidth: res.screenWidth,
          devHeight: res.windowHeight
        })
      }
    })

    // timer = setInterval(function(){
    //   that.setData({
    //     jumpTime: that.data.jumpTime - 1
    //   })
    //   if (that.data.jumpTime <= 0) {
    //     that.jump()
    //   }
    // },1000)
  },

  // jump:function(){
  //   clearInterval(timer)
  //   wx.redirectTo({
  //     url: '../eList/eList',
  //   })
  // }

  // 登录
  login:function(){
    // 用缓存中的账号密码登录

    // 缓存中没有密码或者登录失败，则跳转到登录界面重新登录
    wx.redirectTo({
      url: '../index/index'
    })
  },
})