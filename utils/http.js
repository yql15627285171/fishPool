/**
 * 本文件是网络请求的统一封装
 */

/**
 * 所用接口统一的baseURL
 */
const baseURL = "https://www.stsidea.com/fishpond.asmx"

/**
 * 显示加载
 */
function startLoading(){
  wx.showLoading({
    title: '正在加载...',
    mask: true,
  })
}
/**
 * 隐藏加载
 */
function endLoading(){
  wx.hideLoading();
}

/**
 * 信息提示
 * 加载失败、上传成功等提示
 */
function showMsg(msg){
  wx.showModal({
    title: '提示',
    content: msg,
  })
}

/**
 * get请求与post请求
 * url:相对路径
 * params:参数
 * requestHandler：一个包含回调函数的对象
 */

function GET(url,params,requestHandler){
  request("GET", url, params, requestHandler)
}

function POST(url,params,requestHandler){

  request("POST", url, params,requestHandler)
}

function request(method, url, params, requestHandler) {
  /**
   * 这里可以对参数进行加密处理
   */



 /**
  * 重组完整的URL
  */
  var API_URL = baseURL + url
  
/**
 * 网络请求，这里可以显示loading
 */
  startLoading();


  wx.request({
    url: API_URL,
    data: params,
    method: method, 
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      //注意：可以对参数解密等处理
      requestHandler.success(res)
    },
    fail: (res=>{
      requestHandler.fail(res)
      showMsg("超时连接")
    }),
    complete: function () {
      /**
       * 结束loading
       */
      endLoading();
    }
  })
}

/**
 * 暴露外调接口
 */
module.exports = {
  GET: GET,
  POST: POST
}
