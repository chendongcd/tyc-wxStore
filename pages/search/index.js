// pages/search/index.js
import { fetch } from '../../action/fetch.js'

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curPage:1,
    pageSize:20,
    enterScroll:false,
    height: app.globalData.deviceInfo.windowHeight+'px',
    activeType:'type0',
    //foundKeyWord:"",//foundKeyWord 搜索关键字
    //typeId:"",//商品类型ID
    //brand:"",//商品品牌
    //shopId:"",//店铺ID
    //isSalesVolume 是否按销量排序
    //isPrice 是否按金额排序
    queryConditions:{
      //foundKeyWord 搜索关键字
    },
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

    //获取从url得到的参数
    this.initData(options)

    //获取商品列表
    this.getProductListByQueryConditions()
  },

  initData: function (options){
    let foundKeyWord = options.foundKeyWord
    let typeId = options.typeId

    if (foundKeyWord != null && foundKeyWord != undefined){
      this.setData({
        foundKeyWord: options.foundKeyWord
      })
    }

    if (typeId != null && typeId != undefined){
      this.setData({
        typeId: options.typeId
      })
    }

    console.log(options)
  },

  goBack:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  
  hotControl:function(){
    let hot = this.data.hotShow
    this.setData({ hotShow: !hot })
  },

  //绑定搜索按钮
  toSearch:function(){
    let that = this
    that.setData({
      curPage:1,
      enterScroll: false
    })
    that.getProductListByQueryConditions()
  },

  //根据条件获取商品列表
  getProductListByQueryConditions:function(){
    let that = this
    wx.showLoading({
      "mask": true
    })
    //获取查询条件
    let queryConditions = {
      page:that.data.curPage,
      pageSize:that.data.pageSize
    }

    let foundKeyWord=that.data.foundKeyWord //搜索关键字
    let typeId = that.data.typeId //类型ID
    let brand = that.data.brand //品牌
    let shopId=that.data.shopId //店铺ID
    let isSalesVolume = that.data.isSalesVolume //是否按销量排序
    let isPrice=that.data.isPrice //是否按价格排序

    if (foundKeyWord != null && foundKeyWord != undefined){
      queryConditions.foundKeyWord=foundKeyWord
    }

    if(typeId != null && typeId != undefined){
      queryConditions.typeId=typeId
    }

    if (brand != null && brand != undefined) {
      queryConditions.brand=brand
    }

    if (shopId != null && shopId != undefined) {
      queryConditions.shopId=shopId
    }

    if (isSalesVolume != null && isSalesVolume != undefined) {
      queryConditions.isSalesVolume=isSalesVolume
    }

    if (isPrice != null && isPrice != undefined) {
      queryConditions.isPrice=isPrice
    }
    
    fetch("GET","product/list/v1.1",queryConditions,that.loadProductList)
  },

  //获取输入框内容
  inputTxt: function (e) {
    this.setData({
      foundKeyWord: e.detail.value
    })
  },

  //加载商品列表
  loadProductList:function(res){
    wx.hideLoading()
    
    let response = res.data;
    if(response.code == '200'){
      let that = this
      let products = response.entity
      var goods = [];
      for (var i = 0; i < products.length;i++){
        goods.push(products[i]);
      }
      that.setData({
        goods:goods,
      });
    }
  },

  //跳转到详情页
  toDetailsTap:function(e){
    let productId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/good-detail/index?productId='+productId,
    })
  },

  //下滑分页
  onReachBottom: function () {
    this.setData({
      curPage: this.data.curPage + 1
    });
    this.setData({
      enterScroll:true
    })
    this.getProductListByQueryConditions(true)
  },
  onPullDownRefresh: function () {
    this.setData({
      curPage: 1
    });
    this.getProductListByQueryConditions()
    wx.stopPullDownRefresh()
  },
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },
})