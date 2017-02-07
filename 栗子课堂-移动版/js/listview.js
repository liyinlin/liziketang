/**
 * Created by cz on 2016/7/1.
 */
/*课程筛选*/
$(function () {
/*    $(".list_title>div").on("touchstart mousedown",function (e) {
        /!*e.preventDefault();*!/
        $(".list_title>div").css("color","#333333");
        $(this).css("color","#1fbd9d");
        $(".Menu_sub>div").css({"display":"none"});
        $(".Menu_sub").stop().stop().animate({
            "left":$(this).index()*49.5%+"px"
        });
        $(".Menu_sub>div").eq($(this).index()).css({"display":"block"});
        $(".list_title>div>img").attr("src","images/index/bottom.png");
        $(this).children("img").attr("src","images/index/top.png")
    });*/
    function getListIndex(json) {
        var ele="<a class='"+json.id+"' href='listview.html?name="+json.name+"&type="+json.id+"'>";
        ele+="<img src='"+json.picPath+"' alt='"+json.name+"'>";
        ele+="<span>"+json.name+"</span>";
        ele+="</a>";
        return $(ele);
    }
    var info="",infos="";
    if(storage.getQueryString("type")){
        info=storage.getQueryString("name");
        infos=storage.getQueryString("type");
        storage.setInfo("type","type");
    }else if(storage.getQueryString("content")){
        info=storage.getQueryString("content");
        infos=info;
        storage.setInfo("type","name");
    }
    $("#searchF").val(info);
    var type=storage.getInfo("type");
    function getDataList(json){
        var ele="";
        if(json.picPath.indexOf("Uploads") > -1){
            var picPath=json.picPath.split("Uploads");
            json.picPath="http://g.liziedu.com/Uploads"+picPath[1];
        }
        if(json.nowPrice>0){
            ele+="<a id='"+json.id+"' class='clear' href='###'><div class='lizi_img'><img src='"+json.picPath+"'title='"+json.title+"'></div><div class='lizi_text'><div>"+json.title+"</div><div>￥"+json.nowPrice+"<i>原价 ：￥"+json.oldPrice+"</i></div><div><div>"+json.lessonNum+"课时<i>"+json.time+"分钟</i></div><div>"+json.lessonPersons+"人学习</div></div></div></a>"
        }else{
            ele+="<a id='"+json.id+"' class='clear' href='###'><div class='lizi_img'><img src='"+json.picPath+"' title='"+json.title+"'></div><div class='lizi_text'><div>"+json.title+"</div><div class='free'>免费</div><div><div>"+json.lessonNum+"课时<i>"+json.time+"分钟</i></div><div>"+json.lessonPersons+"人学习</div></div></div></a>";
        }
        $(".lizi").append(ele);
        $("#"+json.id).click(function(){
            storage.setInfo("id",json.id);
            location.href="player.html";
        });
    }
    var maxPage=0,index=2;
    if(type){
        $.get("http://m.liziedu.com/home/Index1?pageindex=1&"+type+"="+infos,function (data) {
            var jsonIndex=data;
            $(".lizi").html("");
            maxPage=jsonIndex.pageData.TotalYeShu;
            var pageData=jsonIndex.pageData;
            var DataList=pageData.DataList;
            for(var i=0;i<DataList.length;i++){
                getDataList(DataList[i]);
            }
            $(".morea").hide();
        });
        $(window).on("scroll",function () {
            if (getScrollTop() + getClientHeight() == getScrollHeight()) {
                if (index <= maxPage) {
                    $(".morea").show();
                    $(".loading").show();
                    $(".fontLoad").html("正在加载中...");
                    $.get("http://m.liziedu.com/home/Index1?pageindex="+index+"&"+type+"="+infos,function (data) {
                            var pageData = data;
                            var DataList = pageData.DataList;
                            for (var i = 0; i < DataList.length; i++) {
                                getDataList(DataList[i]);
                            }
                            if (index > maxPage) {
                                $(".morea").hide();
                            } else {
                                $(".loading").hide();
                                $(".fontLoad").html("滑动加载更多");
                            }
                    });
                    index++;
                }
            }
        });
    }
    $(".searchF>img:nth-child(3)").click(function () {
        var content=$(this).prev().val();
        location.href="listview.html?content="+content;
    });
    var list_flag_1=true;
    $(".list_title>div:nth-child(1)").on("click",function (e){
        $(".list_title>div").eq(1).css("color","#333333");
        list_flag_2=true;
        if(list_flag_1){
            $(this).css("color","#1fbd9d");
            $(".Menu_sub>div").eq($(this).index()).css({"display":"block"});
            $(this).children("img").attr("src","images/index/top.png");
            list_flag_1=false;
        }else{
            $(this).css("color","#333333");
            $(".Menu_sub>div").eq($(this).index()).css({"display":"none"});
            $(this).children("img").attr("src","images/index/bottom.png");
            list_flag_1=true;
        }
    });
    var list_flag_2=true;
    $(".list_title>div:nth-child(2)").on("click",function (e) {
        $(".list_title>div").eq(0).css("color","#333333");
        $(".list_title>div").eq(0).children("img").attr("src","images/index/bottom.png");
        $(".Menu_sub>div").eq(0).css({"display":"none"});
        list_flag_1=true;
        if(list_flag_2){
            $(this).css("color","#1fbd9d");
            list_flag_2=false;
        }else{
            $(this).css("color","#333333");
            list_flag_2=true;
        }
    });
    $(".list_title>div").click(function (e) {
        e.preventDefault();
    });
    $(".search,.lizi").click(function (e) {
        $(".Menu_sub>div").css({"display":"none"});
    });
    $("#searchF").on("touchstart mousedown",function (e) {
        $(".classFind .classSub").html("");
        e.preventDefault();
        $.get("http://m.liziedu.com/ios/Catalogue/index",function (data) {
            for(var i=0;i<data.length;i++){
                $(".classFind .classSub").append(getListIndex(data[i]));
            }
        });
        $(".classFind").css("display","block");
        $(".classFind").stop(true,true).animate({"right":"0px"},100,function () {
            $(".listVideo").hide();
        });
    });
    $("#searchF").click(function (e) {
        e.preventDefault();
    });
    $(".searchF_back").click(function (e) {
        $(".listVideo").show();
        $(".classFind").stop(true,true).animate({"right":"-640px"},function () {
            $(".classFind").css("display","none");
        });
    });
})
