var glt = function(arr) {
	//初始化目标对象
	var getmore = function() {
		for (var i = 0; i < arr.length; i++) {
			arr[i].dom = $("#" + arr[i].id),
				arr[i].top = $("#" + arr[i].id).offset().top,
				arr[i].height = $("#" + arr[i].id).height()
		}
	}
	getmore();
	//进行排序,确定先后顺序
	var getsort = function() {
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < arr.length - i - 1; j++) {
				if (arr[j].top > arr[j + 1].top) {
					var temp = arr[j];
					arr[j] = arr[j + 1];
					arr[j + 1] = temp;
				}
			}
		}
	}
	getsort();
	//渲染控件
	var dorender = function() {
		var hs = "<ul id='boxs'>"
		for (var i = 0; i < arr.length; i++) {
			if (i == 0) {
				hs = hs + "<li  id='m" + arr[i].id + "' class='box'>" + arr[i].name + "</li>";
			} else {
				hs = hs + "<li id='m" + arr[i].id + "' class='box'>" + arr[i].name + "</li>";
			}
		}
        hs = hs + "</ul>"
		hs = hs + "<a id='mf0' class='box retrun-btn'>";
        hs=hs+ "<img src='images/return-top.png' alt=''><span>顶部</span></a>"
		$('aside').append(hs);
		var $boxs = $("#boxs");
		var $box = $(".box");
		$boxs.css({
			'min-height': '300px',
			'position': 'adsolute',
			'left': '30px',
			'right': '-90px'
		})
		$box.css({
            'height': '60px',
            'padding': '0 15px',
			'cursor': 'pointer',
			'display': 'flex',
			'justify-content': 'center',
			'align-items': 'center'
		})
	}
	dorender();

	//滚动条监控
	$(document).scroll(function() {
		var temp = gettarget()
		boxcheck(temp)
	})

	//获得当前目标下标
	var gettarget = function() {
		var flag = true;
		var temp = $(this).scrollTop();
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].top + arr[i].height / 1.5 >= temp) {
				return i;
				flag = false;
				break;
			}
		}
		if (flag) {
			return arr.length - 1;
		}
	}
	//菜单选中当前下标
	var boxcheck = function(count) {
		var temp = null;
		for (var i = 0; i < arr.length; i++) {
			$("#m" + arr[i].id).css({
				'background-color': 'white',
				'color': 'black'
			})

			if (i == count) {
				temp = $("#m" + arr[i].id);
			}
		}
		temp.css({
			'color': '#30b30e'
		})
	}
	//置顶操作
	$("#mf0").click(function() {
		$('html').stop().animate({
			scrollTop: '0px'
		}, 500)
	})

	//对应按钮点击之后页面定位
	for (let i = 0; i < arr.length; i++) {
		$("#m" + arr[i].id).click(function() {
			$('html').stop().animate({
				scrollTop: arr[i].top + 'px'
			}, 500)
		})
	}
	//监控页面视口变化，重新获取对象参数
	window.onresize=function(){
		getmore();
	}
}
