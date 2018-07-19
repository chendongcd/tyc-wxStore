// pages/category/index.js
import fetch from '../../action/fetch.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeCategoryId: 0,
    categories: [],
    typeTag: [],
    typs:[{'typeName':'实施分类','tagNames':['T恤','背心','休闲裤','衬衫','牛仔裤','卫衣','棉衣','夹克']}]
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
      level:1
    }
    let that = this
    fetch.request('GET','product/type_list/v1.1',params,that.setKinds)
  },
  setKinds:function(res){
    var that = this
    if(res.code=='200'){
      for (var i = 0; i < res.entity.length; i++) {
        that.data.categories.push(res.entity[i]);
      }
      that.getTypes(that.data.categories[0].id)
      that.setData({
        categories: that.data.categories,
        activeCategoryId: that.data.categories[0].id
      });
    }
  },
  getTypes: function (typeId) {
    var that = this;
    let params = {productTypeId: typeId, level: 2 }
    fetch.request('GET', 'product/type_list/v1.1',params,that.setTypes)
  },
  setTypes:function(res){
    let that = this
    let { activeCategoryId,categories,typeTag} = that.data
    if (res.code == '200' && !typeTag[activeCategoryId]){
      typeTag[activeCategoryId] = res.entity
      that.setData({ typeTag: typeTag})
    }
    console.log(typeTag[activeCategoryId])
  },
  toList:function(e){
    let { typeTag, activeCategoryId} = this.data
    let { level, name,types} = e.currentTarget.dataset
    console.log(types)
    wx.navigateTo({
      url: "/pages/category-list/index?id=" + e.currentTarget.id+"&level="+level+"&name="+name+"&types="+JSON.stringify(types)
    })
  }
})