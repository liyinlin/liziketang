/**
 * Created by cz on 2016/9/18.
 */
$(function () {
    // 获取 canvas DOM 对象
    var canvas = document.getElementById("myCanvas");
    // 获取 canvas的 2d 环境对象,
    // 可以理解Context是管理员，canvas是房子
    var ctx = canvas.getContext("2d");
    // 创建一个 Image 对象
    var image = new Image();
    // 渲染 Image 缩放尺寸
    $.get("http://m.liziedu.com/account/GetUserInfo",function (data) {
        $(".name").html(data.rname);
        $("#plan>img").attr("src",data.uicon);
    });
    function render(src,url,callBack){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var MAX_HEIGHT = 150;  //Image 缩放尺寸
        // 设置src属性，浏览器会自动加载。
        // 记住必须先绑定render()事件，才能设置src属性，否则会出同步问题。
        image.src = src;
        // 绑定 load 事件处理器，加载完成后执行
        image.onload = function(){
            // 如果高度超标
            if(image.height > MAX_HEIGHT) {
                // 宽度等比例缩放 *=
                image.width *= MAX_HEIGHT / image.height;
                image.height = MAX_HEIGHT;
            }
            // canvas清屏
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width =image.width;        // 重置canvas宽高
            canvas.height = image.height;
            $("#plan").css("width",image.width+"px");
            // 将图像绘制到canvas上
            ctx.drawImage(image, 0, 0, image.width, image.height);
            var imgData = canvas.toDataURL("image/png");
            imgData = imgData.replace(/^data:image\/(png|jpg);base64,/, "");
            var fileServer=url;//服务器地址
            if(!fileServer){
                console.log("请配置文件服务器地址");
                return;
            }else{
                $.post(fileServer,{"BytesStr":imgData},function (msg) {
                    callBack(msg);
                });
            }
        };
    };
    var hammer = '';
    var currentIndex = 0;
    var body_width = $('body').width();
    var body_height = $('body').height();
//图片上传
    function saveImageInfo() {
        var filename = $('#hit').attr('fileName');
        var img_data = $('#hit').attr('src');
        if(img_data==""){alert('null');}
        render(img_data,"http://m.liziedu.com/account/UpdatePic",function (data) {
            if(data=="success"){
                self.location=document.referrer;
                location.href="tools.html";
            }
        });
    }
    /*获取文件拓展名*/
    function getFileExt(str) {
        var d = /\.[^\.]+$/.exec(str);
        return d;
    }

//图片上传结束
    $('#upload2,#plan').on('click', function () {
        //图片上传按钮
        $('#file').click();
    });
    $("#file").on("change",function () {
        $("#plan").hide();
        $(".pic_edit").show();
    });
    $("#clipArea").photoClip({
        width: body_width * 0.8125,
        height: body_width * 0.8125,
        file: "#file",
        view: "#hit",
        ok: "#clipBtn",
        loadStart: function () {
            //console.log("照片读取中");
            $('.lazy_tip span').text('');
            $('.lazy_cover,.lazy_tip').show();
        },
        loadComplete: function () {
            //console.log("照片读取完成");
            $('.lazy_cover,.lazy_tip').hide();
        },
        clipFinish: function (dataURL) {
            $('#hit').attr('src', dataURL);
            saveImageInfo();
        }
    });
});