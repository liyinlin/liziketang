/**
 * Created by cz on 2016/9/12.
 */
$(function() {
    var name = storage.getCookie("name");
    if(name){
        name = name.replace(/\//g, "%");
    }
    try {
        name = decodeURI(name);
    }catch(e) {
        name="BKWS";
    }
    var picpath = storage.getCookie("picpath");
    var status = storage.getCookie("md_1");
    var ele = "";
    $(".content>a:nth-child(1)").html("");
    if (name && picpath) {
        $(".list:nth-child(1)").attr("href", "tools.html");
        ele += "<div><img src='" + picpath + "' alt=''></div><div><div class='name_info'>" + name + "</div></div>";
    } else {
        ele += "<div><img src='images/mine/wx@2x.png' alt=''></div><div><div>注册/登录</div><p>1秒登录，免费学习全部课程</p></div>";
    }
    $(".content>a:nth-child(1)").append($(ele));
    $(".list:nth-child(2)").click(function() {
        if (status) {
            location.href = "myVideo.html";
        } else {
            location.href = "###";
            layer.msg("未登录，登录后重试", { time: 3000, offset: ['85%', jsonStyle.left], area: jsonStyle.width });
        }
    });
    $(".list:nth-child(3)").click(function() {
        if (status) {
            location.href = "mineClass.html";
        } else {
            location.href = "###";
            layer.msg("未登录，登录后重试", { time: 3000, offset: ['85%', jsonStyle.left], area: jsonStyle.width });
        }
    });
    $(".list:nth-child(4)").click(function() {
        if (status) {
            location.href = "myInfo.html";
        } else {
            location.href = "###";
            layer.msg("未登录，登录后重试", { time: 3000, offset: ['85%', jsonStyle.left], area: jsonStyle.width });
        }
    });
    $(".list:nth-child(5)").click(function() {
        if (status) {
            location.href = "Settings.html";
        } else {
            location.href = "###";
            layer.msg("未登录，登录后重试", { time: 3000, offset: ['85%', jsonStyle.left], area: jsonStyle.width });
        }
    });
});