$(function () {
    // 退出登录
    $("#back").click(function () {
        sessionStorage.removeItem("username");
        window.location.href = "/views/login.html"
    })

    var username = sessionStorage.getItem("username");
    if (username) {
        $.ajax({

        })
    } else {
        alert("请登录");
        window.location.href = "/views/login.html"
    }
    $(".leftnav h2").click(function () {
        $(this).next().slideToggle(200);
        $(this).toggleClass("on");
    })
    $(".leftnav ul li a").click(function () {
        $("#a_leader_txt").text($(this).text());
        $(".leftnav ul li a").removeClass("on");
        $(this).addClass("on");
    })

    // 关掉修改窗口
    $("#close").click(function(){
        $("#shadow").hide()
    })
    // 取消
    $("#cancle").click(function(){
        $("#shadow").hide()
    })
});