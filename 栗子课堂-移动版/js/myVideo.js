/**
 * Created by cz on 2016/11/21.
 */
$(function () {
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
    $.get("http://m.liziedu.com/Order/GetUserOrderList",function(data) {
        var jsonList=data;
        if(jsonList=="errorLogin"){
            $(".prev>p").htm("未登录");
            $(".prev").show();
            layer.msg("未登录,暂无购买视频",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
        }else{
            var DataList=jsonList;
            for(var i=0;i<DataList.length;i++){
                getDataList(DataList[i]);
            }
            if($(".lizi>a").size()>0){
                $(".prev").hide();
            }else{
                $(".prev").show();
            }
        }
    })
})