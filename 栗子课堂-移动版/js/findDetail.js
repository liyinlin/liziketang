/**
 * Created by cz on 2016/9/8.
 */
$(function () {
    $(".back").click(function () {
        $(".wrap").show();
        $(".comment").stop(true,true).animate({"top":"100%"},function () {
           $(".comment").hide();
        });
    });
    function getInfo(json) {
        var ele="<p>"+json.type+"</p><p>"+json.content+"</p><div class='clear'><span>提问者 :</span><span>"+json.userName+"</span><span>"+json.floor+"</span><span>条回答</span></div><div class='pls'><div><img src='images/bottomNav/pl-hui.png' alt=''></div></div>";
        return $(ele);
    }
    function setReply(json) {
        var ele="<div id='"+json.id+"' class='sub_active'><div class='name'><img src='"+json.userPicPath+"'><span>"+json.userName+"</span><span>"+json.date+"</span></div><p class='name_p'>"+json.content+"</p><div class='pl'><div><img src='images/bottomNav/shou-hui-up.png'><span>"+json.praise+"</span></div><div><img src='images/bottomNav/shou-hui-down.png'><span>"+json.trample+"</span></div><div><span>"+json.count+"</span><img src='images/bottomNav/pl-hui.png'></div></div><div class='backContent_click'>查看回复<img class='bottom_display' src='images/login/bottom.png'></div><div class='backContent'></div></div>";
        return $(ele);
    }
    function getbackReply(json) {
        var ele="<div id='"+json.id+"'><span>"+json.userName+"</span><span>:</span><span>"+json.content+"</span></div>";
        return $(ele);
    }
    function setReplayLogin(json){
        var ele="<div id='"+json.id+"' class='sub_active'><div class='name'><img src='"+json.userPicPath+"'><span>"+json.userName+"</span><span>"+json.date+"</span></div><p class='name_p'>"+json.content+"</p>";
        if(json.type=="0"){
            ele+="<div class='pl'><div><img src='images/bottomNav/shou-orange-up.png'><span  style='color: #ea8010;'>已赞</span></div><div><img src='images/bottomNav/shou-hui-down.png'><span>"+json.trample+"</span>";
        }else if(json.type=="1"){
            ele+="<div class='pl'><div><img src='images/bottomNav/shou-hui-up.png'><span>"+json.praise+"</span></div><div><img src='images/bottomNav/shou-orange-down.png'><span  style='color: #ea8010;'>已踩</span>";
        }else{
            ele+="<div class='pl'><div><img src='images/bottomNav/shou-hui-up.png'><span>"+json.praise+"</span></div><div><img src='images/bottomNav/shou-hui-down.png'><span>"+json.trample+"</span>";
        }
        ele+="</div><div><span>"+json.count+"</span><img src='images/bottomNav/pl-hui.png'></div></div><div class='backContent_click'>查看回复<img class='bottom_display' src='images/login/bottom.png'></div><div class='backContent'></div></div>";
        $(".question_sub").append($(ele));
    }
    var maxPage=0,index=2,flag=true,rid=0;
    var id=storage.getInfo("id");
    if(id){
        $.ajax({
            type: "GET",
            url:"http://m.liziedu.com/bbs/BbsInfo?pageindex=1&bid="+id,   //跨域url
            dataType: "html",
            success:function (data){
                var jsonBBs_info=eval('(' + data + ')');
                console.log(jsonBBs_info);
                $(".start").append(getInfo(jsonBBs_info.bbsInfo));
                var DataList=jsonBBs_info.PageDataList.DataList;
                if(jsonBBs_info.islogin=="true"){
                    for(var i=0;i<DataList.length;i++){
                        setReplayLogin(DataList[i]);
                    }
                }else{
                    for(var i=0;i<DataList.length;i++){
                        $(".question_sub").append(setReply(DataList[i]));
                    }
                }
                $(".morea").hide();
                maxPage=jsonBBs_info.PageDataList.TotalYeShu;
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
                         url: "http://m.liziedu.com/bbs/BbsInfo?pageindex="+index+"&bid="+id,   //跨域url
                         dataType: "html",
                         success: function (data) {
                             var jsonBBs_info= eval('(' + data + ')');
                             var DataList=jsonBBs_info.PageDataList.DataList;
                             for(var i=0;i<DataList.length;i++){
                                setReply(DataList[i]);
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
        $(document).delegate(".pls>div:nth-child(1)","click",function () {
            $(".comment1").show().stop(true,true).animate({"top":"0px"},function () {
                $(".wrap").hide();
            });
        });
        $(document).delegate(".send1","click",function () {
            var content=$(this).parent().next().children("textarea").val();
            if(content.length>0){
                $.post("http://m.liziedu.com/bbs/AddReply",{"bid":id,"content":content},function (data){
                    var jsonbackReplyinfo=eval('(' + data + ')');
                    if(jsonbackReplyinfo=="errorLogin"){
                        layer.msg("未登录状态，不能操作",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                    }else {
                        if(jsonbackReplyinfo){
                            $(".wrap").show();
                            $(".comment1").stop(true,true).animate({"top":"100%"},function () {
                                $(".comment1").hide();
                            });
                            $(".question_sub").prepend(setReply(jsonbackReplyinfo));
                            $(".start .clear>span:nth-child(3)").html(jsonbackReplyinfo.count);
                        }else{
                            layer.msg("操作太频繁，请稍后",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                        }
                    }
                },"html");
            }else{
                layer.msg("内容为空",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
            }
        });
        $(document).delegate(".pl>div:nth-child(1)","click",function () {
            var id=$(this).parent().parent().attr('id');
            var $this=$(this);
            var $next=$(this).next();
            $.ajax({
                type: "GET",
                url:"http://m.liziedu.com/bbs/BbsZan?rid="+id+"&type=zan",   //跨域url
                dataType: "html",
                success:function (data){
                    var jsonzan=eval('(' + data + ')');
                    if(jsonzan=="errorLogin"){
                        layer.msg("未登录状态，不能操作",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                    }else {
                        var _data=jsonzan.split(",");
                        var status=_data[0];
                        var number=Number(_data[1]);
                        if(status=="-1" || status=="1"){
                            layer.msg("操作频繁，请稍后",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                        }else if(status=="0"){
                            $this.html("");
                            var ele="<img src='images/bottomNav/shou-orange-up.png'><span style='color: #ea8010;'>已赞</span>";
                            $this.append($(ele));
                            $next.html("");
                            var ele1="<img src='images/bottomNav/shou-hui-down.png'><span>"+number+"</span>";
                            $next.append($(ele1));
                        }
                    }
                },
                error:function (XMLHttpRequest, textStatus,errorThrown) {
                    alert(textStatus); // 调用本次AJAX请求时传递的options参数
                }
            });
        })
        $(document).delegate(".pl>div:nth-child(2)","click",function () {
            var id=$(this).parent().parent().attr('id');
            var $this=$(this);
            var $prev=$(this).prev();
            $.ajax({
                type: "GET",
                url:"http://m.liziedu.com/bbs/BbsZan?rid="+id+"&type=cai",   //跨域url
                dataType: "html",
                success:function (data){
                    var jsonzan=eval('(' + data + ')');
                    if(jsonzan=="errorLogin"){
                        layer.msg("未登录状态，不能操作",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                    }else {
                        var _data=jsonzan.split(",");
                        var status=_data[0];
                        var number=Number(_data[1]);
                        if(status=="-1" || status=="1"){
                            layer.msg("操作频繁，请稍后",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                        }else if(status=="0"){
                            $this.html("");
                            var ele="<img src='images/bottomNav/shou-orange-down.png'><span style='color: #ea8010;'>已踩</span>";
                            $this.append($(ele));
                            $prev.html("");
                            var ele1="<img src='images/bottomNav/shou-hui-up.png'><span>"+number+"</span>";
                            $prev.append($(ele1));
                        }
                    }
                },
                error:function (XMLHttpRequest, textStatus,errorThrown) {
                    alert(textStatus); // 调用本次AJAX请求时传递的options参数
                }
            });
        });
        $(document).delegate(".backContent_click","click",function () {
            var id=$(this).parent().attr('id');
            var $backContent=$(this).parent().children(".backContent");
            if(flag){
                $(this).children("img").addClass("rotate");
                $.ajax({
                    type: "GET",
                    url:"http://m.liziedu.com/bbs/BbsReply?rid="+id,   //跨域url
                    dataType: "html",
                    success:function (data){
                        $backContent.html("");
                        $backContent.show();
                        var jsonback=eval('(' + data + ')');
                        for(var i=0;i<jsonback.length;i++){
                            $backContent.append(getbackReply(jsonback[i]));
                        }
                    },
                    error:function (XMLHttpRequest, textStatus,errorThrown) {
                        alert(textStatus); // 调用本次AJAX请求时传递的options参数
                    }
                });
                flag=false;
            }else{
                $(this).children("img").removeClass("rotate");
                $backContent.hide();
                flag=true;
            }
        });
        $(document).delegate(".pl>div:nth-child(3)","click",function () {
            var name=$(this).parent().parent().children(".name").children("span").html();
            rid=$(this).parent().parent().attr("id");
            var ele="<textarea placeholder='回复"+name+"'></textarea>";
            $(".input2").html($(ele));
            $(".comment2").show().stop(true,true).animate({"top":"0px"},function () {
                $(".wrap").hide();
            });
        });
        $(document).delegate(".send2","click",function () {
            var content=$(this).parent().next().children("textarea").val();
            if(content.length>0){
                $.post("http://m.liziedu.com/bbs/AddBbsReply",{"content":content,"bid":id,"rid":rid},function (data){
                    var jsonbackinfo=eval('(' + data + ')');
                    if(jsonbackinfo=="errorLogin"){
                        layer.msg("未登录状态，不能操作",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                    }else {
                        console.log(jsonbackinfo);
                        if(jsonbackinfo){
                            $(".wrap").show();
                            $(".comment2").stop(true,true).animate({"top":"100%"},function () {
                                $(".comment2").hide();
                                $("#"+rid+" .pl>div:nth-child(3)>span").html(jsonbackinfo)
                            });
                        }else{
                            layer.msg("操作太频繁，请稍后",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                        }
                    }
                },"html");
            }else{
                layer.msg("内容为空",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
            }
        });
    }
})
