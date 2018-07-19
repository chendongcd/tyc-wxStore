//index.js
import fetch from '../../action/fetch.js'
//获取应用实例
const app = getApp()
let page = 1,length = 10
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    categories: [{ id: 0, name: '全部' }, { id: 1, name: '男装' }, { id: 2, name: '女装' }, { id: 3, name: '童装' }, { id: 4, name: '男人装' }, { id: 5, name: '女人装' }],
    activeCategoryId:0,
    noticeList: ['商城新开张，优惠多多，戳 戳 戳 我看详情', '商城新开张，优惠多多，戳 戳 戳 我看详情'],
    hasNoCoupons: true,
    coupons: [],
    scrollTop: "0",
    goods: [],
    loadingMoreHidden: true,
    searchInput:''
  },
  //事件处理函数
  onShow:function(){
    console.log(getCurrentPages());
  },
  onLoad:function(){
   // this.getCategories();
    this.getCoupons();
    this.getHomeGoods();
    //this.getGoodsList(0);
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    page  = 1
    this.getHomeGoods()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    page += 1
    this.getHomeGoods()
  },
  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
  },
  getCoupons: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/discounts/coupons',
      data: {
        type: ''
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            hasNoCoupons: false,
            coupons: res.data.data
          });
        }
      }
    })
  },
  getGoodsList: function (categoryId) {
    if (categoryId == 0) {
      categoryId = "";
    }
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/list',
      data: {
        categoryId: categoryId,
        nameLike: that.data.searchInput
      },
      success: function (res) {
        console.log(res)
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
      }
    })
  },
  getCategories:function(){
    let that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/category/all',
      success: function (res) {
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
      }
    })
  },
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/good-detail/index?id=" + e.currentTarget.dataset.id
    })
  },
  getHomeGoods:function(){
    let param = {page:page,length:length}
    let that = this
    fetch.request('GET','product/list/v1.1',param,that.setGoodsList)
  },
  setGoodsList:function(res){
    let that = this
    if(res.code=='200'){
      that.setData({
        loadingMoreHidden: true
      });
      if(res.entity){
      if(page==1){
        that.setData({
          goods:res.entity
        })
      }else{
        //console.log(goods)
        for (var i = 0; i < res.entity.length; i++) {
          that.data.goods.push(res.entity[i]);
        }
        that.setData({
          goods: that.data.goods
        })
      }
      }
    }
  }
})
