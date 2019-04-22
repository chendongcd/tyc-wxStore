// pages/category/index.js
import {
  fetch
} from '../../action/fetch.js'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeCategoryId: 0,
    categories: [],
    typeTag: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getKinds()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // this.getTypes();
    //this.getKinds()
  },
  tabClick: function(e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
    this.getTypes(e.currentTarget.id)
  },
  getKinds: function() {
    let params = {
      level: 0
    }
    let that = this
    fetch('GET', 'product/list_type/v1.1', params, that.setKinds)
  },
  setKinds: function(res) {
    let that = this
    if (res.data.code == 200) {
      let types = res.data.entity
      that.setData({
        types: types
      });
      if (types.length > 0) {
        that.setData({
          activeCategoryId: types[0].id
        });
        that.getTypes(types[0].id)
      }
      console.log(res.data.entity)
    }
  },
  getTypes: function(typeId) {
    //this.setTypes()
    let that = this;
    let params = {
      productTypeId: typeId
    }
    fetch('GET', 'product/list_type/v1.1', params, that.setTypes)
  },
  setTypes: function(res) {
    let that = this
    if (res.data.code == '200') {
      let entity = res.data.entity
      that.setData({
        childTypes: entity
      })
    } else {

    }
  },
  toProductList: function(e) {
    let typeId = e.currentTarget.id
    wx.navigateTo({
      url: "/pages/search/index?typeId=" + typeId,
    })
  },

  toList: function(e) {
    let {
      typeTag,
      activeCategoryId
    } = this.data
    let {
      level,
      name,
      types
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: "/pages/category-list/index?id=" + e.currentTarget.id + "&level=" + level + "&name=" + name + "&types=" + JSON.stringify(types)
    })
  }
})