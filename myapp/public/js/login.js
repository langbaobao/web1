$(function () {
    var show_num = [];
    draw(show_num);
    $("#canvas").on('click', function () {
        draw(show_num);
    })
    $(window).keydown(function(ev){
        if(ev.keyCode==13){
            login(show_num)
        }
    })
    $("#login").on('click', function () {
        login(show_num)
    })


    
    //生成并渲染出验证码图形
    function draw(show_num) {
        var canvas_width = $('#canvas').width();
        var canvas_height = $('#canvas').height();
        var canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
        var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode =
            "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        var aCode = sCode.split(",");
        var aLength = aCode.length; //获取到数组的长度
        for (var i = 0; i < 4; i++) { //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
            var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
            // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            var deg = Math.random() - 0.5; //产生一个随机弧度
            var txt = aCode[j]; //得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            var x = 10 + i * 20; //文字在canvas上的x坐标
            var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";
            context.translate(x, y);
            context.rotate(deg);
            context.fillStyle = randomColor();
            context.fillText(txt, 0, 0);
            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (var i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }
        for (var i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = randomColor();
            context.beginPath();
            var x = Math.random() * canvas_width;
            var y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
    }
    //得到随机的颜色值
    function randomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
})

function login(show_num){
    var user = $("#user").val();
        var psw = $("#psw").val();
        if (user!=""&&psw!="") {
            // 验证码
            var val = $("#yzcode").val().toLowerCase();
            var num = show_num.join("");
            if (val == '') {
                alert('请输入验证码！');
            } else if (val == num) {
                // alert('提交成功！');
                $.ajax({
                url: "http://localhost:3000/login", //请求地址
                type: "GET", //请求方式  GET POST
                async: true, //是否异步
                data: {
                    name: user,
                    psw:psw
                },
                // dataType: "json", //预期的服务器响应的数据类型  json  jsonp
                // jsonpCallback: "", //在一个jsonp中规定回调函数的名称
                contentType: "application/x-www-form-urlencoded", //发送数据到服务器时所使用的数据类型
                success: function (response) {
                    //成功后的回调
                    console.log(response);
                    if (response.msg == "success") {
                        window.location.href = "/views/index.html";
                        sessionStorage.setItem("username",user)
                    } else {
                        alert("账号或秘密错误，请重新输入")
                    }
                    $(".input-val").val('');
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
            } else {
                alert('验证码错误！请重新输入！');
                $(".input-val").val('');
            } 
        } else {
            alert("账号或密码不能为空")
        }
}