/**
 * Created by cz on 2016/9/8.
 */
$(function () {
    function getDataList(json){
        var ele="";
        if(json.picPath.indexOf("Uploads") > -1){
            var picPath=json.picPath.split("Uploads");
            json.picPath="http://g.liziedu.com/Uploads"+picPath[1];
        }
        if(json.nowPrice>0){
            ele+="<a id='"+json.id+"' class='clear' href='###'><div class='lizi_img'><img src='"+json.picPath+"'title='"+json.title+"'></div><div class='lizi_text'><div>"+json.title+"</div><div>￥"+json.nowPrice+"<i>原价 ：￥"+json.oldPrice+"</i></div></div></div></a>"
        }else{
            ele+="<a id='"+json.id+"' class='clear' href='###'><div class='lizi_img'><img src='"+json.picPath+"' title='"+json.title+"'></div><div class='lizi_text'><div>"+json.title+"</div><div class='free'>免费</div></div></a>";
        }
        $(".lizi_Down").append(ele);
        $("#"+json.id).click(function(){
            storage.setInfo("id",json.id);
            location.href="player.html";
        });
    }
    $.get("http://m.liziedu.com/Lesson/collList",function (data) {
        if(data=="errorLogin"){
            $(".prev").show();
            $(".prev>p").html("暂未登录");
            $(".prev>a").css("display","block");
        }else if(data=="error"){
            $(".prev>img").attr("src","images/icon-shibai.png");
            $(".prev>p").html("加载失败！！");
        }else{
            var DataList=data;
            for(var i=0;i<DataList.length;i++){
                getDataList(DataList[i]);
            }
        }
        if($(".lizi_Down>a").size()>0){
            $(".prev").hide();
            $(".lizi_Down").show();
        }else{
            $(".prev").show();
            $(".lizi_D").hide();
        }
    });
})
