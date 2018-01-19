// pages/setTime/setTime.js
const app = getApp()
const api = require('../../utils/api.js')
const http = require('../../utils/http.js') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // startDate:"",
    // endDate:"永不",
    // time:"",
    // frequency:"永不",
    // frequencyList:['永不',"每天","每周","每月","每年"],

    startTime1:"00:00",
    startTime2: "00:00",
    startTime3: "00:00",
    endTime1: "00:00",
    endTime2: "00:00",
    endTime3: "00:00",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var myDate = new Date();
    // var year = this.changeNum(myDate.getFullYear()) 
    // var month = this.changeNum(myDate.getMonth() + 1) 
    // var day = this.changeNum(myDate.getDate()) 
    // var hour = this.changeNum(myDate.getHours()) 
    // var min = this.changeNum(myDate.getMinutes()) 
    // this.setData({
    //   startDate: year + "-" + month + "-" + day,
    //   time: hour + ":" + min
    // })

    wx.setNavigationBarTitle({
      title: options.name,
    })

    // 获取定时时间段
    this.getEffectiveTime();


  },


  /**
   * 获取有效时间段
   */
  getEffectiveTime:function(){
    var params = {
      mac: api.mac,
      evalue: app.Encrypt()
    }
    console.log("获取有效时间段参数")
    console.log(params)
    http.POST(
      api.getTime,
      params,
      {
        success:(res=>{
          console.log(res.data.replace(/<[^>]+>/g, "").replace(/[\r\n]/g, ""))
          var result = JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[\r\n]/g, ""))
          console.log(result)
          // 有效时间数组
          var timeArray = result.data
          // 有效时间数组个数
          var count = parseInt(result.EffectiveTimesCount) 

          var end1 = "00:00"
          var start1 = "00:00"
          var end2 = "00:00"
          var start2 = "00:00"
          var end3 = "00:00"
          var start3 = "00:00"

          switch (count){
            case 8:
            case 7:
            case 6:
            case 5:
            case 4:
            case 3:{
              console.log('3')
              var time3 = timeArray[2]
               end3 = this.insertString(2, ":", time3.substring(0, 4))
               start3 = this.insertString(2, ":", time3.substring(4, 4))
            }
            case 2:{
              console.log('2')
              var time2 = timeArray[1]
              end2 = this.insertString(2, ":", time2.substring(0, 4))
              start2 = this.insertString(2, ":", time2.substring(4)) 
            }
            case 1: {
              console.log('1')
              var time1 = timeArray[0]
              end1 = this.insertString(2, ":", time1.substring(0, 4))
              start1 = this.insertString(2, ":", time1.substring(4))
          
            }
            default:
              break;
          }

          this.setData({
            startTime1: start1,
            endTime1:end1,
            startTime2: start2,
            endTime2: end2,
            startTime3: start3,
            endTime3: end3,

          })

          


        }),
        fail:(res=>{})
      }
    )
  },

  /**
   * 设置有效时间段
   */
  setEffectiveTime: function (){
    var first = (this.data.endTime1 + this.data.startTime1).replace(/:/g, "")
    var second = (this.data.endTime2 + this.data.startTime2).replace(/:/g, "")
    var third = (this.data.endTime3 + this.data.startTime3).replace(/:/g, "")
    
    var timesVal = first + "," + second + "," + third
    
    var params={
      mac: api.mac,
      evalue: app.Encrypt(),
      timesVal: timesVal
    }
    console.log("设置有效时间段参数")
    console.log(params)

    http.POST(
      api.setTime,
      params,
      {
        success: (res => {
          console.log(res.data)
        }),
        fail: (res => { })
      }
    )
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

  /**
   * 在字符串指定位置插入一个字符串
   * 三个参数
   * location：插入的位置
   * str:插入的字符串
   * target：在此字符串进行插入
   */
  insertString:function(location,str,target){
    return target.slice(0, location) + str + target.slice(location)
  }

  // bindFrequencyChange:function(e){
  //   this.setData({
  //     frequency: this.data.frequencyList[e.detail.value] 
  //   })
  // },


  // changeNum:function(num){
  //   return num<10?"0"+num:num;
  // }





})