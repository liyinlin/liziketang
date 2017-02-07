/**
 * Created by cz on 2016/6/17.
 */
$(function(){
    $(".submit").click(function(){
        var username=$("#username").val();
        var password=$("#password").val();
        if(username && password){
            $.post("http://m.liziedu.com/account/Login",{"username":username,"password":password},function(data){
                if(data=="success"){
                    location.href="mine.html";
                }else{
                    layer.msg("账号或密码错误",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }
            });
        }else{
            layer.msg("账号或密码为空",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
        }
    });
    var regxs1 = [];
    regxs1.push(/^[a-zA-z]\w{3,15}$/g);
    regxs1.push(/^1\d{10}$/g);
    regxs1.push(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/g);
    var username=document.getElementById("username");
    username.onblur=function () {
        if (this.value) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.value.match(regxs1[0]) || this.value.match(regxs1[1]) || this.value.match(regxs1[2])) {
                    this.style.background="url(images/login/zhengque.png) 560px center no-repeat";
                } else {
                    this.style.background="url(images/login/cuowu.png) 560px center no-repeat";
                }
            }
        }
    }
});
