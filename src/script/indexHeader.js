!function($) {
    $('.commonHeader').load("http://10.31.162.21/ZOL/src/header.html",function() {
        $('.listbox1 dl dd a').on('click',function() {
            console.log($(this).html());
        });
    });
}(jQuery);
