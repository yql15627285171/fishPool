// pages/setTime/setTime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate:"",
    endDate:"永不",
    time:"",
    frequency:"永不",
    frequencyList:['永不',"每天","每周","每月","每年"],

    startTime1:"0:00",
    startTime2: "08:00",
    startTime3: "16:00",
    endTime1: "08:00",
    endTime2: "16:00",
    endTime3: "23:59",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myDate = new Date();
    var year = this.changeNum(myDate.getFullYear()) 
    var month = this.changeNum(myDate.getMonth() + 1) 
    var day = this.changeNum(myDate.getDate()) 
    var hour = this.changeNum(myDate.getHours()) 
    var min = this.changeNum(myDate.getMinutes()) 
    this.setData({
      startDate: year + "-" + month + "-" + day,
      time: hour + ":" + min
    })

    wx.setNavigationBarTitle({
      title: options.name,
    })



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

  bindStartDateChange:function(e){
    this.setData({
      startDate:e.detail.value
    })
  },

  bindEndDateChange:function(e){
    this.setData({
      endDate:e.detail.value
    })
  },

  bindTimeChange:function(e){
    var type = e.currentTarget.dataset.type
    var vue = e.detail.value
    if(type=="s1"){
      this.setData({
        startTime1: vue
      })
    } else if (type == "s2"){
      this.setData({
        startTime2: vue
      })
    } else if (type == "s3"){
      this.setData({
        startTime3: vue
      })
    } else if (type == "e1"){
      this.setData({
        endTime1: vue
      })
    } else if (type == "e2"){
      this.setData({
        endTime2: vue
      })
    }else{
      this.setData({
        endTime3: vue
      })
    }
    
  },

  bindFrequencyChange:function(e){
    this.setData({
      frequency: this.data.frequencyList[e.detail.value] 
    })
  },


  changeNum:function(num){
    return num<10?"0"+num:num;
  }





})