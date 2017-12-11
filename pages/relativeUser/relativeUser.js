// pages/relativeUser/relativeUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[
      {
        name:'张三',
        power:'使用者'
      },
      {
        name:'李四',
        power:'管理者'
      }
    ]
  },

  // 移除设备与关联用户的关系
  removeRelative:function(e){
    var index = parseInt(e.currentTarget.dataset.index)
    console.log(index)
    var temp = this.data.user
    temp.splice(index,1)
    wx.showActionSheet({
      itemList: ['解除绑定'],
      success: (res)=> {
        if(res.tapIndex == 0){
          this.setData({
            user: temp
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
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
  
  }
})