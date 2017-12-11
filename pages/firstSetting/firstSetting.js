// pages/firstSetting/firstSetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus2:false,
    focus3: false,
    focus4: false,
    focus5: false,
    name:'',
    phoneNum:'',
    psd:'',
    surePsd:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  getFocus:function(e){
    var index = e.currentTarget.dataset.index
    if(index == '2'){
      this.setData({
        focus2:true
      })
    }else if(index == '3'){
      this.setData({
        focus3: true
      })
    }else if(index == '4'){
      this.setData({
        focus4: true
      })
    }else if(index == '5'){
      this.setData({
        focus5: true
      })
    }
  },

  // 确认修改资料
  sureCheck:function(){

    // 判断填写资料不能为空
    if (this.data.name.length == 0 || this.data.phoneNum.length == 0 || this.data.psd.length == 0 || this.data.surePsd.length == 0){
      // 提示用户
    } else if (this.data.psd != this.data.surePsd){
      // 提示用户两次输入密码不相同
    }else{
      // 网络请求，请求成功后提示用户记住登录账号
    }

    wx.redirectTo({
      url: '../eList/eList'
    })
  }






})