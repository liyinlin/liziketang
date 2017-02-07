/**
 * Created by cz on 2016/9/8.
 */
$(function () {
    function setDataList(json) {
        var ele="<a id='"+json.id+"' href='###' class='find_sub'><p>"+json.title+"</p><div><span>来自</span><span>"+json.type+"</span><span>"+json.floor+"</span><span>回答</span></div><div class='info'><img src='"+json.userPic+"' title='"+json.userName+"'><p>"+json.content+"</p></div></a>";
        $(".find").append($(ele));
        $("#"+json.id).click(function () {
            storage.setInfo("id",json.id)
            location.href="findDetail.html";
        });
    }
    function setDataList_pre(json) {
        var ele="<a id='"+json.id+"' href='###' class='find_sub'><p>"+json.title+"</p><div><span>来自</span><span>"+json.type+"</span><span>"+json.floor+"</span><span>回答</span></div><div class='info'><img src='"+json.userPic+"' title='"+json.userName+"'><p>"+json.content+"</p></div></a>";
        $(".find").prepend($(ele));
        $("#"+json.id).click(function () {
            storage.setInfo("id",json.id)
            location.href="findDetail.html";
        });
    }
    var maxPage=0,index=2;
    $.ajax({
        type: "GET",
        url:"http://m.liziedu.com/bbs/ListIndex?pageindex=1",   //跨域url
        dataType: "html",
        success:function (data){
            var jsonbbs=eval('(' + data + ')');
            var DataList=jsonbbs.DataList;
            maxPage=jsonbbs.TotalYeShu;
            for(var i=0;i<DataList.length;i++){
                setDataList(DataList[i]);
            }
        },
        error:function (XMLHttpRequest, textStatus,errorThrown) {
            alert(textStatus); // 调用本次AJAX请求时传递的options参数
        }
    });
    $(window).on("scroll",function () {
        if (getScrollTop() + getClientHeight() == getScrollHeight()) {
            $(".loading").show();
            $(".fontLoad").html("正在加载中...");
            if (index <= maxPage) {
                $.ajax({
                    type: "GET",
                    url: "http://m.liziedu.com/bbs/ListIndex?pageindex=" + index,   //跨域url
                    dataType: "html",
                    success: function (data) {
                        var pageData = eval('(' + data + ')');
                        var jsonbbs=eval('(' + data + ')');
                        var DataList=jsonbbs.DataList;
                        for (var i = 0; i < DataList.length; i++) {
                            setDataList(DataList[i]);
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
    $(".send").click(function () {
        $(".wrap").css("display","none");
        $(".input_title>input").val("");
        $(".input_text>textarea").val("");
        $(".comment").css({"display":'block'}).animate({'top':'0px'},300);
    });
    $(".comment .top_sub1>a:nth-child(3)").click(function (){
        $(".comment").animate({"top":document.body.clientHeight+"px"},300,function () {
            $(".comment").css("display","none");
        });
        $(".share").css("display","block");
        $(".wrap").css("display","block");
    });
    $(document).delegate(".D_send","click",function () {
        var title=$(".input_title>input").val();
        var content=$(".input_text>textarea").val();
        if(title.length>0 && content.length>0){
            $.post("http://m.liziedu.com/bbs/AddBBs",{"title":title,"content":content},function (data) {
                if(data=="errorLogin"){
                    layer.msg("未登录,登录后提问",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }else if(data=="error"){
                    layer.msg("操作频繁,请稍后",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }else{
                    var name = storage.getCookie("name");
                    if(name){
                        name = name.replace(/\//g, "%");
                    }
                    try{
                        name = decodeURI(name);
                    }catch(e){
                        name="BKWS";
                    }
                    json={
                        "content":content,
                        "id":data.id,
                        "type":data.type,
                        "userName":name,
                        "title":title,
                        "userPic":storage.getCookie("picpath"),
                        "floor":data.floor,
                    }
                    setDataList_pre(json);
                    $(".comment").animate({"top":document.body.clientHeight+"px"},300,function () {
                        $(".comment").css("display","none");
                    });
                    $(".share").css("display","block");
                    $(".wrap").css("display","block");}
            });
        }else{
            layer.msg("请输入标题和内容",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
        }
    });
})