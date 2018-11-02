const fetch = function (method, url, params, success, fail, token){
  console.log('接口地址：', 'http://e32386e4.ngrok.io/tcy/' + url)
  console.log('传递参数：/n',params)
  console.log('请求方法:',method)
  //http://8a6eafa3.ngrok.io http://93f66699.ngrok.io/tcy/
  wx.request({
    url: 'https://api.it120.cc/tz'+url,
    method: method,
    data: params,
    success: function (res) {
      console.log('返回结果',res)
      if(success){
        success(res)
      }
    },
    fail: function (err) {
      console.log('请求失败')
      console.log(err)
      if (fail) {
        fail(err)
      }
    }
  })
}
module.exports = {
  fetch: fetch
}