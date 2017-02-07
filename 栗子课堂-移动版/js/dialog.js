/**
 * Created by cz on 2016/6/17.
 */
$(function () {
    var flag=true;
    $(".dialog .tips").on('touchstart mousedown',function(e){
        e.preventDefault();
        if(flag){
            $(".dialog").stop().stop().animate({"bottom":"0px"});
            $(".tips>img").attr("src","images/login/bottom.png");
            flag=false;
        }else{
            $(".dialog").stop().stop().animate({"bottom":"-272px"});
            $(".tips>img").attr("src","images/login/top.png");
            flag=true;
        }
    });
    $(".dialog .case").click(function () {
        layer.msg("功能开发中...",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
    })
})
