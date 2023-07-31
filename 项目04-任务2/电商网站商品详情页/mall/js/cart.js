$(function () {
  // 商品数量、总价、单价
  $(".max").on("click", function () {
    var t = $(this).siblings(".text_box");
    var check = $(".cart-item input").prop("checked");
    if (t.val() == "" || undefined || null) {
      t.val(1);
    }
    t.val(parseInt(t.val()) + 1);
    setTotal();
  });
  $(".min").on("click", function () {
    var t = $(this).siblings(".text_box");
    var check = $(".cart-item input").prop("checked");
    if (t.val() == "" || undefined || null) {
      t.val(1);
      // alert("已到最小数量！");
    }
    t.val(parseInt(t.val()) - 1);
    if (parseInt(t.val()) < 1) {
      t.val(1);
      // alert("已到最小数量！");
    }
    setTotal();
  });
  //商品数量及其总价合计
  function setTotal() {
    var s = 0;
    nums = 0;
    $(".cart-item").each(function () {
      var t = parseFloat($(this).find(".text_box").val());
      var p = parseFloat($(this).find(".price").text()).toFixed(2);
      $(this)
        .find(".subtotal")
        .text((p * t).toFixed(2));
      var min = $(this).find(".text_box").text();
      if (t == 1) {
        $(this).find(".min").addClass("disabled");
        $(this).find(".min").css("background", "#ddd");
      } else {
        $(this).find(".min").removeClass("disabled");
        $(this).find(".min").css("background", "#fff");
      }
      var check = $(this).find("input").prop("checked");
      if (check) {
        s += parseFloat(t) * parseFloat(p);
        nums += t;
      } else {
        s = s;
      }
    });
    if ($(".shopname input:checked").length == 0) {
      nums = 0;
    }
    $("#total span").text(s.toFixed(2));
    $(".shopnums").html(nums);
  }
  setTotal();
  //商品数量
  var nums = parseFloat($(".shopnums").text());
  // 删除单品
  $(".delete").on("click", function () {
    var check = $(this).parents(".cart-item").find("input").prop("checked");
    var t = parseFloat($(this).parents(".cart-item").find(".text_box").val());
    if (check) {
      nums = nums - t;
      var subtotal = parseFloat($(this).parent().siblings(".subtotal").text());
      var total = parseFloat($("#total span").text()).toFixed(2);
      var cartItem = $(".cart-item").length - 1;
      $(this).parents(".cart-item").prev().remove();
      $(this).parents(".cart-item").remove();
      $(".shopnums").html(nums);
      if (cartItem == 0) {
        $(".cart-operation").hide();
        $(".no-data").show();
        $('input[name="checkAll"]')
          .prop("checked", false)
          .attr("disabled", true);
      }
      //  商品数量=选中商品,全选
      if ($(".shopname").length == $(".shopname input:checked").length) {
        $('input[name="checkAll"]').prop("checked", true);
      } else {
        $('input[name="checkAll"]').prop("checked", false);
      }
      // 商品为0取消全选
      if ($(".shopname").length == 0) {
        $('input[name="checkAll"]').prop("checked", false);
      }
      if (total == "0.00") {
        return;
      } else {
        $("#total span").text((total - subtotal).toFixed(2));
      }
    } else {
      alert("请选选择商品！");
      return;
    }
  });
  // 全选
  $('input[name="checkAll"]').change(function () {
    var _all = $(this).prop("checked");
    nums = 0;
    if (_all) {
      $('input[type="checkbox"]').prop("checked", true);
      var s = 0;
      $(".cart-item").each(function () {
        var t = parseFloat($(this).find(".text_box").val());
        s += parseFloat($(this).find(".subtotal").text());
        nums += t;
      });
      $("#total span").html(s.toFixed(2));
      $(".shopnums").html(nums);
    } else {
      $('input[type="checkbox"]').prop("checked", false);
      // 全选总价
      var s = 0;
      // var t;
      $(".cart-item").each(function () {
        s += parseFloat($(this).find(".subtotal").text()).toFixed(2);
        nums = 0;
      });
      $("#total span").html("0.00");
      $(".shopnums").html(nums);
    }
  });
  //删除全部
  $(".detleteall").click(function () {
    var len = $(".shopname input:checked").length;
    if (len == 0) {
      alert("请先选择需要删除的商品！");
      return;
    }
    $(".shopname").each(function (i, item) {
      var s = parseFloat($(".total span").text()).toFixed(2);
      var checkVal = $(this).find("input").prop("checked");
      var subtotal = parseFloat(
        $(this).eq(i).next(".cart-item").find(".subtotal").text()
      );
      if (checkVal) {
        $(this).next(".cart-item").remove();
        $(this).remove();
        nums = 0;
      }
      $(".shopnums").text(nums);
      $("#total span").text("0.00");
    });
    if ($(".shopname").length == 0) {
      $(".cart-operation").hide();
      $(".no-data").show();
      $('input[name="checkAll"]').prop("checked", false).attr("disabled", true);
    }
  });
  //商铺单选
  $('input[name="name"]').on("change", function () {
    var _all = $(this).prop("checked");
    var t = parseFloat(
      $(this).parents(".shopname").next(".cart-item").find(".text_box").val()
    );
    var p = parseFloat(
      $(this).parents(".shopname").next(".cart-item").find(".subtotal").text()
    );
    var s = parseFloat($("#total span").text());
    if (_all) {
      nums += t;
      $("#total span").html((s + p).toFixed(2));
      $(this).prop("checked", true);
      $(this).parents(".shopname").next().find("input").prop("checked", true);
    } else {
      nums -= t;
      $("#total span").html((s - p).toFixed(2));
      $(this).prop("checked", false);
      $(this).parents(".shopname").next().find("input").prop("checked", false);
    }
    controlAllCheck();
    $(".shopnums").text(nums);
  });
  //商品单选
  $('input[name="det"]').on("change", function () {
    var _all = $(this).prop("checked");
    var t = parseFloat($(this).parents(".cart-item").find(".text_box").val());
    var p = parseFloat($(this).parents(".cart-item").find(".subtotal").text());
    var s = parseFloat($("#total span").text());
    if (_all) {
      $("#total span").html((s + p).toFixed(2));
      nums += t;
      $(this).parents(".cart-item").prev().find("input").prop("checked", true);
    } else {
      $("#total span").html((s - p).toFixed(2));
      nums -= t;
      $(this).prop("checked", false);
      $(this).parents(".cart-item").prev().find("input").prop("checked", false);
    }
    controlAllCheck();
    $(".shopnums").text(nums);
  });
  //商品选中及其商品数量合计
  //商品选中的数量=商品的列表数量，控制全选是否选中
  function controlAllCheck() {
    if ($(".cart-item").length == $(".cart-item input:checked").length) {
      $('input[name="checkAll"]').prop("checked", true);
    } else {
      $('input[name="checkAll"]').prop("checked", false);
    }
  }
});
