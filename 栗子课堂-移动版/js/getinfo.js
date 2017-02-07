/**
 * Created by cz on 2016/6/28.
 */
var storage={
    setInfo:function(k,v){
        //保存永久数据
        window.localStorage.setItem(k,v);
    },
    getInfo:function(k){
        //读取永久数据
        return window.localStorage.getItem(k);
    },
    removeInfo:function(k){
        //删除永久数据
        window.localStorage.removeItem(k);
    },
    allRemoveInfo:function(){
        //全部删除
        window.localStorage.clear();
    },
    random:function(n) {
        //产生多位的随机数
        var strRnd = "";
        for (var i = 0; i < n; i++) {
            strRnd += Math.floor(Math.random() * 10);
        }
        return strRnd;
    },
    setCookie : function(name,value) {
        var Days = 24*60*60*1000;
        var exp  = new Date();
        exp.setTime(exp.getTime() + Days);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    getCookie : function(name) {
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null) return unescape(arr[2]); return null;
    },
    //获取地址栏的值
    getQueryString:function (name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },
    getSDArray:function(value,division) {
        value=value.substring(0,value.length-1);
        value=value.split(division);
        return value;
    },
    getJson:function(value){
        var json=$.parseJSON(value[0]);
        for(var i=1;i<value.length;i++){
            var json1=$.parseJSON(value[i]);
            for(var j=0;j<json1.length;j++){
                json.push(json1[j]);
            }
        }
        return json;
    },
    strTONum:function(value) {
        var array=[];
        for(var i=0;i<value.length;i++){
            array.push(parseInt(value[i]));
        }
        return array;
    },
    isBottom:function(){
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
        var flag;
        if(getScrollTop() + getClientHeight() == getScrollHeight()){
            flag=true;
        }else{
            flag=false;
        }
        return flag;
    },
}