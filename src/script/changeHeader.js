!function($) {
    $('.commonHeader').load('http://10.31.162.21/ZOL/src/header.html',function() {
        let $sid = 0;
        if($.cookie('id')) {
            $sid = $.cookie('id');
            $('.right1').css({
                display: 'none'
            });
            $('.right2').css({
                display: 'block'
            });
            $('.right2 .username').html('欢迎您，'+$sid);
            $('.right2 .quit').on('click',function() {
                $.removeCookie('id',{path:'/'});
                location.href = 'http://10.31.162.21/ZOL/src/index.html'
            });
        }else {
            $sid = 0;
        }
        $('.nav .navlist ul').css({
            display:'none'
        });
        $('.index_a').css({
            display:'inline-block'
        });
        // 添加鼠标移入效果
        $('.nav .navlist').hover(function() {
            $('.nav .navlist ul').css({
                display:'block'
            });
        },function() {
            $('.nav .navlist ul').css({
                display:'none'
            });
        });
    })
}(jQuery);