//app.js
App({
  onLaunch:function(){
    try{
      this.globalData.deviceInfo = wx.getSystemInfoSync()
    }catch(error){
      console.log(error)
    }
  },
  onShow: function (options) {
    // Do something when show.
  },
  globalData:{
    userInfo:null,
    subDomain: "tz",
    mainColor:'#E76262',
    deviceInfo:{},
    version:"0.0.1",
    isConnected: true
  },
  goLoginPageTimeOut: function () {
    if (this.navigateToLogin) {
      return
    }
    this.navigateToLogin = true
    setTimeout(function () {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    }, 1000)
  },
  goStartIndexPage: function () {
    setTimeout(function () {
      wx.redirectTo({
        url: "/pages/start/start"
      })
    }, 1000)
  },
})