// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history_list : [],
    index : 0,
    item : '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.request()
  },

  /**
   * 发起请求
   */
  request(){
    const that = this
    wx.request({
      url: 'https://www.mxnzp.com/api/history/today',
      method : 'GET',
      header : {
        'app_id' : 'moehknojlpi9llvn',
        'app_secret' : 'aVBrU2pBSTJFY3c3aUZVMjZMbW1Wdz09',
      },
      data : {
        'type' : 1 //type：是否需要详情，0：不需要详情 1：需要详情 默认值 0 可不传
      },
      success (res) {
        that.data.history_list = res.data.data
        that.data.index = 0
        that.next()
      },
      fail (res) {
        console.log(JSON.stringify(res))
      }
    })
  },

  /**
   * 显示下一条新闻
   */
  next(){
    var array = this.data.history_list
    if(array.length == 0){
      return
    }
    var index = this.data.index
    if(index < 0 || index > array.length - 1){
      index = 0
    }
    this.data.index = index + 1
    this.setData({
      item : array[index]
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
    return {
      title : '历史上的今天'
    }
  },
  /**
   * 分享到朋友圈
   */
  onShareTimeline(){
    return {
      title : '历史上的今天'
    }
  },
})