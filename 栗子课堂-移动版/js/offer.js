/**
 * Created by cz on 2016/7/25.
 */
$(function () {
    $(".active").find(".dui").css("background","url(images/offer/dui.png) no-repeat");
    $(".active").find(".dui").prev().prop("checked",true);
    $(".dui").click(function () {
        $(".dui").css("background","url(images/offer/no_dui.png) no-repeat");
        if(($(this).prev())[0].checked){
            $(this).css("background","url(images/offer/no_dui.png) no-repeat");
            $(this).prev().removeProp("checked");
        }else{
            $(this).css("background","url(images/offer/dui.png) no-repeat");
            $(this).prev().prop("checked",true);
        }
    });
    var id=storage.getInfo("id");
    if(id){
        console.log(id);
        $.post("http://m.liziedu.com/order/AddOrder",{"lessonname_id":id},function(data){
            if(data.code=="success"){
                $(".wrap").attr("id",data.orderID);
                $(".name").html(data.title);
                $(".color").html("￥"+data.price);
            }else if(data=="errorLogin"){
                location.href="login.html";
            }
        });
    }else{
        location.href="index.html";
    }
    $(document).delegate(".input_offer>a","click",function () {
        var zf_name=$("input[name='check']:checked").val();
        if(zf_name=="余额支付"){
            $(".code").show();
        }else if(zf_name=="微信支付"){
            layer.msg("暂未开通，请使用余额支付",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
        }
    });
    $(document).delegate(".button_code>a:nth-child(1)","click",function () {
        $(".code").hide();
    });
    $(document).delegate(".button_code>a:nth-child(2)","click",function () {
        var pwd=$(".code_input>input").val();
        if(pwd.length>0){
            $.post("http://m.liziedu.com/order/PayPrice",{"id":$(".wrap").attr("id"),"pwd":pwd},function (data) {
                if(data=="errorLogin"){
                    location.href="index.html";
                }else if(data=="errorPwd"){
                    layer.msg("密码错误",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }else if(data=="success"){
                    layer.msg("支付成功",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                    location.href="player.html";
                }else if(data="errorNo"){
                    layer.msg("余额不足,请充值",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }else if(data=="error"){
                    layer.msg("数据出错,请重试",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }
            });
        }else{
            layer.msg("请输入密码",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
        }
    });
})