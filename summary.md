#总结
##网易邮箱注册页（html+css）
出现的问题：

1. 首先应该根据页面的构成，划分各个板块，完成大的布局；
2. ```inline```元素不支持宽高；
3. 局部范围内使用绝对定位布局真的很慢；
4. `block`元素中的内容水平、垂直居中使用: ```text-align:center; padding: 10px 0;```。利用`padding`实现垂直居中；
5. 背景图的引入：```background: url(img/deom.jpg) no-repeat;```
6. 绝对定位使用时，最好将其父级元素设置为`position: relatiev`，作为其参照。
