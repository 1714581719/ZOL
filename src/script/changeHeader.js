!function($) {
    $('.commonHeader').load('http://10.31.162.21/ZOL/src/header.html',function() {
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