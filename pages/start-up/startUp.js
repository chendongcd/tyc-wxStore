// pages/start-up/startUp.js
import {fetch} from '../../action/fetch.js'
import error_response from '../../action/error.js'
//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '0', //0初始化（未授权）1授权中  2授权 
    angle: 0,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     var that = this;
    // setTimeout(function () {
    //   that.setData({
    //     remind: 0
    //   });
    // }, 3000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  },

  goToIndex: function () {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },

  bindGetUserInfo: function (e) {
    console.log(e)
    this.setData({
        remind: 1
      });
    if (!e.detail.userInfo) {
      return;
    }
    this.login(e.detail.encryptedData, e.detail.iv,e.detail.userInfo)
  },

  setUserInfo:function(res){
    let responseUserInfo = res.data.entity
    let that = this
    if (res.data.code && res.data.code == "200"){ //返回登录信息成功
      that.setData({
        remind: 2,
        userInfo:responseUserInfo
      })
      wx.setStorageSync('userInfo', responseUserInfo)
      console.log("token="+that.data.userInfo.token)
      app.globalData.userInfo = responseUserInfo
    }
  },

  login: function (encryptedData,iv,userInfo){
    let that = this
    that.setData({
      remind:1
    })
    wx.login({
      success:function(res){
        console.log(res)
        if(res.code){
          let param = {
            encryptedData: encryptedData,
            iv: iv,
            wxCode: res.code,
            wxNickName:userInfo.nickName,
            wxGender:userInfo.gender,
            avatarUrl:userInfo.avatarUrl,
            code:200
          }
        
          //that.setUserInfo(param)
          fetch('POST', 'user/login/v1.1',param,
          that.setUserInfo,error_response)
        }
      }
    })
  }
})