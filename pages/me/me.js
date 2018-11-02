const app = getApp()

Page({
  data: {
    balance: 0,
    freeze: 0,
    score: 0,
    score_sign_continuous: 0
  },
  onLoad() {

  },
  onShow() {
    let that = this;
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    } else {
      that.setData({
        userInfo: userInfo,
        version: app.globalData.version
      })
    }
    this.getUserApiInfo();
    this.getUserAmount();
    this.checkScoreSign();
  },
  aboutUs: function () {
    wx.showModal({
      title: '关于我们',
      content: '有品精选',
      showCancel: false
    })
  },
  getPhoneNumber: function (e) {
    if (!e.detail.errMsg || e.detail.errMsg != "getPhoneNumber:ok") {
      wx.showModal({
        title: '提示',
        content: '无法获取手机号码',
        showCancel: false
      })
      return;
    }
  },
  getUserApiInfo: function () {
    var that = this;

  },
  getUserAmount: function () {
    var that = this;


  },
  checkScoreSign: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/score/today-signed',
      data: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            score_sign_continuous: res.data.data.continuous
          });
        }
      }
    })
  },
  scoresign: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/score/sign',
      data: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.getUserAmount();
          that.checkScoreSign();
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
  relogin: function () {
    wx.navigateTo({
      url: "/pages/authorize/index"
    })
  },
  recharge: function () {
    wx.navigateTo({
      url: "/pages/recharge/index"
    })
  },
  withdraw: function () {
    wx.navigateTo({
      url: "/pages/withdraw/index"
    })
  }
})