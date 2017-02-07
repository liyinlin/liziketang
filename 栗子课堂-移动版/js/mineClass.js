/**
 * Created by cz on 2016/7/26.
 */
$(function() {
    var scroll=[0,0,0];
    var flag_s=$(".lizi1").html();;
    var ajaxIndex=["&type=3","&type=1","&type=0"];
    var swiper = new Swiper('.swiper-container', {
        autoHeight: true,
        onSwiperCreated: function () {
        },
        onSlideChangeEnd: function (swiper) {
            swiper.updateContainerSize();
        },
        onSlideChangeStart: function (swiper) {
            $(".class_top>div").css("color","#333");
            $(".class_top>div").eq(swiper.activeIndex).css("color","#1abd9b");
            $(window).scrollTop(scroll[swiper.activeIndex]);
            flag_s=$(".lizi"+(swiper.activeIndex+1)).html();
            ajaxInfo();
        }
    });
    $(window).on("scroll",function () {
        scroll[swiper.activeIndex]=$(window).scrollTop();
    });
    $(".swiper-slide").css({"min-height":document.body.clientHeight-156+"px"});
    $(".class_top>div").click(function () {
        $(".class_top>div").css("color","#333");
        $(this).css("color","#1abd9b");
        swiper.slideTo($(this).index(),500,true);
        swiper.update();
    });
    function getListPageOne(json) {
        var ele="";
        if(json.picPath.indexOf("Uploads/")>-1){
            var picPath=json.picPath.split("Uploads/");
            json.picPath="http://g.liziedu.com/Uploads/"+picPath[1];
        }
        if(json.status==0 && json.nowPrice>0){
            ele+="<div class='clear "+json.id+"' href='###'><div class='lizi_img'><img src='"+json.picPath+"' alt=''></div><div class='lizi_text lizi_text1'><div>"+json.title+"</div><div>￥"+json.nowPrice+"<i>原价 ："+json.oldPrice+"</i></div><div class='add1'>待付款</div><div><a class='add2' href='###'>支付</a></div></div></div>";
        }else{
            if(json.nowPrice>0){
                ele+="<a class='clear "+json.id+"' href='###'><div class='lizi_img'><img src='"+json.picPath+"' alt=''></div><div class='lizi_text'><div>"+json.title+"</div><div>￥"+json.nowPrice+"<i>原价 ："+json.oldPrice+"</i></div></div></a>";
            }else{
                ele+="<a id='"+json.id+"' class='clear' href='###'><div class='lizi_img'><img src='"+json.picPath+"' title='"+json.title+"'></div><div class='lizi_text'><div>"+json.title+"</div><div class='free'>免费</div></div></a>";
            }
        }
        $(".lizi1").append($(ele));
        $("."+json.id).click(function () {
            storage.setInfo("id",json.lid);
            if(json.status){
                location.href="player.html";
            }else{
                location.href="offer.html";
            }
        });
        swiper.updateContainerSize();
    }
    function getListPageTwo(json) {
        var ele="";
        if(json.picPath.indexOf("Uploads/")>-1){
            var picPath=json.picPath.split("Uploads/");
            json.picPath="http://g.liziedu.com/Uploads/"+picPath[1]
        }
        if(json.nowPrice>0){
            ele+="<a class='clear "+json.id+"' href='###'><div class='lizi_img'><img src='"+json.picPath+"' alt=''></div><div class='lizi_text'><div>"+json.title+"</div><div>￥"+json.nowPrice+"<i>原价 ："+json.oldPrice+"</i></div></div></a>";
        }else{
            ele+="<a id='"+json.id+"' class='clear' href='###'><div class='lizi_img'><img src='"+json.picPath+"' title='"+json.title+"'></div><div class='lizi_text'><div>"+json.title+"</div><div class='free'>免费</div></div></a>";
        }
        $(".lizi2").append($(ele));
        $("."+json.id).click(function () {
            storage.setInfo("id",json.lid);
            if(json.status){
                location.href="player.html";
            }else{
                location.href="offer.html";
            }
        });
        swiper.updateContainerSize();
    }
    function getListPageThree(json) {
        var ele="";
        if(json.picPath.indexOf("Uploads/")>-1){
            var picPath=json.picPath.split("Uploads/");
            json.picPath="http://g.liziedu.com/Uploads/"+picPath[1]
        }
        if(json.status==0 && json.nowPrice>0){
            ele+="<div class='clear "+json.id+"' href='###'><div class='lizi_img'><img src='"+json.picPath+"' alt=''></div><div class='lizi_text lizi_text1'><div>"+json.title+"</div><div>￥"+json.nowPrice+"<i>原价 ："+json.oldPrice+"</i></div><div class='add1'>待付款</div><div><a class='add2' href='###'>支付</a></div></div></div>";
        }
        $(".lizi3").append($(ele));
        $("."+json.id).click(function () {
            storage.setInfo("id",json.lid);
            storage.setInfo("orderID",json.id);
            location.href="offer.html";
        });
        swiper.updateContainerSize();
    }
    function ajaxInfo() {
        $(".prev").hide();
        if(!flag_s){
            $.ajax({
                type: "GET",
                url:"http://m.liziedu.com/Order/IndexOrder?pageindex=1"+ajaxIndex[swiper.activeIndex],   //跨域url
                dataType: "html",
                success:function (data){
                    var jsonList=eval('(' + data + ')');
                    if(jsonList=="errorLogin"){
                        $(".prev>p").html("未登录");
                        $(".prev").show();
                        layer.msg("未登录,暂无购买视频",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                    }else{
                        var DataList=jsonList;
                        if(swiper.activeIndex==2){
                            for(var i=0;i<DataList.length;i++){
                                getListPageThree(DataList[i]);
                            }
                        }else if(swiper.activeIndex==1){
                            for(var i=0;i<DataList.length;i++){
                                getListPageTwo(DataList[i]);
                            }
                        }else{
                            for(var i=0;i<DataList.length;i++){
                                getListPageOne(DataList[i]);
                            }
                        }
                        swiper.update();
                        if($(".lizi"+(swiper.activeIndex+1)+">a").size()>0 || $(".lizi"+(swiper.activeIndex+1)+">div").size()>0){
                            $(".prev").hide();
                        }else{
                            $(".prev").show();
                        }
                    }
                },
                error:function (XMLHttpRequest, textStatus,errorThrown) {
                    alert(textStatus); // 调用本次AJAX请求时传递的options参数
                }
            });
        }
    }
    ajaxInfo();
});

