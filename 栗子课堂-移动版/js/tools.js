/**
 * Created by cz on 2016/9/19.
 */
$(function () {
    $(".main>a:nth-child(4)").click(function () {
        $(".sex").show();
    });
    $.get("http://m.liziedu.com/account/GetUserInfo",function (data) {
        var array_data=[data.uicon,data.uname,data.rname,data.gender,data.city1+" "+data.city2+" "+data.city3,data.mobile,data.email];
        $(".main>a:nth-child(1)>div:nth-child(2)").html("<img src='"+data.uicon+"'>");
        for(var i=1;i<array_data.length;i++){
            $(".main>a:nth-child("+(i+1)+")>div:nth-child(2)").html(array_data[i]);
        }
        if(array_data[3]){
            $(".main>a:nth-child(4)>div:nth-child(2)").html("男");
            $(".sex_info>div:nth-child(2)>img").attr("src","images/tools/select.png");
            $(".sex_info>div:nth-child(3)>img").attr("src","images/tools/select_hui.png");
        }else {
            $(".main>a:nth-child(4)>div:nth-child(2)").html("女");
            $(".sex_info>div:nth-child(3)>img").attr("src","images/tools/select.png");
            $(".sex_info>div:nth-child(2)>img").attr("src","images/tools/select_hui.png");
        }
        $(".sex_info>div:nth-child(2)").click(function () {
            $(".sex_info>div>img").attr("src","images/tools/select_hui.png");
            $(this).children("img").attr("src","images/tools/select.png");
            $.post("http://m.liziedu.com/account/UpdateInfo",{"sex":true},function (data) {
                if(data=="success"){
                    $(".main>a:nth-child(4)>div:nth-child(2)").html("男");
                    $(".sex").hide();
                }
            })
        });
        $(".sex_info>div:nth-child(3)").click(function () {
            $(".sex_info>div>img").attr("src","images/tools/select_hui.png");
            $(this).children("img").attr("src","images/tools/select.png");
            $.post("http://m.liziedu.com/account/UpdateInfo",{"sex":false},function (data) {
                if(data=="success"){
                    $(".main>a:nth-child(4)>div:nth-child(2)").html("女");
                    $(".sex").hide();
                }
            })
        });
        $(".main>a:nth-child(3)").click(function () {
            $(".content_one>input:nth-child(1)").val("");
            $(".one").css("display","block").stop(true,true).animate({"right":"0px"});
        });
        $(".content_one>input:nth-child(2)").click(function () {
            var value= $(".content_one>input:nth-child(1)").val();
            $.post("http://m.liziedu.com/account/UpdateInfo",{"name":value},function (data) {
                if(data=="success"){
                    $(".main>a:nth-child(3)").children("div").eq(1).html(value);
                    $(".one").stop(true,true).animate({"right":"-640px"},function () {
                        $(".one").css("display","none");
                    });
                }else{
                    layer.msg("操作太频繁，请重试",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }
            });
        });
        $(".main>a:nth-child(6)").click(function () {
            $(".content_two>input:nth-child(1)").val("");
            $(".two").css("display","block").stop(true,true).animate({"right":"0px"});
        });
        $(".content_two>input:nth-child(2)").click(function () {
            var value=$(".content_two>input:nth-child(1)").val();
            if(value.length>0){
                var regxs1 = [];
                regxs1.push(/^1\d{10}$/g);
                if (value.match(regxs1[0])) {
                    $.post("http://m.liziedu.com/account/UpdateInfo",{"phone":value},function (data) {
                        if(data=="success"){
                            $(".main>a:nth-child(6)").children("div").eq(1).html(value);
                            $(".two").stop(true,true).animate({"right":"-640px"},function () {
                                $(".two").css("display","none");
                            });
                        }else{
                            layer.msg("操作太频繁，请重试",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                        }
                    });
                    } else {
                        layer.msg("手机号格式不正确",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                    }
                }else{
                    layer.msg("手机号不能为空",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }
        });
        $(".main>a:nth-child(7)").click(function () {
            $(".content_three>input:nth-child(1)").val("");
            $(".three").css("display","block").stop(true,true).animate({"right":"0px"});
        });
        $(".content_three>input:nth-child(2)").click(function () {
            var value=$(".content_three>input:nth-child(1)").val();
            if(value.length>0){
                var regxs1=[];
                regxs1.push(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/g);
                if (value.match(regxs1[0])) {
                    $.post("http://m.liziedu.com/account/UpdateInfo",{"email":value},function (data) {
                        console.log(data);
                        if(data=="success"){
                            $(".main>a:nth-child(7)").children("div").eq(1).html(value);
                            $(".three").stop(true,true).animate({"right":"-640px"},function () {
                                $(".three").css("display","none");
                            });
                        }else{
                            layer.msg("操作太频繁，请重试",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                        }
                    });
                } else {
                    layer.msg("邮箱格式不正确",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
                }
            }else{
                layer.msg("邮箱不能为空",{time:3000,offset: ['85%', jsonStyle.left],area: jsonStyle.width});
            }
        });
        $(".tool_sec").click(function () {
            $(".secound").stop(true,true).animate({"right":"-640px"},function () {
                $(".secound").css("display","none");
            });
        });
    });
    var area1 = new LArea();
    area1.init({
        'trigger': '#demo1', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
        'valueTo': '#value1', //选择完毕后id属性输出到该位置
        'keys': {
            id: 'id',
            name: 'name'
        }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
        'type': 1, //数据源类型
        'data': LAreaData //数据源
    });
    area1.value=[0,0,0];//控制初始位置，注意：该方法并不会影响到input的value
    var area2 = new LArea();
    area2.init({
        'trigger': '#demo2',
        'valueTo': '#value2',
        'keys': {
            id: 'value',
            name: 'text'
        },
        'type': 2,
        'data': [provs_data, citys_data, dists_data]
    });
});