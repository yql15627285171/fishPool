//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },

onLoad: function () {
 
},

login:function(){
  // 判断是否第一次登录，若是
  wx.switchTab({
    // url: '../firstSetting/firstSetting',
    url: '../eList/eList',
  })
// 若否
//  wx.redirectTo({
//    url: '../eList/eList',
//  })
}


})
