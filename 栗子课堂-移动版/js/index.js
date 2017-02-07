/**
 * Created by cz on 2016/6/15.
 */
$(function () {
    /*课程分类*/
    $(".classCat>a").click(function (e) {
        $(".wrap").css("display","block");
        $(".classCats").stop(true,true).animate({"right":"-640px"},function () {
            $(".classCats").css("display","none");
        });
    });
    $(".classCatSd>img:nth-child(1)").click(function (e) {
        $(".classCats .classSub").html("");
        $.get("http://m.liziedu.com/ios/Catalogue/index",function (data) {
            for(var i=0;i<data.length;i++){
                $(".classCats .classSub").append(getListIndex(data[i]));
            }
        });
        $(".classCats").css("display","block").stop(true,true).animate({"right":"0px"},100,function () {
            $(".wrap").css("display","none");
        });
    });
    /*最近学习*/
    function getHistory(json) {
        var ele="<div class='rc_sub'><div>"+json.enddt+"</div>";
        for(var i=0;i<json.history.length;i++){
            ele+="<div><div>"+json.history[i].lessonname+"</div>";
            for(var j=0;j<json.history[i].names.length;j++){
                ele+="<p>"+json.history[i].names[j]+"</p>";
            }
            ele+="</div>";
        }
        ele+="<div class='quan'></div></div>";
        return $(ele);
    }
    function getListIndex(json) {
         var ele="<a class='"+json.id+"' href='listview.html?name="+json.name+"&type="+json.id+"'>";
             ele+="<img src='"+json.picPath+"' alt='"+json.name+"'>";
             ele+="<span>"+json.name+"</span>";
             ele+="</a>";
         return $(ele);
    }
    $(".search>div:nth-child(4)").click(function(e){
        $.post("http://m.liziedu.com/home/userHistoryOne",function (data) {
            if(data=="errorLogin"){
                layer.msg("未登录，请登录后重试",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
            }else{
                $(".recent_sub").html("");
                for(var i=0;i<data.length;i++){
                    $(".recent_sub").append(getHistory(data[i]));
                }
                $(".recents").css("display","block").stop(true,true).animate({"right":"0px"},100,function () {
                    $(".wrap").css("display","none");
                });
            }
        });
    });
    $(".recent>a:nth-child(2)").click(function (e) {
        $(".wrap").css("display","block");
        $(".recents").stop(true,true).animate({"right":"-640px"},function () {
            $(".recents").css("display","none");
        });
    });
    $("#search").on("touchstart mousedown",function (e) {
        $(".classFind .classSub").html("");
        e.preventDefault();
        $.get("http://m.liziedu.com/ios/Catalogue/index",function (data) {
            for(var i=0;i<data.length;i++){
                $(".classFind .classSub").append(getListIndex(data[i]));
            }
        });
        $(".classFind").css("display","block");
        $(".classFind").stop(true,true).animate({"right":"0px"},100,function () {
            $(".wrap").hide();
        });
    });
    $(".searchF_back").click(function (e) {
        $(".wrap").show();
        $(".classFind").stop(true,true).animate({"right":"-640px"},function () {
            $(".classFind").css("display","none");
        });
    });
    $(".searchF>img:nth-child(3)").click(function () {
        var content=$(this).prev().val();
        location.href="listview.html?content="+content;
    });
    function getPicList(json) {
        var ele="<div class='swiper-slide slide_2'><a href='"+json.Tiaourl+"'><img src='"+json.path+"' title='"+json.title+"'></a></div>";
        return ele;
    }
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
    $.ajax({
        type: "GET",
        url:"http://m.liziedu.com/home/index1?pageindex=1",   //跨域url
        dataType: "html",
        success:function (data){
            var jsonIndex=eval('(' + data + ')');
            maxPage=jsonIndex.pageData.TotalYeShu;
            var picList=jsonIndex.picList;
            for(var i=0;i<picList.length;i++){
                $(".wrapper_2").append(getPicList(picList[i]));
            }
            var swiper1 = new Swiper('.swiper_2', {
                autoplay:2500,
                loop:true,
            });
            var pageData=jsonIndex.pageData;
            var DataList=pageData.DataList;
            for(var i=0;i<DataList.length;i++){
                getDataList(DataList[i]);
            }
            $(".morea").hide();
        },
        error:function (XMLHttpRequest, textStatus,errorThrown) {
            alert(textStatus); // 调用本次AJAX请求时传递的options参数
        }
    });
    $(window).on("scroll",function () {
        if (getScrollTop() + getClientHeight() == getScrollHeight()) {
            if (index <= maxPage) {
                $(".morea").show();
                $(".loading").show();
                $(".fontLoad").html("正在加载中...");
                $.ajax({
                    type: "GET",
                    url: "http://m.liziedu.com/home/index1?pageindex=" + index,   //跨域url
                    dataType: "html",
                    success: function (data) {
                        var pageData = eval('(' + data + ')');
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
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(textStatus); // 调用本次AJAX请求时传递的options参数
                    }
                });
                index++;
            }
        }
    });
});


