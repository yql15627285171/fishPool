// pages/chartControl/chartControl.js
var wxCharts = require('../../libs/wxcharts-min.js');
var lineChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasWidth:0,
    firstClockUrl:'../../image/clock_close.png',
    secondClockUrl: '../../image/clock_close.png',
    modelList:["手动","定时"],
    firstModel:"手动",
    secondModel:"手动",
    firstSwitchDisabled:false,
    secondSwitchDisabled:false,

  },

  touchHandler: function (e) {
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return ' ' + item.name + ':' + item.data
      }
    });
  }, 

  setTime:function(e){
    var equip = e.target.dataset.equip
  
    if(equip == "first"){
      if (this.data.firstModel=="定时"){
          wx.navigateTo({
            url: '../setTime/setTime?name=增氧机一开机时间段',
          })
      }
    }

    else {
      if (this.data.secondModel == "定时") {  
        wx.navigateTo({
          url: '../setTime/setTime?name=增氧机二开机时间段',
        })
      }
    }
  },
  changeModel:function(e){
    var that = this
    var equip = e.target.dataset.equip
  
    wx.showActionSheet({
      itemList: this.data.modelList,
      success: function(res) {
        console.log(res.tapIndex);
        // 设备一
        if(equip == "first"){
            if(res.tapIndex == 0){
              // 手动
              that.setData({
                firstModel: that.data.modelList[res.tapIndex],
                firstSwitchDisabled:false,
                firstClockUrl:"../../image/clock_close.png"
              })
            } else if (res.tapIndex == 1){
              // 非手动(定时)
              that.setData({
                firstModel: that.data.modelList[res.tapIndex],
                firstSwitchDisabled:true,
                firstClockUrl: "../../image/clock_open.png"
              })
            }
            
        }else{
          // 设备二
          if (res.tapIndex == 0) {
            // 手动
            that.setData({
              secondModel: that.data.modelList[0],
              secondSwitchDisabled: false,
              secondClockUrl: "../../image/clock_close.png"
            })
          } else if (res.tapIndex == 1){
            // 非手动(定时)
            that.setData({
              secondModel: that.data.modelList[1],
              secondSwitchDisabled: true,
              secondClockUrl: "../../image/clock_open.png"
            })
            // console.log(that.data.secondModel)
          }
        }
      },

    })

    // console.log(this.data.secondModel)
  },

  setting:function(e){
    wx.navigateTo({
      url: '../operation/operation',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name,
    })

    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    this.setData({
      canvasWidth: windowWidth
    })
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: ["2","4","6","8","10","12","14","16","18","20","22","24"],
      animation: true,
      background:"#000000",
      series: [{
        name: '溶氧量',
        data: [15.66,14.32,16.70,17.1,18.80,18.80,18.80,17.1,17.2,16.67,16.67,16.60],
        format: function (val, name) {
          return val.toFixed(2) + 'mg/L';
        }
      }, {
        name: '温度',
        data: [25,25,26,27,27,27,28,28,27,26,25,24],
        format: function (val, name) {
          return val.toFixed(2) + '℃';
        }
      }],
      xAxis: {
        disableGrid: true,
        fontColor:"#336699",
      },
      yAxis: {
        title: '数值',
        fontColor:"#336699",
        titleFontColor:"#336699",
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
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