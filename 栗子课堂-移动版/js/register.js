/**
 * Created by cz on 2016/6/17.
 */
$(function () {
    var regxs = [];
    regxs.push(/[^a-zA-Z0-9_]/g);
    regxs.push(/[a-zA-Z]/g);
    regxs.push(/[0-9]/g);
    var pwd=document.getElementById("pwd");
    pwd.onkeyup=function(){
        var val = this.value;
        var len = val.length;
        var length = 0;
        var result=0;
        if (len >= 6) { // 至少6个字符
            for (var i = 0; i < regxs.length; i++) {
                if (val.match(regxs[i])) {
                    length++;
                }
                if (len > 18) {// 至多18个字符
                    layer.msg("最多18位密码",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }
            }
        }else if(len == 0){
            $("#pwdCheck>div").css("background","#f2f2f2");
            $("#pwdCheck>div").eq(0).css("background","#bf260b");
            $("#pwdCheck>p").html("弱");
        }
        result = (length / regxs.length) * 100;
        if(result > 0 && result <= 50){
            $("#pwdCheck>div").css("background","#f2f2f2");
            $("#pwdCheck>div").eq(0).css("background","#bf260b");
            $("#pwdCheck>p").html("弱");
        }else if (result > 50 && result < 100) {
            $("#pwdCheck>div").css("background","#f2f2f2");
            $("#pwdCheck>div").eq(1).css("background","#bf260b");
            $("#pwdCheck>p").html("中");
        }else if (result == 100) {
            $("#pwdCheck>div").css("background","#f2f2f2");
            $("#pwdCheck>div").eq(2).css("background","#bf260b");
            $("#pwdCheck>p").html("高");
        }
    }
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
    var area1 = new LArea();
    area1.init({
        'trigger': '#demo', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
        'valueTo': '#city', //选择完毕后id属性输出到该位置
        'keys': {
            id: 'id',
            name: 'name'
        }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
        'type': 1, //数据源类型
        'data': LAreaData //数据源
    });
    area1.value=[0,0,0];//控制初始位置，注意：该方法并不会影响到input的value
    $(".form_sub>div:nth-child(3)").click(function () {
        $(".sex").show();
    });
    $(".sex_info>div:nth-child(2)").click(function () {
        $(".sex_info>div>img").attr("src","images/tools/select_hui.png");
        $(this).children("img").attr("src","images/tools/select.png");
        $(".form_sub>div:nth-child(3)>input:nth-child(2)").val("男");
        $(".sex").hide();
    });
    $(".sex_info>div:nth-child(3)").click(function () {
        $(".sex_info>div>img").attr("src","images/tools/select_hui.png");
        $(this).children("img").attr("src","images/tools/select.png");
        $(".form_sub>div:nth-child(3)>input:nth-child(2)").val("女");
        $(".sex").hide();
    });
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
    var code_val="";
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
        code_val=$(".code_input>input").val();
        if(code_val.length>0){
            $.post("http://m.liziedu.com/account/Send",{"phone":$("#phone").val(),"codepic":code_val},function(data){
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
                }else if(data=="手机号已经被注册！"){
                    layer.msg("手机号已注册，请重试",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
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
        var sex_change=true;
        var length_pwd=$("#pwd").val().length;
        if(length_pwd<6 && length_pwd >0){
            layer.msg("密码不安全",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
        }else{
            if($("#phone").val() && $("#city").val() && $("#sex").val() && $("#pwd").val() && $("#code_float").val()){
                if($("#sex").val()=="男"){
                    sex_change=true;
                }else{
                    sex_change=false;
                }
                var address_info=$("#city").val().split(" ");
                var address=address_info[0] + ((address_info[1])?(',' + address_info[1]):(''))+ ((address_info[2])?(',' + address_info[2]):(''));
                $.post("http://m.liziedu.com/account/Register",{"mobile":$("#phone").val(),"city1":address,"gender":sex_change,"pwd":$("#pwd").val(),"code":$("#code_float").val()},function (data) {
                    if(data=='success'){
                        location.href="mine.html";
                    }else{
                        layer.msg("操作太频繁，请稍后",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                    }
                })
            }else{
                layer.msg("请完成注册信息",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
            }
        }
    });
})