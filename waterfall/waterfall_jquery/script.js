/**
 * 瀑布流布局的实现思路：
 * 1：先按照浮动将各个元素块排列整齐，各元素块等宽，间距设置利用padding
 * 2：获取元素块的宽度和屏幕显示宽度，计算屏幕可以显示的列数，设置包裹层的总宽度
 * 3：根据排列好的第一排元素（top值相同），将第一列元素的高度保存在一个数组中，计算其中的最小值，并取得其索引
 * 4：利用绝对定位实现布局：将下一个元素放在列高最小的一列元素下面（利用索引计算top和left值），更新列高
 * 5：根据滚动条的滚动距离判断其他数据块的加载条件，并将其定位在已定位元素之后
 */


//当script标签写在head标签内时，等到所有DOM元素加载完毕再执行js脚本
$(document).ready(function() {
  var oParent = $("#container");
  var $oBoxes = $("#container>div");   //只取子元素

  waterfall(oParent, $oBoxes);

  var dataImg = {"data": [{"src": "22.jpg"}, {"src": "23.jpg"}, {"src": "24.jpg"}, {"src": "25.jpg"}, {"src": "26.jpg"}, {"src": "27.jpg"}, {"src": "28.jpg"}, {"src": "29.jpg"}, {"src": "30.jpg"}, {"src": "31.jpg"}]};
  $(window).on("scroll", function() {
    if(checkScrollSlide()) {
      for(var i=0; i<dataImg.data.length; i++) {
        var oBox = $("<div>").addClass("box");
        oParent.append(oBox);
        var oPic = $("<div>").addClass("pic");
        oBox.append(oPic);
        var oImg = $("<img src=images/" + dataImg.data[i].src + " />");
        oPic.append(oImg);
      }
      waterfall(oParent, $oBoxes);
    }
  });
});

var waterfall = function(parent, elements) {
  //需要将elements转化为jQuery对象才能使用其方法
  //outerWidth()用于获取一组匹配元素的第一个元素的宽度：content + padding + border + (margin)，传入true参数时才加上margin值；不适用于window和document
  //elements.eq(0)索引jQuery匹配对象集合的每个元素
  var oBoxWidth = elements.eq(0).outerWidth();
  //width()用于获取一组匹配元素的第一个元素的宽度：content
  var oScreenWidth = $(window).width();
  //获取列数
  var oCols = Math.floor(oScreenWidth / oBoxWidth);
  parent.css({"width": oCols * oBoxWidth + "px", "margin": "0 auto"});  //parent.width(oCols*oBoxWidth);  不需要设置单位

  var heightArr = [];
  //利用$.each()方法遍历oBoxes（jQuery对象），index是遍历的索引，value是DOM元素
  //$elements.each(function {});
  $.each(elements, function(index, value) {
    if(index < oCols) {
      heightArr.push(elements.eq(index).outerHeight());
    } else {
      //获取数组最小值及其索引
      var minValue = Math.min.apply(null, heightArr);
      // var minIndex = getMinIndex(heightArr, minValue);
      var minIndex = $.inArray(minValue, heightArr);

      var oTop = heightArr[minIndex] + "px";
      var oLeft = minIndex * oBoxWidth;
      //注意使用jQuery对象$(elements.eqindex))的css()
      //value等价于elements[index]
      // $(elements.eq(index)).css({"position": "absolute", "top": oTop, "left": oLeft});
      $(value).css({"position": "absolute", "top": oTop, "left": oLeft});

      //更新列高
      // heightArr[minIndex] += elements.eq(index).outerHeight();
      heightArr[minIndex] += $(value).outerHeight();
    }
  });
};

var checkScrollSlide = function() {
  var $lastBox = $("#container>div").last();
  var oCLientH = $(window).height();
  var oCLientScrollH = $(window).scrollTop();
  var oBoxH = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2);
  // console.log($lastBox.outerHeight() / 2);

  return (oBoxH < (oCLientH + oCLientScrollH)) ?　true : false;
};

//使用$.inArray(value, arr);获取一个值在数组中的索引
// var getMinIndex = function(arr, val) {
//   for(var i=0; i<arr.length; i++) {
//     if(arr[i] === val) {
//       return i;
//     }
//   }
// };
