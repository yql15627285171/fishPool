// pages/chartControl/chartControl.js
var wxCharts = require('../../libs/wxcharts-min.js');
var lineChart = null;
const app = getApp()
const api = require('../../utils/api.js')
const http = require('../../utils/http.js') 
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
    firstChecked:false,
    secondChecked:false,
    firstSwitchDisabled:false,
    secondSwitchDisabled:false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 导航标题
     */
    wx.setNavigationBarTitle({
      title: options.name,
    })

    /**
     * 获取屏幕宽度
     */
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

    /**
     * 设置图表
     */
    this.setChart();

    /**
     * 获取继电器状态
     */
    this.getRelayStatus();
  },

  /**
   * 设置图表
   */
  setChart:function(){
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: ["2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24"],
      animation: true,
      background: "#000000",
      series: [{
        name: '溶氧量',
        data: [15.66, 14.32, 16.70, 17.1, 18.80, 18.80, 18.80, 17.1, 17.2, 16.67, 16.67, 16.60],
        format: function (val, name) {
          return val.toFixed(2) + 'mg/L';
        }
      }, {
        name: '温度',
        data: [25, 25, 26, 27, 27, 27, 28, 28, 27, 26, 25, 24],
        format: function (val, name) {
          return val.toFixed(2) + '℃';
        }
      }],
      xAxis: {
        disableGrid: true,
        fontColor: "#336699",
      },
      yAxis: {
        title: '数值',
        fontColor: "#336699",
        titleFontColor: "#336699",
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: this.data.canvasWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },

/**
 * 点击图标现实的信息
 */
  touchHandler: function (e) {
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return ' ' + item.name + ':' + item.data
      }
    });
  }, 

/**
 * 跳转到设置设置定时界面
 */
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

  /**
   * 设置模式
   */
  changeModel:function(e){
    var that = this
    var equip = e.target.dataset.equip
  
    wx.showActionSheet({
      itemList: this.data.modelList,
      success: function(res) {
        // console.log(res.tapIndex);
        // 设备一
        if(equip == "first"){
          if (res.tapIndex == 0 && that.data.firstModel !="手动"){
              // 手动
              that.setRelayModel('1',{
                success:function(status){
                  that.setData({
                    firstModel: that.data.modelList[res.tapIndex],
                    firstSwitchDisabled: false,
                    firstClockUrl: "../../image/clock_close.png",
                    firstChecked: status
                  })
                }
              })
              
          } else if (res.tapIndex == 1 && that.data.firstModel != "定时"){
              // 非手动(定时)
              that.setRelayModel('0',{
                success:function(status){
                  that.setData({
                    firstModel: that.data.modelList[res.tapIndex],
                    firstSwitchDisabled: true,
                    firstClockUrl: "../../image/clock_open.png",
                    firstChecked: status
                  })
                }
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

  /**
   * 跳转到操作设置界面
   */
  setting:function(e){
    wx.navigateTo({
      url: '../operation/operation',
    })
  },

  /**
   * switch的值发生变化
   * 网络请求，控制继电器
   */
  switchChange:function(e){
    console.log(e.target.dataset.equip)
    var equip = e.target.dataset.equip
    if(equip == 'first'){
      // 如果为真，则合闸
      if(e.detail.value){
        this.setRelaySwitch('0')
      }else{
        // 手动拉闸
        this.setRelaySwitch('1')
      }
    }
  },

  /**
   * 获取继电器的开关状态与模式设定
   */
  getRelayStatus:function(){
    var that= this
    var params = {
      mac: api.mac,
      evalue: app.Encrypt()
    }
    http.POST(
      api.status,
      params,
      {
        success:function(res){
          var result = JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[\r\n]/g, "")) 
          console.log(result)
          if (result.status=="成功"){

            // 判断模式
            if (result.CtrlStatus == '0'){
              that.setData({
                firstModel:'定时',
                firstSwitchDisabled:true,
                firstClockUrl: "../../image/clock_open.png"
              })
            }else{
              that.setData({
                firstModel: '手动',
                firstSwitchDisabled:false,
                firstClockUrl: "../../image/clock_close.png"
              })
            }

            // 判断拉合闸
            if (result.SwichSatus == '0'){
              // 合闸
              that.setData({
                firstChecked:true
              })
            }else{
              // 拉闸
              that.setData({
                firstChecked: false
              })
            }

          }

        },
        fail:function(res){

        }
      }
    )
  },

  /**
   * 设置继电器的开关
   * ctrlType:0 手动合闸
   *          1 手动拉闸
   */
  setRelaySwitch: function (swichStatus){
    var params = {
      mac: api.mac,
      evalue: app.Encrypt(),
      swichStatus: swichStatus 
    }

    http.POST(
      api.control,
      params,
      {
        success:(res=>{
          var result = JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[\r\n]/g, "")) 
          console.log(result);
        }),
        fail:(res=>{
          if (swichStatus == "0"){
            // 合闸失败,还是处于拉闸状态
            this.firstChecked = false;
          }else{
            // 拉闸失败，还是处于合闸状态
            this.firstChecked = true;
          }
        })
      }
    )
  },

/**
 * 设置继电器的模式
 * ctrlType  1表示手动模式
 *           0表示自动模式
 */
  setRelayModel: function (ctrlType,handle){
    var params = {
      mac: api.mac,
      evalue: app.Encrypt(),
      ctrlType: ctrlType
    }
    console.log("设置模式参数")
    console.log(params)
    http.POST(
      api.model,
      params,
      {
        success: (res => {
          
          var result = JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[\r\n]/g, "")) 
          console.log(result)
            var status 
          if(result.status == "成功"){
            if (result.SwichSatus =="1"){
              // 处于拉闸状态
              status = false;
            }else{
              status = true;
            }
            handle.success(status)
          }
          
        }),
        fail: (res => { })
      }
    )
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