/**
 * Created by cz on 2016/6/16.
 */
$(function(){
    $(".swipera .swiper-slide").css({"min-height":document.body.clientHeight-498+"px"});
    var scroll=[0,0,0];
    function getVideoList(json) {
        var ele="<li class='"+json.id+"'>"+json.lName+"<span>"+json.time+"分钟</span></li>";
        return $(ele);
    }
    function getDiscuss(json) {
        var ele="<div class='sub_active'>";
        ele+="<div class='name'>";
        ele+="<img src='"+json.UserPicPath+"' alt='"+json.UserName+"'>";
        ele+="<span>"+json.UserName+"</span>";
        ele+="<span>"+json.dates+"</span>";
        ele+="</div>";
        ele+="<p class='name_p'>"+json.msg+"</p>";
        ele+="</div>";
        return $(ele);
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
    var swiper=null;
    var EsID=storage.getQueryString("id");
    if(EsID){
        storage.setInfo("id",EsID);
    }
    var id=storage.getInfo("id");
    if(id){
        var collect_flag=0;
        var isLogin=0;
        var IsGouMai=0;
        var rid;
        var video_src=[];
        var index=-1;
        var price;
        $.ajax({
            url: "http://m.liziedu.com/Lesson/GetInfo?lid=" + id,
            success: function (data) {
                console.log(data);
                isLogin=data.islogin;
                collect_flag=data.isCollect;
                IsGouMai=data.IsGouMai;
                var data_video = data.catalogue;
                var data_info=data.info;
                price=data_info.price;
                var data_discuss=data.discuss;
                if(isLogin && collect_flag){
                    $(".bottomBar>a:nth-child(4)>img").attr("src","images/player/bottomBar_4-1.png");
                }else{
                    $(".bottomBar>a:nth-child(4)>img").attr("src","images/player/bottomBar_4.png");
                }
                $(document).delegate(".bottomBar>a:nth-child(4)","click",function (e){
                    if(isLogin){
                        if(collect_flag){
                            $.post("http://m.liziedu.com/Lesson/DelCollectt",{"lid":id},function (data) {
                                if(data="success"){
                                    $(".bottomBar>a:nth-child(4)>img").attr("src","images/player/bottomBar_4.png");
                                    layer.msg("取消收藏",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                                    collect_flag=0;
                                }else if(data="errorLogin"){
                                    location.href="login.html";
                                }else{
                                    layer.msg("操作频繁！请稍后",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                                }
                            });
                        }else{
                            $.post("http://m.liziedu.com/Lesson/AddCollectt",{"lessnameid":id},function (data) {
                                if(data="success"){
                                    $(".bottomBar>a:nth-child(4)>img").attr("src","images/player/bottomBar_4-1.png");
                                    layer.msg("收藏成功",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                                    collect_flag=1;
                                }else if(data="errorLogin"){
                                    location.href="login.html";
                                }else{
                                    layer.msg("操作频繁！请稍后",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                                }
                            });
                        }
                    }else{
                        location.href="login.html";
                    }
                });
                if(isLogin && IsGouMai){
                    $(".offer").html("已购买");
                }else if(price==0){
                    $(".offer").html("免费");
                    $(".offer").css("background","#1bbc9b");
                }else if(isLogin && price==0){
                    $(".offer").html("免费");
                    $(".offer").css("background","#1bbc9b");
                }
                $(".offer").click(function(){
                    if($(this).html()=="已购买"){
                        layer.msg("土豪，我们做朋友吧！",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                    }else if($(this).html()=="免费"){
                        layer.msg("别买了，免费的了！",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                    }else{
                        if(!isLogin){
                            layer.msg("未登录，请登录后购买",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                        }else{
                            location.href = "offer.html";
                        }
                    }
                    /*if(isLogin){
                        if(IsGouMai) {
                            layer.msg("土豪，我们做朋友吧！",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                        }else{
                            location.href = "offer.html";
                        }
                    }else{
                        layer.msg("未登录，请登录后购买",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                    }*/
                });
                $(".offer").attr("id",data_info.price);
                var ele = "";
                for(var i = 0; i < data_video.length; i++) {
                    $(".class_info").append(getVideoList(data_video[i]));
                }
                swiper = new Swiper('.swipera',{
                    initialSlide :0,
                    grabCursor : true,
                    autoHeight:true,
                    onSwiperCreated:function(){},
                    onSlideChangeStart: function(swiper) {
                        $(".info_but>div").removeClass("active");
                        $(".info_but>div").eq(swiper.activeIndex).addClass("active");
                        $(window).scrollTop(scroll[swiper.activeIndex]);
                        swiper.update();
                    },
                });
                $(window).on("scroll",function () {
                    scroll[swiper.activeIndex]=$(window).scrollTop();
                });
                for(var i=0;i<data_discuss.length;i++){
                    $(".question_sub").append(getDiscuss(data_discuss[i]));
                }
                $(".lesson_info .title").html(data_info.name);
                $(".lesson_info p").html(data_info.linfo);
                $(".teacher_info .infos>div>img").attr("src",data_info.tpicPath);
                $(".teacher_info .infos div").html(data_info.teacher);
                $(".teacher_info .infos p").html(data_info.tInfo);
                var DataList = data.xiangGuan;
                for (var i = 0; i < DataList.length; i++) {
                    getDataList(DataList[i]);
                }
                for(var i=0;i<$(".class_info>li").length;i++){
                    var $this_index=$(".class_info>li").eq(i);
                    video_src.push($this_index.attr("class"));
                }
                rid=$(".class_info>li").eq(0).attr("class");
                $.get("http://m.liziedu.com/Lesson/GetViedoPath?id="+rid,function (data) {
                    index=0;
                    var name=$(".class_info>li").eq(0).html();
                    name=name.split("<span>");
                    $(".back_video_content .name").html(name[0]);
                    $(".class_info>li").removeClass("activeli");
                    $(".class_info>li").eq(0).addClass("activeli");
                    if(data=="errorLogin"){
                        /*layer.msg("未登录，登录购买后观看",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});*/
                    }else if(data=="error"){
                        /*layer.msg("未购买，购买后观看",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});*/
                    }else{
                        $("#video>video")[0].src="";
                        $("#video>video")[0].src=data;
                    }
                })
            }
        });
        var flag_show=true;
        $(".video").on("click",function () {
            if(flag_show){
                $(".back_video").show();
                $("#video>video").attr("controls","controls");
            }else{
                $(".back_video").hide();
                $("#video>video").removeAttr("controls");
            }
        });
        $(".bottomBar>a:nth-child(2)").click(function () {
            $(".share").css("display","none");
            $(".wrap").css("display","none");
            $(".input_text>textarea").val("");
            $(".comment").show(0,function(){
                $(".comment").stop(true,true).animate({
                    'top':'0px'
                },200);
            });
        });
        $(".comment .top_sub1>a:nth-child(3)").click(function (){
            $(".comment").animate({"top":document.body.clientHeight+"px"},200,function () {
                $(".comment").css("display","none");
            });
            $(".share").css("display","block");
            $(".wrap").css("display","block");
        });
/*        $(".bottomBar>a:nth-child(3)").click(function (){
            $(".share").css("display","none");
            $(".wrap").css("display","none");
            $(".load").css({"display":'block'}).animate({'top':'0px'},500);
            check();
        });
        $(".load .top_sub1>a:nth-child(3)").click(function (){
            $(".load").animate({"top":document.body.clientHeight+"px"},500,function () {
                $(".load").css("display","none");
            });
            $(".share").css("display","block");
            $(".wrap").css("display","block");
        });*/
        $(".bottomBar>a").eq(4).click(function (e) {
            $(".share").animate({"bottom":"0px"});
            $(".close,.main").click(function (e) {
                $(".share").stop(true,true).animate({"bottom":"-408px"});
            });
        });
        $(".info_but>div").click(function(e){
            var index = $(this).index();
            swiper.update();
            swiper.slideTo(index, 500, true);//切换到第一个slide，速度为0.5秒
            $(".info_but>div").removeClass("active");
            $(this).addClass("active");
        });
        $(".list_top .list_info").click(function (e) {
            if($(this).parent().hasClass("list_none")){
                $(this).parent().removeClass("list_none");
                $(this).children("img").attr("src","images/player/but_top.png");
            }else{
                $(this).parent().addClass("list_none");
                $(this).children("img").attr("src","images/player/but_bottom.png");
            }
            swiper.update();
        });
        $(document).delegate(".top_sub1>a:nth-child(2)","click",function (e) {
            var msg=$(".input_text>textarea").val();
            if(msg.length>0){
                 $.post("http://m.liziedu.com/Lesson/AddComment",{"lid":id,"msg":msg},function (data) {
                     if(data.code=="success"){
                         layer.msg("发表成功",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
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
                             "UserName":name,
                             "UserPicPath":storage.getCookie("picpath"),
                             "dates":data.date,
                             "msg":msg,
                         }
                         $(".question_sub").prepend(getDiscuss(json));
                     }else if(data="errorLogin"){
                         layer.msg("未登录，请登录后发表吐槽",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                     }else{
                         layer.msg("操作频繁，请稍后重试",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                     }
                 })
            }else{
                layer.msg("难道你不吐槽一下吗？",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
            }
        });
        $(document).delegate(".class_info>li","click",function (e) {
            index=$(this).index();
            var name=$(this).html();
            name=name.split("<span>");
            $(".back_video_content .name").html(name[0]);
            $(".class_info>li").removeClass("activeli");
            rid=$(this).attr("class");
            $(this).addClass("activeli");
            $.get("http://m.liziedu.com/Lesson/GetViedoPath?id="+rid,function (data) {
                if(data=="errorLogin"){
                    layer.msg("未登录，登录后购买",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }else if(data=="error"){
                    layer.msg("未购买，购买后观看",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }else{
                    $("#video>video")[0].src="";
                    $("#video>video")[0].src=data;
                }
            })
        });
        $("#video>video")[0].addEventListener("ended",function(){
            index++;
            if(video_src[index]) {
                var name=$(".class_info>li").eq(index).html();
                name=name.split("<span>");
                $(".back_video_content .name").html(name[0]);
                $(".class_info>li").removeClass("activeli");
                $(".class_info>li").eq(index).addClass("activeli");
                $.get("http://m.liziedu.com/Lesson/GetViedoPath?id="+video_src[index],function (data) {
                    if(data=="errorLogin"){
                        location.href="login.html";
                    }else if(data=="error"){
                        layer.msg("未购买，购买后观看",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                    }else{
                        $("#video>video")[0].src="";
                        $("#video>video")[0].src=data;
                    }
                })
            }else{
                layer.msg('视频播放完，请观看其他视频', {time: 1500});
            }
        },false);
        $(document).delegate(".share_sub>a","click",function(){
            var share_index=$(this).index();
            if(share_index==0){
                location.href="http://connect.qq.com/widget/shareqq/index.html?url=http://m.liziedu.com/mb_liziedu/player.html?id="+id+"%230-sqq-1-31481-9737f6f9e09dfaf5d3fd14d775bfee85&title=高端课堂手机版&desc=&summary=&site=baidu";
            }else if(share_index==1){
                layer.msg("功能开发中...",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
            }else if(share_index==2){
                location.href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http://m.liziedu.com/mb_liziedu/player.html?id="+id+"%230-qzone-1-71735-d020d2d2a4e8d1a374a433f596ad1440&title=高端课堂手机版&desc=高端课堂带给你更多惊喜&summary=&site=";
            }else if(share_index==3){
                layer.msg("功能开发中...",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
            }
        });
        function check() {
            $(".check_sub").click(function (){
                if(($(this).next())[0].checked){
                    $(this).children("img").attr("src","images/player/check_box_1.jpg");
                    $(this).next().removeProp("checked");;
                }else{
                    $(this).children("img").attr("src","images/player/check_box_2.jpg");
                    $(this).next().prop("checked",true);
                }
            });
            $(".button>input:nth-child(1)").click(function (){
                $(".check_sub").children("img").attr("src","images/player/check_box_2.jpg");
                $(".check_sub").next().prop("checked",true);
            });
            $(".button>input:nth-child(2)").click(function (){
                for(var i=0;i<$(".check_sub").size();i++) {
                    if (($(".check_sub").next())[i].checked) {
                        $(".check_sub").eq(i).children("img").attr("src", "images/player/check_box_3.jpg");
                    }
                }
            });
            var swiperl = new Swiper('.swiperl', {
                direction: 'vertical',
                slidesPerView: 'auto',
                freeMode: true,
                scrollbar: '.swiper-scrollbar',
            });
        }
    }else{
        location.href="index.html";
    }
})

