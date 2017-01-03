function getStyle(obj, attr) {      //用于获取样式的属性值
  //ie
  if(obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, false)[attr];
  }
}

//attr, target是一个键值对，可以使用json数据格式表示
function startMove(obj, json, fn) {
  clearInterval(obj.timer);
  var flag = true;  //假设所有运动到达最终值
  obj.timer = setInterval(function() {
    for(var attr in json) {
      //取得当前值
      var iCur = 0;
      if(attr === "opacity") {
        iCur = Math.round((getStyle(obj, attr)) * 100);
      } else {
        iCur = parseInt(getStyle(obj, attr));
      }

      //计算速度
      var speed = (json[attr] - iCur) / 10;
      speed = (speed > 0) ? Math.ceil(speed): Math.floor(speed);

      //停止处理判断, 没有检测所有属性都到达了终点
      if(iCur !== json[attr]) {
        flag = false;
      }

      if(attr === "opacity") {    //对于opacity特殊处理，其没有单位，并且是浮点数
        obj.style.filter = "alpha(opacity:" + (iCur + speed) + ")";
        obj.style.opacity = (iCur + speed) / 100;
      } else {
        obj.style[attr] = iCur + speed + "px";
      }

      if(flag) {
        clearInterval(obj.timer);
        if(fn) {
          fn();       //回调函数，在执行完前一个步骤后，接着继续调用下一个函数执行。
        }
      }
    }
  }, 30);
}
