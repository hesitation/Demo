$(document).ready(function() {
  //添加滚动条滚动触发的事件
  $(window).scroll(function() {
    //获取滚动条距顶部的高度
    var top = $(window).scrollTop();
    // console.log(top);
    var nav = $("#nav");
    var content = $("#content");

    var currentId = "";              //用来保存本次遍历DOM元素的id
    var items = content.find(".item");
    items.each(function() {
      var currentItem = $(this);
      var itemTop = currentItem.offset().top;
      // console.log(itemTop);
      if (top > itemTop-200) {                      //为用户体验，当下拉到离底部还有200px时，便跳转。
        currentId = "#" + currentItem.attr("id");
      } else {
        return false;       //如果已经不满足，直接跳出循环，节约资源
      }
    });

      var currentLink = nav.find(".current");
      if(currentId &&(currentLink.attr("id") !== currentId)) {        //current不为空，并且
        currentLink.removeClass("current");
        nav.find("[href=" + currentId + "]").addClass("current");
      }
    });
});
