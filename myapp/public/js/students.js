pagaStart = 0;
$(function () {
  // 数据初始化
  loadData(pagaStart);
  $("#checkall").click(function () {
    $("input[name='id[]']").each(function () {
      if (this.checked) {
        this.checked = false;
      } else {
        this.checked = true;
      }
    });
  })

  $(".pagelist").find("a").click(function () {
    pageStart = $(this).index();
    loadData(pageStart)
  })

  //   删除
  $("#stu_list").on("click", ".del", function () {
    var username = $(this).parent().siblings(".username").text();
    // console.log($(this).parent().siblings(".username").text());
    var sure = confirm("确定要删除吗？")
    if (sure) {
      $.ajax({
        url: "http://localhost:3000/stu_del", //请求地址
        type: "POST", //请求方式  GET POST
        async: true, //是否异步
        data: {
          name: username
        },
        dataType: "json", //预期的服务器响应的数据类型  
        contentType: "application/x-www-form-urlencoded",
        success: function (response) {
          if (response.msg == "success") {
            alert("删除成功");
            loadData(pageStart);
          } else {
            alert("删除失败，请稍后重试");
          }
        },
        error: function (xhr, status, error) {
          //失败后的回调
          console.log(xhr);
          console.log(status);
          console.log(error);
        },
        complete: function () {
          //无论失败还是成功都会执行   请求完成
          console.log("请求已完成");
        }
      })
    }
  })
  // 编辑
  $("#stu_list").on("click", ".edit", function () {
    $("#shadow").show();
    var age = $(this).parent().siblings(".age").text();
    var name = $(this).parent().siblings(".username").text();
    var tel = $(this).parent().siblings(".tel").text();
    var address = $(this).parent().siblings(".address").text();
    var email = $(this).parent().siblings(".email").text();
    var date = $(this).parent().siblings(".date").text();
    var account = $(this).parent().siblings(".id").text();

    $("#set_age").val(age);
    $("#set_name").val(name);
    $("#set_tel").val(tel);
    $("#set_email").val(email);
    $("#set_add").val(address);
    $("#set_date").val(date);
    $("#set_account").val(account);
    // console.log($("#shadow",parent.document));
    // parent.$("#shadow").show()

  })
  $("#change_sure").click(function () {
    var age = $("#set_age").val();
    var name = $("#set_name").val();
    var tel = $("#set_tel").val();
    var address = $("#set_add").val();
    var email = $("#set_email").val();
    var date = $("#set_date").val();
    var account = $("#set_account").val();
    var sure = confirm("确定要修改吗？")
    if (sure) {
      $.ajax({
        url: "http://localhost:3000/stu_change", //请求地址
        type: "POST", //请求方式  GET POST
        async: true, //是否异步
        data: {
          name,
          age,
          tel,
          email,
          address,
          date,
          account
        },
        dataType: "json", //预期的服务器响应的数据类型  
        contentType: "application/x-www-form-urlencoded",
        success: function (response) {
          if (response.msg == "success") {
            alert("修改成功");
            $("#shadow").hide();
            loadData(pageStart);
          } else {
            alert("修改失败，请稍后重试");
          }
        },
        error: function (xhr, status, error) {
          //失败后的回调
          console.log(xhr);
          console.log(status);
          console.log(error);
        },
        complete: function () {
          //无论失败还是成功都会执行   请求完成
          console.log("请求已完成");
        }
      })
    }
  })

  // 关闭窗口
  $("#close").click(function () {
    $("#shadow").hide()
  })

  // 取消
  $("#cancle").click(function () {
    $("#shadow").hide()
  })
  // console.log(window.parent.document.getElementsByClassName("set_box"));
  // console.log(parent.$("#close"));
  // console.log($("#close",parent.document));
})



function loadData(n) {
  $.ajax({
    url: "http://localhost:3000/stu_info", //请求地址
    type: "GET", //请求方式  GET POST
    async: true, //是否异步
    dataType: "json", //预期的服务器响应的数据类型  json  jsonp
    // jsonpCallback: "", //在一个jsonp中规定回调函数的名称
    contentType: "application/x-www-form-urlencoded", //发送数据到服务器时所使用的数据类型
    success: function (response) {
      //成功后的回调
      var model;
      if (response.msg == "success") {
        // console.log(response.data)
        var data = response.data;
        // $("#stu_list").find(".moban").empty();
        $("#stu_list .moban").remove();
        for (var i = (5 * n); i < 5 * (n + 1); i++) {
          model = $("#model").html().replace("$id$", i + 1).replace("$name$", data[i].name).replace("$age$", data[i].age).replace("$tel$", data[i].tel).replace("$email$", data[i].email).replace("$address$", data[i].address).replace("$date$", data[i].date).replace("$_id$", data[i]._id)
          $("#stu_list").append(model);
        }
      } else {
        alert("暂时没有学生信息")
      }
    },
    error: function (xhr, status, error) {
      //失败后的回调
      console.log(xhr);
      console.log(status);
      console.log(error);
    },
    complete: function () {
      //无论失败还是成功都会执行   请求完成
      console.log("请求已完成");
    }
  })
}

function del(id) {
  if (confirm("您确定要删除吗?")) {

  }
}

function DelSelect() {
  var Checkbox = false;
  $("input[name='id[]']").each(function () {
    if (this.checked == true) {
      Checkbox = true;
    }
  });
  if (Checkbox) {
    var t = confirm("您确认要删除选中的内容吗？");
    if (t == false) return false;
  } else {
    alert("请选择您要删除的内容!");
    return false;
  }
}