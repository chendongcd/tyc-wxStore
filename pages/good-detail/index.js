// pages/good-detail/index.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
import fetch from '../../action/fetch.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    goodsDetail: {},
    swiperCurrent: 0,
    hasMoreSelect: false,
    selectSize: "选择：",
    selectSizePrice: 0,
    totalScoreToPay: 0,
    shopNum: 0,
    hideShopPopup: true,
    buyNumber: 0,
    buyNumMin: 1,
    buyNumMax: 0,

    propertyChildIds: "",
    propertyChildNames: "",
    canSubmit: false, //  选中规格尺寸时候是否允许加入购物车
    shopCarInfo: {},
    shopType: "addShopCar",//购物类型，加入购物车或立即购买，默认为加入购物车
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let that = this;
    fetch.request('GET','product/details/v1.1',{productId:e.id})
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/detail',
      data: {
        id: 4517
      },
      success: function (res) {
        console.log(res)
        var selectSizeTemp = "";
        if (res.data.data.properties) {
          for (var i = 0; i < res.data.data.properties.length; i++) {
            selectSizeTemp = selectSizeTemp + " " + res.data.data.properties[i].name;
          }
          that.setData({
            hasMoreSelect: true,
            selectSize: that.data.selectSize + selectSizeTemp,
            selectSizePrice: res.data.data.basicInfo.minPrice,
            totalScoreToPay: res.data.data.basicInfo.minScore
          });
        }
        that.data.goodsDetail = res.data.data;
        if (res.data.data.basicInfo.videoId) {
          that.getVideoSrc(res.data.data.basicInfo.videoId);
        }
        that.setData({
          goodsDetail: res.data.data,
          selectSizePrice: res.data.data.basicInfo.minPrice,
          totalScoreToPay: res.data.data.basicInfo.minScore,
          buyNumMax: res.data.data.basicInfo.stores,
          buyNumber: (res.data.data.basicInfo.stores > 0) ? 1 : 0
        });
        WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
      }
    })
  },
  //事件处理函数
  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  getVideoSrc: function (videoId) {
    let that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/media/video/detail',
      data: {
        videoId: videoId
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            videoMp4Src: res.data.data.fdMp4
          });
        }
      }
    })
  },
  setGoodDetail:function(res){
    let that = this
    if(res.code=='200'){
      that.setData({goodDetail:res.entity})
    }
  }
})