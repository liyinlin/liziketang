/**
 * Created by cz on 2016/6/20.
 */
$(function () {
    var phone=storage.getInfo("phone");
    if(phone){
        $.post("http://m.liziedu.com/account/IsSend?",{"guid":phone},function (data) {
           if(data=="success"){
               $(".wrap").show();
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
                               alert("最多18位密码");
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
               $(".submit").click(function () {
                   var pwd=$("#pwd").val();
                   var checkPwd=$("#checkPwd").val();
                   if(pwd==checkPwd){
                       if(pwd.length<6){
                           layer.msg("密码不安全，请重试",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                       }else{
                           $.post("http://m.liziedu.com/account/UpdatePwd",{"pwd":pwd,"guid":phone},function (data) {
                               if(data=="success"){
                                   location.href="login.html";
                               }else if(data=="非法操作!"){
                                   layer.msg("非法操作",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                               }else if(data=="密码一致"){
                                   layer.msg("密码与当前密码一致",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                               }
                               else{
                                   layer.msg("操作频繁，请刷新后重试",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                               }
                           });
                       }
                   }else{
                       layer.msg("密码不一致",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                   }
               });
           }else{
               location.href="index.html";
           }
        });
    }
});
