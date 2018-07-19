//app.js
App({
  onLaunch:function(){
    try{
      this.globalData.deviceInfo = wx.getSystemInfoSync()
      console.log(this.globalData)
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
    deviceInfo:{}
  }
})