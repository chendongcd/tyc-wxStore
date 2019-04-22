//index.js
//获取应用实例
import {fetch} from '../../action/fetch.js'
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false, // loading
    userInfo: {},
    swiperCurrent: 0,
    selectCurrent: 0,
    categories: [],
    activeCategoryId: 0,
    goods: [],
    scrollTop: "0",
    loadingMoreHidden: true,

    hasNoCoupons: true,
    coupons: [],
    searchInput: '',
  },

  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
    this.getGoodsList(this.data.activeCategoryId);
  },
  //事件处理函数
  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/good-detail/index?id=" + e.currentTarget.dataset.id
    })
  },
  tapBanner: function (e) {
    if (e.currentTarget.dataset.id != 0) {
      wx.navigateTo({
        url: "/pages/good-detail/index?id=" + e.currentTarget.dataset.id
      })
    }
  },
  bindTypeTap: function (e) {
    this.setData({
      selectCurrent: e.index
    })
  },
  scroll: function (e) {
    var that = this, scrollTop = that.data.scrollTop;
    that.setData({
      scrollTop: e.detail.scrollTop
    })
    // console.log('e.detail.scrollTop:'+e.detail.scrollTop) ;
    // console.log('scrollTop:'+scrollTop)
  },
  onLoad: function () {
    var that = this
    //获取首页banner
    fetch('GET', 'product/banners/v1.1', null, that.setBanner)
    //获取通知
    that.getNotice();
    //得到首页商品信息
    that.getHomeProduct();
  },
  setBanner: function (res) {
    let that = this
    if (res.data.code == 404) {
      wx.showModal({
        title: '提示',
        content: '请在后台添加 banner 轮播图片',
        showCancel: false
      })
    } else {
      that.setData({
        banners: res.data.entity
      });
    }
  },

  setNotice: function (res) {
    let that = this
    //先moke
    that.setData({
      noticeList: [
        { 
          id: 1, 
          title: "测试公告" 
        }, { 
          id: 2, 
          title: "测试公告2" 
        }]
    });
    // if (res.data.code == 0) {
    //   console.log(res.data.data)
    //   that.setData({
    //     noticeList: res.data.data
    //   });
    // }
  },

  onShareAppMessage: function () {
    return {
      title: wx.getStorageSync('mallName') + '——' + app.globalData.shareProfile,
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  //获取首页商品信息
  getHomeProduct:function(){
    let that = this

    //设置翻页信息
    //TODO 翻页
    let params = {
      page:1,
      pageSize:20
    }

    fetch('GET', 'product/home/v1.1', params, that.setHomeProduct)
  },
  //设置首页商品信息
  setHomeProduct: function (res) {
    let that = this
    that.setData({
      goods: [],
      loadingMoreHidden: true
    });
    var goods = [];
    if (res.data.code != '200' || res.data.entity.length == 0) {
      that.setData({
        loadingMoreHidden: false,
      });
      return;
    }
    for (var i = 0; i < res.data.entity.length; i++) {
      goods.push(res.data.entity[i]);
    }
    that.setData({
      goods: goods,
    });
  },

  getNotice: function () {
    var that = this;
    fetch('GET', '/notice/list', { pageSize: 5 }, that.setNotice)
  },
  listenerSearchInput: function (e) {
    this.setData({
      searchInput: e.detail.value
    })

  },

  //跳转到商品列表页，并携带搜索条件
  toSearch: function (e) {
    let searchInput = this.data.searchInput
    wx.navigateTo({
      url: "/pages/search/index?foundKeyWord="+searchInput,
    })
  }
})
