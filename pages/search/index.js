// pages/search/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.deviceInfo.windowHeight+'px',
    activeType:'type0',
    history:['vans','Lee','美特斯邦威','森马','真维斯'],
    hot: ['vans', 'Lee', '美特斯邦威', '森马', '真维斯'],
    searchTxt:'',
    type:2,
    hotShow:true,
    itemList:[{description:'very nice',retailPrice:'100',sellNum:'50'},
      { description: 'very nice', retailPrice: '100', sellNum: '50' },
      { description: 'very nice', retailPrice: '100', sellNum: '50' },
      { description: 'very nice', retailPrice: '100', sellNum: '50' },
      { description: 'very nice', retailPrice: '100', sellNum: '50' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({searchTxt:options.content})
  },
  tabType:function(e){
    this.setData({ activeType: e.target.id})
  },
  goBack:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  inputTxt:function(e){
    this.setData({
      searchTxt: e.detail.value
    })
  },
  clearTxt:function(){
    this.setData({searchTxt:''})
  },
  clearHis:function(){
    this.setData({ history: [] })
  },
  hotControl:function(){
    let hot = this.data.hotShow
    this.setData({ hotShow: !hot })
  }

})