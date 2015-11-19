/*
 *  service page >> banner 
 *  yuchunyu 2015/11/04
 */
var banner = {
    init : function (arrImage) {
        var oBanner = document.getElementById('bannerBox');
        banner.oList = document.getElementById('bannerList');
        var oNav = oBanner.getElementsByTagName('nav')[0];
        // var arrLi = banner.oList.getElementsByTagName('li');
        banner.iCount = arrImage.length;
        banner.iW = banner.view().w;//获取屏幕的宽度
        oBanner.style.height = banner.iW / 72 * 26 + 'px';
        banner.autotime = 2000;
        banner.iNow = 0;
        banner.iX = 0;
        banner.iStartX = 0;
        banner.oTimer = null;
        banner.iStartTouchX = 0;
        //初始化banner_list , banner_list li 的宽度
        banner.oList.style.width = banner.iW * banner.iCount + 'px';
        oBanner.style.height = banner.oList.style.height = banner.iW / 72 * 26 + 'px';
        for (var i = 0; i < banner.iCount; i++) {
            var _li = document.createElement('li');
            var _image = document.createElement('img');
            _li.style.width = banner.iW + 'px';
            _li.style.height = banner.iW / 72 * 26 + 'px';
            _image.src = '/img/' + arrImage[i].imageID;
            banner.oList.appendChild(_li);
            _li.appendChild(_image);
            var _a = document.createElement('a');
            _a.href = 'javascript:;';
            oNav.appendChild(_a);
        }
        banner.arrNav = oNav.children;
        //绑定点击事件
        for (var i = 0; i < banner.iCount; i++) {
            if (i == 0) banner.addClass(banner.arrNav[i], 'active');
            banner.arrNav[i].index = i;
            banner.bind(banner.arrNav[i], 'click', banner.clickHandler);
        }
        //绑定移动端事件
        banner.bind(oBanner, 'touchstart', banner.touchStartHandler);
        banner.bind(oBanner, 'touchmove', banner.touchMoveHandler);
        banner.bind(oBanner, 'touchend', banner.touchEndHandler);
        //自动播放
        banner.auto();
    },
    /*
     *  移动端事件
     */
    touchStartHandler : function (event) {
        banner.oList.style.transition = 'none';
        banner.iStartTouchX = event.changedTouches[0].pageX;
        banner.iStartX = banner.iX;
        clearInterval(banner.oTimer);
    },
    touchMoveHandler : function (event) {
        var iDeltaX = event.changedTouches[0].pageX - banner.iStartTouchX;
        banner.iX = banner.iStartX + iDeltaX;
        if (banner.iX > -3) 
            banner.iX = 0;
        if (banner.iX < -banner.iW * (banner.iCount - 1) + 3) 
            banner.iX = -banner.iW * (banner.iCount - 1);
        banner.oList.style.WebkitTransform
                = banner.oList.style.transform
                = 'translateX(' + banner.iX + 'px)';
        event.preventDefault();  // 阻止默认事件
        event.stopPropagation(); // 阻止冒泡

    },
    touchEndHandler : function (event) {
        banner.iNow = -Math.round(banner.iX / banner.iW);
        if (banner.iNow < 0) banner.iNow = 0;
        if (banner.iNow > banner.iCount - 1) banner.iNow = banner.iCount - 1;
        banner.slide();
        banner.auto();
    },
    //滑动
    slide : function () {
        banner.iX = -banner.iNow * banner.iW;
        banner.oList.style.transition = '0.5s';
        banner.oList.style.WebkitTransform
            = banner.oList.style.transform
            = 'translateX(' + banner.iX + 'px)';
        for (var i = 0; i < banner.iCount; i++) {
            banner.removeClass(banner.arrNav[i], 'active');
        }
        banner.addClass(banner.arrNav[banner.iNow], 'active');
    },
    //自动滚动
    auto : function () {
        banner.oTimer = setInterval(function () {
            banner.iNow++;
            banner.iNow = banner.iNow % banner.iCount;
            banner.slide();
        }, banner.autotime);
    },
    //点击
    clickHandler : function () {
        clearInterval(banner.oTimer);
        banner.iNow = this.index;
        banner.slide();
        banner.auto();
    },
    /*
     *  工具类  
     */
    //获取视图数据
    view : function () {
        return {
            w: window.screen.width,
            h: window.screen.height
        };
    },
    //绑定
    bind : function (obj, event, callback) { 
        if (obj.addEventListener) {
            obj.addEventListener(event, callback, false);
        } else {
            obj.attachEvent('on' + event, function() {
                callback.call(obj);
            });
        }
    },
    //添加样式
    addClass : function (obj, sClass) {
        var arrClass = obj.className.split(' ');
        if (!obj.className) {
            obj.className = sClass;
            return
        };
        //判断是否已存在
        for (var i = 0, l = arrClass.length; i < l; i++) {
            if (arrClass[i] === sClass) return;
        }
        obj.className += ' ' + sClass;
    },
    //移除样式
    removeClass : function (obj, sClass) {
        var arrClass = obj.className.split(' ');
        if (!obj.className) return;
        //判断并移除
        for (var i = 0, l = arrClass.length; i < l; i++) {
            if (arrClass[i] === sClass) {
                arrClass.splice(i, 1);
                obj.className = arrClass.join(' ');
                break;
            }
        }
    }
};
/**
 * 使用方法
 */
/*
window.onload = function () {
    //测试数据
    var arrImage = [
        {url : '111', name : '222', imageID : '1.jpg'},
        {url : '111', name : '222', imageID : '2.jpg'},
        {url : '111', name : '222', imageID : '3.jpg'},
        {url : '111', name : '222', imageID : '4.jpg'},
        {url : '111', name : '222', imageID : '5.jpg'}
    ];
    banner.init(arrImage);
}; 
*/