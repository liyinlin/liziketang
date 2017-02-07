/**
 * Created by cz on 2016/6/20.
 */
$(function () {
    var regxs1 = [];
    regxs1.push(/^1\d{10}$/g);
    var pwd=document.getElementById("phone");
    phone.onblur=function() {
        if (this.value) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.value.match(regxs1[0])) {
                    this.style.background="url(images/login/zhengque.png) 560px center no-repeat";
                } else {
                    this.style.background="url(images/login/cuowu.png) 560px center no-repeat";
                }
            }
        }
    }
    var phone_val="";
    var j=0;
    $(".button").click(function () {
        phone_val=$("#phone").val();
        if(phone_val.length>0){
            if (phone_val) {
                if (phone_val.match(regxs1[0])) {
                    $(".code").show();
                    $(".code_input>img").attr("src","http://m.liziedu.com/account/CheckCode?v="+j);
                    $(".code_input>input").val("");
                    j++;
                } else {
                    layer.msg("请输入正确的手机号",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }
            }
        }else{
            layer.msg("手机号未输入",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
        }
    });
    var i=0;
    $(".code_input>img").click(function () {
        $(this).attr("src","http://m.liziedu.com/account/CheckCode?v="+i);
        i++;
    });
    $(".button_code>a:nth-child(1)").click(function () {
        $(".code").hide();
    });
    function backTime(i) {
        var nowTime=new Date();
        var targetTime=nowTime.getTime()+60000;
        var time=(targetTime-nowTime.getTime())/1000;
        return time-i;
    }
    $(".button_code>a:nth-child(2)").click(function () {
        var phone_val=$("#phone").val();
        var code_val=$(".code_input>input").val();
        if(code_val.length>0){
            $.post("http://m.liziedu.com/account/SendPwd",{"phone":phone_val,"codepic":code_val},function(data){
                if(data=="success"){
                    $(".code").hide(0,function () {
                        layer.msg("动态码获取成功",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                    });
                    var time_back=0;
                    $(".button").val(backTime(time_back)+"s");
                    setInterval(function () {
                        if(backTime(time_back)>0){
                            time_back++;
                            $(".button").val(backTime(time_back)+"s");
                            $(".button").attr("disabled",true);
                        }else{
                            $(".button").val("获取验证码");
                            $(".button").attr("disabled",false);
                        }
                    },1000);
                }else if(data=="帐号不存在！"){
                    layer.msg("手机号未注册，请重试",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }else if(data=="请输入正确的验证码"){
                    layer.msg("请输入正确的验证码",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }else{
                    layer.msg("请求未被执行",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }
            });
        }else{
            layer.msg("请输入验证码",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
        }
    });
    $(".submit").click(function () {
        var phone_val=$("#phone").val();
        var code_val=$("#code").val();
        if(code_val.length>0){
            $.post("http://m.liziedu.com/account/IsVerify",{"phone":phone_val,"code":code_val},function (data) {
                if(data=="请输入正确验证码"){
                    layer.msg("请输入正确验证码",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }else {
                    storage.setInfo("phone",data);
                    location.href="resetPwd.html";
                }
            })
        }else{
            layer.msg("请输入验证码或手机号",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
        }
    });
})
