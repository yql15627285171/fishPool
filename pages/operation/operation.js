// pages/operation/operation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // setTime:function(e){
  //   console.log(e);
  //   wx.navigateTo({
  //     url: "../setTime/setTime?name="+e.target.dataset.name,
  //   })
  // }
  setPhone:function(e){
    wx.navigateTo({
      url: '../phoneSetting/phoneSetting',
    })
  },
  setOxygen:function(e){
    wx.navigateTo({
      url: '../oxygenSetting/oxygenSetting',
    })
  },
  
  setTime:function(e){
    console.log(e)
    var equip = e.currentTarget.dataset.equip

    if (equip == "first") {
      wx.navigateTo({
        url: '../setTime/setTime?name=增氧机一开机时间段',
      })
   
    }

    else {    
      wx.navigateTo({
        url: '../setTime/setTime?name=增氧机二开机时间段',
      })   
    }
  },

  setDeviceInfo:function(e){
    wx.navigateTo({
      url: '../deviceInfo/deviceInfo',
    })
  },

  // 跳转绑定关联界面
  toBingRelative:function(){
    wx.navigateTo({
      url: '../bangRelative/bangRelative?type=part',
    })
  },

  // 跳转到关联用户界面
  toRelativeUser:function(){
    wx.navigateTo({
      url: '../relativeUser/relativeUser'
    })
  }



})