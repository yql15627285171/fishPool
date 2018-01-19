/**
 * 选择用户管理设备功能
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[
      {
        name:'张三',
        value:'张三',
        checked:true
      },
      {
        name:'李四',
        value:'李四',
        checked: true
      },
      {
        name:'王五',
        value:'王五',
        checked:false
      }
    ]
  },

  // 移除设备与关联用户的关系
  // removeRelative:function(e){
  //   var index = parseInt(e.currentTarget.dataset.index)
  //   console.log(index)
  //   var temp = this.data.user
  //   temp.splice(index,1)
  //   wx.showActionSheet({
  //     itemList: ['解除绑定'],
  //     success: (res)=> {
  //       if(res.tapIndex == 0){
  //         this.setData({
  //           user: temp
  //         })
  //       }
  //     },
  //     fail: function(res) {},
  //     complete: function(res) {},
  //   })
  // },


  /**
   * 监听用户的改变
   */
  checkboxChange:function(event){
    console.log(event.detail)
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