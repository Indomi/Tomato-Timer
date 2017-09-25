//index.js
//获取应用实例
const name = {
  rest_time : '休息',
  work_time : '工作'
}
const app = getApp();
Page({
  data: {
    isRun:false,
    leftDeg:-135,
    rightDeg:-135,
    minutes:'00',
    seconds:'00',
    animationSlide:{},
    animationSlideBtnDown:{},
    animationSlideBtnShow:{},
    logTime:0,
    id:''
  },

  bindKeyInput:function(e){
    this.setData({
      id:e.detail.value
    });
  },
  //选择模式，开始计时
  chooseTime: function (e) {
    this.addLogData(e.currentTarget.dataset.type);
    //获取全局数据
    let fullTime = getApp().globalData[e.currentTarget.dataset.type];
    let startTime = Date.now();
    let halfTime = fullTime / 2;
    fullTime = fullTime<10 ? '0'+fullTime : fullTime;
    this.setData({
      minutes: fullTime,
      isRun:true,
      logTime:startTime
    });
    //秒数计时
    let stop = setInterval(function () {
      let keepTime = Math.floor((Date.now()-startTime)/1000);
      let seconds = this.data.seconds;
      let m = this.data.minutes;
        //计时器显示
        if(seconds==0){
          //秒数为0变59，分钟数减1
          seconds = 59;
          m = m>10?m-1:m;
          m = m<10&&m!=='00' ? '0'+(m-1) : m;
        }else if(seconds!=0){
          //秒数减1
          seconds--;
          seconds = seconds<10 ? '0'+seconds:seconds;
        }
        //进度条显示
        if(keepTime>0&&keepTime<=halfTime*60){
          this.setData({
            rightDeg: -135 + 180 * keepTime / (fullTime * 30)
          });
        }else if(keepTime=>halfTime*60&&keepTime<=fullTime*60){
          this.setData({
            leftDeg: -135 + 180 * (keepTime-halfTime*60) / (fullTime * 30)
          });
        }else{
          this.setData({
            rightDeg:-135,
            leftDeg:-135
          });
        }
        if (keepTime == fullTime * 60 || !this.data.isRun) {
          seconds = '00';
          m = '00';
          clearInterval(stop);
          this.stopTimer();
        }
        this.setData({
          minutes: m,
          seconds: seconds
        });
    }.bind(this), 1000);
    //调用动画
    this.slideDown();
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
    let stopTime = Date.now();
    let animation = wx.createAnimation({
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
      isRun:false,
      leftDeg:-135,
      rightDeg:-135
    });
  },
  addLogData:function(e){
    let date = new Date(this.data.logTime);
    let event = this.data.id ? this.data.id: name[e];
    getApp().globalData.log.push(date.toLocaleDateString() + "--" + date.toLocaleTimeString() + "--" + event);
  }
})
