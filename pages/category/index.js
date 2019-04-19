// pages/category/index.js
import {fetch} from '../../action/fetch.js'
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
  onLoad: function (options) {
    this.getKinds()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   // this.getTypes();
    //this.getKinds()
  },
  tabClick:function(e){
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
    this.getTypes(e.currentTarget.id)
  },
  getKinds:function(){
    let params = {
      level:0
    }
    let that = this
    fetch('GET', 'product/list_type/v1.1',params,that.setKinds)
  },
  setKinds:function(res){
    let that = this
    if(res.data.code==200){
      let types = res.data.entity
      that.setData({
        types:types
      });
      // const _data = res.data.data
      // for (var i = 0; i < _data.length; i++) {
      //   that.data.categories.push(_data[i]);
      // }
      // that.getTypes(that.data.categories[0].id)
      // that.setData({
      //   categories: that.data.categories,
      //   activeCategoryId: that.data.categories[0].id
      // });
    }
    // if(res.code=='200'){
    //   for (var i = 0; i < res.entity.length; i++) {
    //     that.data.categories.push(res.entity[i]);
    //   }
    //   that.getTypes(that.data.categories[0].id)
    //   that.setData({
    //     categories: that.data.categories,
    //     activeCategoryId: that.data.categories[0].id
    //   });
    // }
  },
  getTypes: function (typeId) {
    //this.setTypes()
    let that = this;
    let params = {productTypeId: typeId}
    fetch('GET', 'product/list_type/v1.1',params,that.setTypes)
  },
  setTypes:function(res){
    let that = this
    if (res.data.code == '200'){
      let entity = res.data.entity
      that.setData({
        childTypes:entity
      })
    }else{

    }
    // let { activeCategoryId,categories,typeTag} = that.data
    // if (!typeTag[activeCategoryId]){
    //   typeTag[activeCategoryId] = _typeTags
    //   that.setData({ typeTag: typeTag })
    // }
    // return
    // if (res.code == '200' && !typeTag[activeCategoryId]){
    //   typeTag[activeCategoryId] = res.entity
    //   that.setData({ typeTag: typeTag})
    // }
  },
  toProductList:function(e){
    let typeId = e.currentTarget.id
    wx.navigateTo({
      url: "/pages/search/index?typeId=" + typeId,
    })
  },

  toList:function(e){
    let { typeTag, activeCategoryId} = this.data
    let { level, name,types} = e.currentTarget.dataset
    wx.navigateTo({
      url: "/pages/category-list/index?id=" + e.currentTarget.id+"&level="+level+"&name="+name+"&types="+JSON.stringify(types)
    })
  }
})