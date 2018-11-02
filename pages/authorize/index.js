// pages/authorize/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindGetUserInfo: function (e) {
    console.log(e)
    if (!e.detail.userInfo) {
      return;
    }
    this.login(e.detail.encryptedData, e.detail.iv, e.detail.userInfo)
  },
  setUserInfo: function (res) {
    let that = this
    if (res.code == 200) {
      that.setData({
        remind: 2,
        userInfo: res
      })
      wx.setStorageSync('userInfo', res)
      app.globalData.userInfo = res
      wx.navigateBack();
    }else{
     // wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '无法登录，请重试',
        showCancel: false
      })
      return;
    }
  },
  login: function (encryptedData, iv, userInfo) {
    let that = this
    that.setData({
      remind: 1
    })
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          let param = {
            encryptedData: encryptedData,
            iv: iv,
            wxCode: res.code,
            nickName: userInfo.nickName,
            wxGender: userInfo.gender,
            avatarUrl: userInfo.avatarUrl,
            code: 200
          }

          that.setUserInfo(param)
          //fetch.request('POST', 'user/login/v1.1',param,that.setUserInfo)
        }
      }
    })
  }
})