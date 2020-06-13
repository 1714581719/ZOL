!function($){
    const $username = $('.username');
    const $password = $('.password');
    const $submit = $('.submit');

    $submit.on('click',function() {
        if($username.val() != '' && $password.val() != '') {
            $.ajax({
                type: 'post',
                url: 'http://10.31.162.21/ZOL/php/login.php',
                data: {
                    username: $username.val(),
                    password: $password.val()
                }
            }).done(function (result) {
                if (result) {
                    location.href = "http://10.31.162.21/ZOL/src/index.html";
                    $.cookie('id', $username.val(), { expires: 10, path: '/' });
                } else {
                    $password.val('');
                    alert('用户名或者密码错误');
                }
            });
        }else {
            alert('请输入账号名和密码');
        }
    });
}(jQuery);