//logs.js
Page({
  data: {
    logs: []
  },
  onShow:function(){
    this.setData({
      logs:getApp().globalData.log
    })
  }
})