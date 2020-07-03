//index.js
var util = require('../../utils/util')
Page({
  data: {
    header_image_url : './images/ic_header.png',
    header_content : '',
    header_note : '',
    current_day : util.formatTime('dd', new Date()),
    lunar_calendar : '',
    lunar_des : '',
    lunar_detail : '',
    taboo_text_avoid : '',
    taboo_text_suit : '',
  },
  onLoad: function () {
    this.init()
    this.requestHeaderInfo()
    this.requestLunarInfo()
  },
  /**
   * 设置分享信息
   */
  onShareAppMessage:function(){
    return {
      title : '大黄历',
    }
  },
  /**
   * 初始化本地缓存
   */
  init(){
    // 每日一句
    var header_url = wx.getStorageSync('header_image_url')
    if(header_url){
      this.setData({
        header_image_url : header_url
      })
    }
    var content = wx.getStorageSync('header_content')
    if(content){
      this.setData({
        header_content : content
      })
    }
    var note = wx.getStorageSync('header_note')
    if(note){
      this.setData({
        header_note : note
      })
    }
    // 农历
    var lunarCalendar =wx.getStorageSync('lunarCalendar')
    if(lunarCalendar){
      this.setData({
        lunar_calendar : lunarCalendar
      })
    }
    var lunarDes =wx.getStorageSync('lunarDes')
    if(lunarDes){
      this.setData({
        lunar_des : lunarDes
      })
    }
    var lunarDetail =wx.getStorageSync('lunarDetail')
    if(lunarDetail){
      this.setData({
        lunar_detail : lunarDetail
      })
    }
    var avoid =wx.getStorageSync('avoid')
    if(avoid){
      this.setData({
        taboo_text_avoid : avoid
      })
    }
    var suit =wx.getStorageSync('suit')
    if(suit){
      this.setData({
        taboo_text_suit : suit
      })
    }
  },
  /**
   * 请求每日一句
   */
  requestHeaderInfo(){
    const that = this
    wx.request({
      url: 'https://open.iciba.com/dsapi/',
      method : 'GET',
      success (res) {
        var picture = res.data.picture2;
        var content = res.data.content
        var note = res.data.note;
        that.saveHeaderInfo(picture,content,note)
        that.setData({
          header_image_url : picture,
          header_content : content,
          header_note : note
        })
      },fail (res) {
        console.log('error : '+ JSON.stringify(res))
      },
    })
  },
  /**
   * 缓存每日一句
   * @param {*} picture 
   * @param {*} content 
   * @param {*} note 
   */
  saveHeaderInfo : function(picture,content,note){
    wx.setStorageSync('header_image_url', picture)
    wx.setStorageSync('header_content', content)
    wx.setStorageSync('header_note', note)
  },
  /**
   * 请求农历详情
   */
  requestLunarInfo(){
    const that = this
    var param = util.formatTime('yyyyMMdd', new Date())
    wx.request({
      url: 'https://www.mxnzp.com/api/holiday/single/' + param,
      method : 'GET',
      header : {
        'app_id' : 'moehknojlpi9llvn',
        'app_secret' : 'aVBrU2pBSTJFY3c3aUZVMjZMbW1Wdz09',
      },
      success (res) {
        that.saveLunarInfo(res.data.data)
        that.init()
      },
      fail (res) {
        console.log(JSON.stringify(res))
      },
    })
  },
  /**
   * 缓存农历详情
   * @param {*} data 
   */
  saveLunarInfo(data){
    var weekdaycn = util.weekdaycn(data.weekDay)
    var chineseZodiac = data.chineseZodiac
    var yearTips = data.yearTips
    var lunarCalendar = data.lunarCalendar
    var lunarDes = util.formatTime('yyyy年MM月dd日',new Date()) + ' ' + data.typeDes
    var solarTerms = data.solarTerms
    var avoid = data.avoid
    var suit = data.suit
    var dayOfYear = data.dayOfYear
    var weekOfYear = data.weekOfYear
    var lunarDetail = weekdaycn +' ' + yearTips + '[' + chineseZodiac + ']年' + ' ' + solarTerms + '\n ' + util.formatTime('yyyy', new Date()) + '年第' +dayOfYear + '天、第'+ weekOfYear +'周'
    //缓存本地
    wx.setStorageSync('lunarCalendar', lunarCalendar)
    wx.setStorageSync('lunarDes', lunarDes)
    wx.setStorageSync('lunarDetail', lunarDetail)
    wx.setStorageSync('avoid', avoid)
    wx.setStorageSync('suit', suit)
  },
})
