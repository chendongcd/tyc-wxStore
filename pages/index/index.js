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
    fetch('GET', '/banner/list', {
      key: 'mallName'
    }, that.setBanner)
    //获取首页分类
    fetch('GET', '/shop/goods/category/all', '', that.setCategorie)
    //获取优惠
    that.getCoupons();
    //获取通知
    that.getNotice();
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
        banners: res.data.data
      });
    }
  },
  setCategorie: function (res) {
    let that = this
    var categories = [{ id: 0, name: "全部" }];
    if (res.data.code == 0) {
      for (var i = 0; i < res.data.data.length; i++) {
        categories.push(res.data.data[i]);
      }
    }
    that.setData({
      categories: categories,
      activeCategoryId: 0
    });
    that.getGoodsList(0);
  },
  setGoodsList: function (res) {
    let that = this
    that.setData({
      goods: [],
      loadingMoreHidden: true
    });
    var goods = [];
    if (res.data.code != 0 || res.data.data.length == 0) {
      that.setData({
        loadingMoreHidden: false,
      });
      return;
    }
    for (var i = 0; i < res.data.data.length; i++) {
      goods.push(res.data.data[i]);
    }
    that.setData({
      goods: goods,
    });
  },
  setCoupons: function (res) {
    let that = this;
    if (res.data.code == 0) {
      that.setData({
        hasNoCoupons: false,
        coupons: res.data.data
      });
    }
  },
  setNotice: function (res) {
    let that = this
    if (res.data.code == 0) {
      console.log(res.data.data)
      that.setData({
        noticeList: res.data.data
      });
    }
  },
  getGoodsList: function (categoryId) {
    if (categoryId == 0) {
      categoryId = "";
    }
    var that = this;
    fetch('GET', '/shop/goods/list', {
      categoryId: categoryId,
      nameLike: that.data.searchInput
    }, that.setGoodsList)
  },
  getCoupons: function () {
    var that = this;
    fetch('GET', '/discounts/coupons', {
      type: ''
    }, that.setCoupons)
  },
  gitCoupon: function (e) {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/discounts/fetch',
      data: {
        id: e.currentTarget.dataset.id,
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 20001 || res.data.code == 20002) {
          wx.showModal({
            title: '错误',
            content: '来晚了',
            showCancel: false
          })
          return;
        }
        if (res.data.code == 20003) {
          wx.showModal({
            title: '错误',
            content: '你领过了，别贪心哦~',
            showCancel: false
          })
          return;
        }
        if (res.data.code == 30001) {
          wx.showModal({
            title: '错误',
            content: '您的积分不足',
            showCancel: false
          })
          return;
        }
        if (res.data.code == 20004) {
          wx.showModal({
            title: '错误',
            content: '已过期~',
            showCancel: false
          })
          return;
        }
        if (res.data.code == 0) {
          wx.showToast({
            title: '领取成功，赶紧去下单吧~',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showModal({
            title: '错误',
            content: res.data.msg,
            showCancel: false
          })
        }
      }
    })
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
  getNotice: function () {
    var that = this;
    fetch('GET', '/notice/list', { pageSize: 5 }, that.setNotice)
  },
  listenerSearchInput: function (e) {
    this.setData({
      searchInput: e.detail.value
    })

  },
  toSearch: function () {
    this.getGoodsList(this.data.activeCategoryId);
  }
})
