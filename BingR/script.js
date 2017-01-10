var getDOM = function(id) {
  return document.getElementById(id);
};

//addEventListener和attachEvent()
var addEvent =  function(obj, event, handler) {
  if(obj.addEventListener) {
    return obj.addEventListener(event, handler, false);      //false指明：采用事件冒泡机制
  } else if(obj.attachEvent) {
    return obj.attachEvent("on" + event, handler);
  } else {                                                   //如果均不知，便使用直接添加属性，缺点是一个元素只能绑定一个事件
    obj["on" + event] = handler;
  }
};

//removeEventListener()和`detachEvent()
var removeEvent = function(obj, event, handler) {
  if(obj.removeEventListener) {
    return obj.removeEventListener(event, handler, false);      //false指明：采用事件冒泡机制
  } else if(obj.detachEvent) {
    return obj.detachEvent("on" + event, handler);
  } else {
    obj["on" + event] = null;
  }
};

//获取元素距离屏幕左侧的距离
var getElementLeft = function(ele) {
    var actualLeft = ele.offsetLeft;
    var current = ele.offsetParent;

    while(current !== null) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
    return actualLeft;
};

//获取元素距离屏幕顶部的距离
var getElementTop = function(ele) {
    var actualTop = ele.offsetTop;
    var current = ele.offsetParent;

    while(current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
};

var getRequest = function(url, callback) {
  var _xhr = null;     //保存对象的变量最好先初始化为null
  if(window.XMLHttpRequest) {
    _xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    _xhr = new ActiveXObject("MSXML2.XMLHTTP");
  }
  //捕获响应状态
  _xhr.onreadystatechange = function() {
    if(_xhr.readyState === 4 && _xhr.status === 200) {
      callback(JSON.parse(_xhr.responseText));   //将服务器返回的数据JSON.parse(_xhr.responseText)解析后，作为callback的参数传入callback进行处理
    }
  };
  _xhr.open("GET", url, false);
  _xhr.send(null);
};

window.onload = function() {
  var searchInput = getDOM("search-input");
  addEvent(searchInput, "keyup", function() {
    var keyword = searchInput.value;
    var url = "http://api.bing.com/qsonhs.aspx?q=" + keyword;
    getRequest(url, function(data) {
          var results = data.AS.Results[0].Suggests;
          var html = "";
          for (var i = 0; i < results.length; i++) {
            html += "<li>" + results[i].Txt + "</li>";
          }
          getDOM("search-result").innerHTML = html;

          //返回数据的样式
          var searchSuggest = getDOM("search-suggest");
          searchSuggest.style.left = getElementLeft(searchInput) + "px";     //定位水平偏移量
          searchSuggest.style.top = getElementTop(searchInput) + 46 + "px";       //定位垂直偏移量
          searchSuggest.style.position = "absolute";        //必须设置绝对定位
          searchSuggest.style.display = "block";
    });
  });

  //单击屏幕其余地方，结果框隐藏
  addEvent(document.body, "click", function() {
    var search = getDOM("search-suggest");
    search.style.display = "none";
  });

  //为搜索按钮添加事件
  addEvent(getDOM("search-button"), "click", function() {
    var keyword = searchInput.value;
    location.href = "http://cn.bing.com/search?q=" + keyword;
  });

  //事件代理，利用冒泡机制实现
  addEvent(getDOM("search-result"), "click", function(event) {
    var keyword = this.value;
    // location.href = "http://cn.bing.com/search?q=" + keyword;    //在当前页面内打开搜索内容
    window.open("http://cn.bing.com/search?q=" + keyword);  //在新建页面中打开搜索的内容
    event.stopPropagation();       //组织继续向上冒泡
  });

  //回车键事件
  addEvent(getDOM("search-button"), "keydown", function(event) {
    if(event.keyCode === 13) {
      var keyword = searchInput.value;
      location.href = "http://cn.bing.com/search?q=" + keyword;
      event.preventDefault();
    }
  });
};
