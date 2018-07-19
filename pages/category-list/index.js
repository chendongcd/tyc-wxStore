// pages/category-list/index.js
import fetch from '../../action/fetch.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    categories:[],
    level:'',
    activeCategoryId:-1,
    itemList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //console.log(options)
  wx.setNavigationBarTitle({
    title: options.name
  })
  this.getTypes(options)
  },
  getTypes:function(options){
    let that = this
    that.setData({level:options.level})
    if(options.level=='2'){
      that.setData({ categories: JSON.parse(options.types)})
    //  console.log(that.data)
    }else{
      let brands = {
        description:'品牌',
        id:-1,
        level:3,
        name:'品牌',
      }
      that.setData({ categories: [JSON.parse(options.types), brands]})
    }
    that.setData({ activeCategoryId: JSON.parse(options.types)[0].id})
    that.getList({ productTypeId: JSON.parse(options.types)[0].id,page:1,length:10})
  },
  getList:function(params){
    let that = this
    fetch.request('GET','product/list_by_type/v1.1',params,that.setList)
  },
  setList:function(res){
    console.log(res)
    let that = this
    if(res.code=='200'){
      let list = that.data.itemList.concat(res.entity)
      that.setData({itemList:list})
    }
    console.log(that.data.itemList)
  },
  tabClick:function(e){
    if (e.target.id>0)
    {
      this.setData({ activeCategoryId: e.target.id, itemList:[]})
      let param = { productTypeId:e.target.id, page: 1, length: 10 }
      this.getList(param)
    }
    console.log(e.target.id)
  },
  toDetailsTap: function (e) {
    console.log(e)
    wx.navigateTo({
      url: "/pages/good-detail/index?id=" + e.currentTarget.id
    })
  },
})