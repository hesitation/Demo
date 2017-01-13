$(document).ready(function() {
  waterfall();
  var dataImg = {"data": [{"src": "22.jpg"}, {"src": "23.jpg"}, {"src": "24.jpg"}, {"src": "25.jpg"}, {"src": "26.jpg"}, {"src": "27.jpg"}, {"src": "28.jpg"}, {"src": "29.jpg"}, {"src": "30.jpg"}, {"src": "31.jpg"}]};
  $(window).on("scroll", function() {
    if(checkScrollSlide()) {
      var oParent = $("#container");
      $.each(dataImg.data, function(index, value) {
        // console.log(typeof value.src);
        // console.log("images/" + value.src);
        var oBox = $("<div>").addClass("box").appendTo(oParent);
        var oPic = $("<div>").addClass("pic").appendTo(oBox);
        var oImg = $("<img>").attr("src", "images/" + value.src).appendTo(oPic);
      });
      waterfall();
    }
  });
});

function waterfall() {
  var oParent = $("#container");
  var oBoxes = $("#container>div");
  // console.log($oBoxes);
  // var boxWidth = $oBoxes.outerWidth();
  // jQuery集合对象中
  var boxWidth = oBoxes.eq(0).outerWidth();
  // var boxWidth = $oBoxes.first().outerWidth();
  // var boxWidth = $oBoxes.last().outerWidth();
  //
  // 对于window和document对象均使用width()方法代替
  var screenWidth = $(window).width();
  var oCols = Math.floor(screenWidth / boxWidth);
  oParent.width(oCols*boxWidth).css("margin", "0 auto");

  var heightArr = [];
  //$.each(arr, fn)方法可以遍历一个数组，
  //function(index, value):index为数字元素的索引，value为数组元素的值
  $.each(oBoxes, function(index, value) {
    if(index < oCols) {
      //需要将由DOM元素组成的数组oBoxes转换为jQuery对象，才能使用jQuery的方法
      heightArr.push($(oBoxes[index]).outerHeight());
    } else {
      var minHeight = Math.min.apply(null, heightArr);
      var minIndex = $.inArray(minHeight, heightArr);

      $(oBoxes[index]).css({
        "position": "absolute",
        "top": minHeight + "px",
        "left": minIndex * boxWidth
      });

      heightArr[minIndex] += $(oBoxes[index]).outerHeight();
    }
  });
}

function checkScrollSlide() {
  var oBxes = $("#container>div");
  //oBoxes.last()获取最后一个元素，是以jQuery对象方式获取
  var lastBoxHeigth = oBxes.last().outerHeight();
  var checkHeight = oBxes.last().offset().top + Math.floor(lastBoxHeigth / 2);

  var scrollHeight = $(window).height() + $(window).scrollTop();
  return (checkHeight < scrollHeight) ? true : false;
  // console.log(scrollHeight);
}
