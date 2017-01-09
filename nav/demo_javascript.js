/**
 * 判断传入的ele节点是否包含为cls的class属性值
 * @param  {Object}  ele [DOM element]
 * @param  {String}  cls [检查的属性值]
 * @return {Boolean}     [包含返回true;否则false]
 */
function haveClass(ele, cls) {
  //RegExp("(\\s|^)" + cls +"\\s|$")  匹配前后带有空格的cls属性值
  //match()返回一个布尔值，匹配到返回true;否则false
  return ele.className.match(new RegExp("(^|\\s)" + cls +"(\\s|$)"));
}

/**
 * 为指定节点ele删除指定的属性值cls
 * @param  {Object} ele [节点]
 * @param  {String} cls [要删除的属性]
 * @return {Undefined}     [没有返回值]
 */
function removeClass(ele, cls) {
  if(haveClass(ele, cls)) {
    var reg = new RegExp("(^|\\s)" + cls +"(\\s|$)");
    //将匹配到的class属性值替换为一个空格（如果有多个属性），或者空字符串
    ele.className = ele.className.replace(reg, "");
  }
}

/**
 * 为指定节点ele添加指定的属性值cls
 * @param  {[object]} ele [节点]
 * @param  {[string]} cls [要添加的属性]
 * @return {[undefined]}     [没有返回值]
 */
function addClass(ele, cls) {
  //如果没有这个属性，便用字符串拼接的方式实现class属性值的添加
  if(!haveClass(ele, cls)) {
    ele.className += " " + cls;
  }
}

/**
 * 检查节点是否包含cls属性（应为一个节点可能会有多个class属性值，以空格分隔，其className值是一个长字符串）
 * @param  {[节点]}  ele [description]
 * @param  {[属性值]}  cls [description]
 * @return {Boolean}     [description]
 */
function hasClass(ele, cls) {
  var clsArray = ele.className.split(/\s+/);     //将属性值的字符串以空格分隔为字符串数组，\s+匹配一个或多个空格
  for(var i=0; i<clsArray.length; i++) {
    if(clsArray[i] === cls) {
      return true;
    } else {
      return false;
    }
  }
}

/**
 * 为IE6、7、8封装getElementsByClassName()函数，根据class获取元素
 * @param  {[节点]} obj [需要查找的节点]
 * @param  {[属性值]} cls [class属性值]
 * @return {[type]} array [返回匹配的DOM元素数组]
 */
function getByClassName(ele, cls) {
  var elements = ele.getElementsByTagName("*"); //获取obj节点内所有后代节点
  var resluts = [];                             //保存获取到的节点数组

  for(var i=0; i<elements.length; i++) {
    if(hasClass(elements[i], cls)) {
      resluts.push(elements[i]);
    }
  }
  return resluts;
}


window.onload = function() {
  window.onscroll = function() {
    //兼容某些XHTML网页对document.documentElement.scrollTop的支持或不支持
    var top = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    var navs = document.getElementById("nav").getElementsByTagName("a");
    var content = document.getElementById("content");

    var items = getByClassName(content, "item");
    var currentId = "";
    for (var i = 0; i<items.length; i++) {
      var temp_item = items[i];
      var temp_itemTop = temp_item.offsetTop;

      //找到页面显示内容应该对于nav中的元素的id值
      if(top > temp_itemTop-100) {
        currentId = temp_item.id;
      } else {
        break;
      }
    }
      //console.log(navs[2].getAttribute("href"));
    if(currentId){
      //找到正确的nav下的a元素，为其加上class属性
      for(var j=0; j<navs.length; j++) {
        var temp_nav = navs[j];
        var temp_href = temp_nav.href.split("#");
        if(temp_href[temp_href.length-1] !== currentId) {
          removeClass(temp_nav, "current");
        } else {
          addClass(temp_nav, "current");
        }
      }
    }
  };
};
