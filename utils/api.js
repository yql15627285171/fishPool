/**
 * 在这里我们可以设置各个接口的相对路径
 */

module.exports = {
  /**
   * 测试接口
   */
  test:"/HelloWorld",

  /**
   * mac地址的测试值
   */
  mac:'01010876',

  /**
   * 检测当前继电器的开关状态和控制方式
   * 两个参数
   * mac:继电器mac地址 
   * evalue:加密参数
   */
  status:"/GetSwichCtrlStatus",

  /**
   * 控制拉合闸
   * 三个参数
   * mac:继电器mac地址
   * evalue:加密参数
   * swichStatus  0 手动合闸
   *              1 手动拉闸 
   */
  control:"/CtrlSwichOnOROFF",


  /**
   * 设置模式
   * 三个参数
   * mac:继电器mac地址
   * evalue:加密参数
   * ctrlType:  1手动模式
   *            0定时模式
   */
  model:'/SwichCtrlType',

  /**
   * 获取当前继电器定时模式的定时时间段
   * 两个参数
   * mac:继电器mac地址
   * evalue:加密参数
   */
  getTime:"/GetTimesForSwichOn",

  /**
   * 设置当前继电器定时模式的定时时间段
   * 三个参数
   * mac:继电器mac地址
   * evalue:加密参数
   * timesVal：时间段的字符数组
   */
  setTime:"/SetTimeForSwichOn"
}