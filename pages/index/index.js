//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    animationDataLeft:{},
    animationDataRight:{},
    duration:5000,
    show:true,
    event:'',
    lastTime:0,
    input:0
  },
  //绑定倒计时按钮
  startRotate:function(){
    var time;
    var _this = this;
    var stop = setInterval(function(){
      let lasttime = _this.data.lastTime;
      if (lasttime-1 <= 0){
        clearInterval(stop);
        console.log("hello");
        wx.vibrateLong({
          fail:function(e){console.log(e)},
          success:function(){console.log('success')}
        }); 
      }
      _this.setData({
        lastTime:lasttime-1
      });
    },1000);
    if(this.data.lastTime>0){
      time = this.data.lastTime*500;
    }else{
      time = this.data.duration/2;
    }
    var animationLeft = wx.createAnimation({
      duration:time,
      timingFunction:"linear",
      delay:time
    });
    var animationRight = wx.createAnimation({
      duration:time,
      timingFunction:"linear",
    });
    this.setData({
      animationDataLeft:animationLeft.rotate(45).step().export(),
      animationDataRight:animationRight.rotate(45).step().export(),
      show:false
    });
  },
  //重置进度条
  resetRotate:function(){
    var animationLeft = wx.createAnimation({
      duration: 500,
      timingFunction: "linear",
      delay: 500
    });
    var animationRight = wx.createAnimation({
      duration: 500,
      timingFunction: "linear",
    });
    this.setData({
      animationDataLeft: animationLeft.rotate(-135).step().export(),
      animationDataRight: animationRight.rotate(-135).step().export(),
      show:true,
      lastTime:this.data.input
    });
  },
  //改变持续时间
  changeDuration:function(e){
    this.setData({
      lastTime:e.detail.value,
      input:e.detail.value
    });
  }
})
