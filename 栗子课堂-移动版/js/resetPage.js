/**
 * Created by cz on 2016/6/24.
 */
jsonStyle={
    "left":"150px",
    "width":"340px"
}
$(document).ready(function(){
    var wid=document.documentElement.clientWidth;
    var scale=wid/640;
    document.body.style.zoom=scale;
    $("body").css({display:"block"});

})
$(window).resize(function(){
    var wid=document.documentElement.clientWidth;
    var scale=wid/640;
    document.body.style.zoom=scale;
    $("body").css({display:"block"});
});
//获取滚动条当前的位置
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

//获取当前可是范围的高度
function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    }
    else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}

//获取文档完整的高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

