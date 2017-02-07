/**
 * Created by cz on 2016/11/28.
 */
$(function () {
    $(".list").click(function () {
        var index=$(this).index();
        if(index==0){
            $(".tel").show(0,function () {
                $(".tel .tel_text").stop(true,true).animate({
                    "bottom":"0px"
                },300);
            });
        }
        if(index==1){
            /*$(".share").css("display","none");
            $(".wrap").css("display","none");*/
            $(".input_text>textarea").val("");
            $(".comment").show(0,function (){
                $(".comment").stop(true,true).animate({
                    'right':'0px'
                },300);
            });
        }
    });
    $(document).delegate(".comment .top_sub1>a:nth-child(3)","click",function (){
        $(".comment").stop(true,true).animate({
            "right":"-640px"
        },300,function () {
            $(".comment").hide();
        });
       /* $(".share").css("display","block");
        $(".wrap").css("display","block");*/
    });
    $(document).delegate(".tel_qx","click",function () {
        $(".tel .tel_text").stop(true,true).animate({
            "bottom":"-270px"
        },300,function () {
           $(".tel").hide();
        });
    })
    $(document).delegate(".top_sub1>a:nth-child(2)","click",function () {
        var content=$(".input_text>textarea").val();
        if(content.length>0){
            $.post("http://m.liziedu.com/Pay/Add",{"info":content},function(data){
                if(data.prepay_id=="1"){
                    layer.msg("谢谢你的反馈！！", { time: 3000, offset: ['85%', jsonStyle.left], area: jsonStyle.width });
                }else{
                    layer.msg("对不起，你的反馈出错了", { time: 3000, offset: ['85%', jsonStyle.left], area: jsonStyle.width });
                }
            });
        }else{
            layer.msg("你要进行反馈吗？", { time: 3000, offset: ['85%', jsonStyle.left], area: jsonStyle.width });
        }
    });
    $(".submit").click(function () {
        $.get("http://m.liziedu.com/account/dropout",function (data) {
            location.href="index.html";
        })
    });
})