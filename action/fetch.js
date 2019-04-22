const fetch = function (method, url, params, success, fail, token){
  console.log('接口地址：', 'http://localhost:8089/ecommerce/' + url)
  console.log('传递参数：/n',params)
  console.log('请求方法:',method)
  //https://api.it120.cc/tz
  wx.request({
    url: 'http://47.105.127.126:8089/ecommerce/'+url,
   // url: 'http://localhost:8089/ecommerce/' + url,
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