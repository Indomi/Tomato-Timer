Page({
  data: {
    rest_time:getApp().globalData.rest_time,
    work_time:getApp().globalData.work_time
  },
  //改变时间
  changeRestTime:function(e){
    var app = getApp();
    app.globalData.rest_time = e.detail.value;
  },
  changeWorkTime: function (e) {
    var app = getApp();
    app.globalData.work_time = e.detail.value;
  },
})