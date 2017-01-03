function getStyle(obj, attr) {      //用于获取样式的属性值
  //ie
  if(obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, false)[attr];
  }
}

function startMove(obj, attr, target, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    //取得当前值
    var iCur = 0;
    if(attr === "opacity") {
      iCur = Math.round((getStyle(obj, attr)) * 100);
    } else {
      iCur = parseInt(getStyle(obj, attr));
    }

    //计算速度
    var speed = (target - iCur) / 10;
    speed = (speed > 0) ? Math.ceil(speed): Math.floor(speed);

    //停止处理判断
    if(iCur === target) {
      clearInterval(obj.timer);
      if(fn) {
        fn();       //回调函数，在执行完前一个步骤后，接着继续调用下一个函数执行。
      }
    } else {
      if(attr === "opacity") {    //对于opacity特殊处理，其没有单位，并且是浮点数
        obj.style.filter = "alpha(opacity:" + (iCur + speed) + ")";
        obj.style.opacity = (iCur + speed) / 100;
      } else {
        obj.style[attr] = iCur + speed + "px";
      }
    }
  }, 30);
}
