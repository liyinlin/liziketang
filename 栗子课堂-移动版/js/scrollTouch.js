/**
 * Created by cz on 2016/7/22.
 */
/*outer最外围固定高宽的元素overflow:hidden;，inner是里面滑动元素position:relative;*/
function Touch(outer,inner,height) {
    var startX,//触摸时的坐标
        startY,
        x, //滑动的距离
        y,
        aboveY=0; // 设一个全局变量记录上一次内部块滑动的位置
    var documentHeight=$(inner).height();//内部滑动模块的高度
    var wapperHeight=$(outer).height(); //外部框架的高度
    var max=(documentHeight-wapperHeight)+height;

    function touchStart(e){//触摸开始
        e.preventDefault();
        var touch=e.touches[0];
        startY = touch.pageY;   //刚触摸时的坐标
    }

    function touchMove(e){//滑动
        e.preventDefault();
        var touch = e.touches[0];
        y = touch.pageY - startY;//滑动的距离
        $(inner)[0].style.top=aboveY+y+"px";
    }

    function touchEnd(e){//手指离开屏幕
        aboveY=parseInt($(inner)[0].style.top);//touch结束后记录内部滑块滑动的位置 在全局变量中体现 一定要用parseInt()将其转化为整数字;
        if(y>0&&aboveY>0){//当滑动到最顶端时候不能滑动
            $(inner).css({top:0});
            aboveY=0;
        }

        if(y<0&&(aboveY<(-max))){//当滑动到最底部时候不能滑动
            $(inner).css({top:-(max)});
            aboveY=-(max);
        }
    }//
    $(outer)[0].addEventListener('touchstart', touchStart,false);
    $(outer)[0].addEventListener('touchmove', touchMove,false);
    $(outer)[0].addEventListener('touchend', touchEnd,false);
}