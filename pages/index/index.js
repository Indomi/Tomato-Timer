//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    animationDataLeft:{},
    animationDataRight:{},
    duration:5000,
    show:true,
    slideShow:true,
    event:'',
    minutes:'00',
    seconds:'00',
    input:0,
    animationSlide:{},
    animationSlideBtnDown:{},
    animationSlideBtnShow:{}
  },
  //进度条动画
  circleAnimation:function(id){
    var time=getApp().globalData[id]*30000;
    var animationLeft = wx.createAnimation({
      duration: time,
      timingFunction: "linear",
      delay: time
    });
    var animationRight = wx.createAnimation({
      duration: time,
      timingFunction: "linear",
    });
    this.setData({
      animationDataLeft: animationLeft.rotate(45).step().export(),
      animationDataRight: animationRight.rotate(45).step().export(),
      show:false
    });
    this.slideDown();
  },
  //选择休息模式
  chooseRestTime: function () {
    //获取全局数据
    var resttime = getApp().globalData.rest_time;
    var _this = this;
    //分钟小于0补0
    if (resttime < 10) {
      resttime = '0' + resttime;
    }
    this.setData({
      minutes: resttime
    });
    //秒数计时
    var stop = setInterval(function () {
      var time = _this.data.seconds;
      var m = _this.data.minutes;
      if (time == 0) {
        _this.setData({
          seconds: 59
        });
        if (m != 0) {
          m--;
          if (m < 10) { m = '0' + m; }
          _this.setData({
            minutes: m
          });
        }
      } else if (time < 11) {
        time -= 1;
        _this.setData({
          seconds: '0' + time
        });
      } else {
        _this.setData({
          seconds: time - 1
        });
      }
      //判断结束
      if (_this.data.minutes == 0 && _this.data.seconds == 0) {
        clearInterval(stop);
        _this.stopTimer();
      }
    }, 1000);
    //调用动画
    this.circleAnimation('rest_time');
  },
  //选择工作模式
  chooseWorkTime: function () {
    //获取全局数据
    var worktime = getApp().globalData.work_time;
    var _this = this;
    //分钟小于0补0
    if (worktime < 10) {
      worktime = '0' + worktime;
    }
    this.setData({
      minutes: worktime
    });
    //秒数计时
    var stop = setInterval(function () {
      var time = _this.data.seconds;
      var m = _this.data.minutes;
      if (time == 0) {
        _this.setData({
          seconds: 59
        });
        if(m!=0){
          m--;
          if(m<10){m='0'+m;}
          _this.setData({
            minutes:m
          });
        }
      } else if (time < 11) {
        time -= 1;
        _this.setData({
          seconds: '0' + time
        });
      } else {
        _this.setData({
          seconds: time - 1
        });
      }
      //判断结束
      if (_this.data.minutes==0&&_this.data.seconds == 0){
        clearInterval(stop);
      }
    }, 1000);
    //调用动画
    this.circleAnimation('work_time');
  },
  //运行Timer动画
  slideDown:function(){
    var animationSlide = wx.createAnimation({
      duration:1000,
      timingFunction:'linear'
    });
    animationSlide.height('1100rpx').step();
    this.setData({
      animationSlide:animationSlide.export()
    });
    animationSlide.opacity(0).step();
    this.setData({
      animationSlideBtnDown:animationSlide.export(),
      slideShow:false
    });
    var animation = wx.createAnimation({
      duration:1000,
      timingFunction:'linear',
      delay:1000
    });
    animation.opacity(1).step();
    this.setData({
      animationSlideBtnShow: animation.export(),
    });
  },
  stopTimer:function(){
    var animation = wx.createAnimation({
      duration:1000,
      timingFunction:'linear'
    });
    animation.opacity(0).step();
    this.setData({
      animationSlideBtnShow:animation.export()
    });
    animation.opacity(1).step();
    this.setData({
      animationSlideBtnDown:animation.export()
    });
    animation.height('800rpx').step();
    this.setData({
      animationSlide:animation.export(),
      slideShow:true,
      minutes:'00',
      seconds:'00'
    });
  }
})
