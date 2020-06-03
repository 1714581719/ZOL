!function($){
    $('.submit').on('click',function() {
        $.ajax({
            type: 'post',
            url: 'http://localhost/ZOL/php/login.php',
            data: {
                user: $('.')
            }
        })
    });
}(jQuery);