			$(function() {
				//鼠标移入产品小图事件
				$(".product-img img").mouseenter(function() { //鼠标悬浮在不同的产品小图片时外加黑色边框并且主图将其显示出来
					$(".product-img img").css({
						"border": "1px solid #c9c9c9"
					});
					$(this).css({
						"border": "1px solid #8ab800"
					}); //this获取的是当前鼠标移入的元素，设置黑色边框
					var imgsrc = $(this).attr("src"); //获取当前鼠标移入元素的src属性值将其赋值给主图元素
					$(".show").attr("src", imgsrc);
					$(".showlarge img").attr("src", imgsrc); //将鼠标选中的图传给放大图元素的src属性
				});
				//鼠标移入产品主图时出现放大的细节图和小框
				$(".showimg").mouseenter(function() {
					$(".showbox").show();
					$(".showlarge").show();
				});
				//鼠标在产品主图移动事件
				$(".showimg").mousemove(function(e) {
					var mousex = e.clientX; //获取鼠标当前对于浏览器可视区的X坐标
					var mousey = e.clientY;
					var imgx = $(".showimg").offset().left; //获得产品主图对于文档的偏移坐标
					var imgy = $(".showimg").offset().top;
					//小框的left值是鼠标位移减去产品图元素偏移坐标减去小框宽度的一半，使鼠标保持位于小框的中间
					var boxleft = mousex - imgx - $(".showbox").width() / 2; //计算小框对于产品主图元素的距离用来定位
					var boxtop = mousey - imgy - $(".showbox").height() / 2;
					//鼠标移动小框位置跟着变化
					$(".showbox").css({
						"top": boxtop,
						"left": boxleft
					});
					//计算小框移动的最大范围
					var maxtop = $(".showimg").height() - $(".showbox").height();
					var maxleft = $(".showimg").width() - $(".showbox").width();
					//判断小框移动的边界
					if (boxtop <= 0) {
						$(".showbox").css("top", "0");
					} else if (boxtop > maxtop) {
						$(".showbox").css("top", maxtop);
					}
					if (boxleft <= 0) {
						$(".showbox").css("left", "0");
					} else if (boxleft > maxleft) {
						$(".showbox").css("left", maxleft);
					}
					//设置放大图的位置偏移量，获取小框偏移量乘放大倍数，注意！！！放大图偏移量应设置为负值
					var showleft = -$(".showbox").position().left; //position()方法返回当前元素相对于父元素的位置（偏移）
					var showtop = -$(".showbox").position().top;
					//此处获取小框偏移量不应该使用前面计算出来的boxtop和boxleft值，因可能会出现超出移动的边界
					$(".showlarge img").css({
						"left": showleft,
						"top": showtop
					});
				});
				//鼠标离开产品主图元素事件，此处使用mouseleave事件只有在鼠标指针离开被选元素时才会触发，mouseout鼠标指针离开被选元素和其任何子元素都会触发。
				$(".showimg").mouseleave(function() {
					$(".showbox").hide(); //小框隐藏
					$(".showlarge").hide(); //放大图隐藏
				});

			});
