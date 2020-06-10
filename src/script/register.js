!function($) {
    const $uesrname = $('.uesrname');
    const $tel = $('.tel');
    const $password = $('.password');
    const $repass = $('.repass');
    const $submit = $('.submit');
    const $span = $('form span');

    let $namelock = false;
    let $tellock = false;
    let $passlock = false;
    let $repasslock = false;

    // 用户更改账号事件
    // 账号由大小写字母和数字组成
    // 账号不能小于6位字符
    // 账号不能大于18位字符
    $uesrname.on('input',function() {
        // 用户每次更改账号将后面提示清空
        $span.eq(0).html('');
        // 如果账号的数值为空，报错并提示
        if($uesrname.val() == '') {
            $span.eq(0).html('请输入账号').css('color','red');
            $namelock = false;
        }
        // 如果账号小于6位字符，报错并提示
        if($uesrname.val().length < 6 && $uesrname.val().length > 0){
            $span.eq(0).html('账号不能小于6位字符').css('color','red');
            $namelock = false;
        }
        // 如果账号大于18位字符，报错并提示
        if($uesrname.val().length > 18){
            $span.eq(0).html('账号不能大于18位字符').css('color','red');
            $namelock = false;
        }
        // 判断用户是否输入除数字和英文字母之外的字符，如果有，不录入
        if(!/^[a-zA-Z0-9]$/.test($uesrname.val().substr(-1))){
            // 输入的时其他字符，重新赋值账号，将最后一位字符去掉，并提示
            $uesrname.val($uesrname.val().substring(0,$uesrname.val().length-1));
            $span.eq(0).html('账号由大小写字母和数字组成').css('color','red');
        }
    });

    // 用户更改手机号事件
    $uesrname.on('input',function() {
        // 用户每次更改账号将后面提示清空
        $span.eq(0).html('');
        // 如果账号的数值为空，报错并提示
        if($uesrname.val() == '') {
            $span.eq(0).html('请输入账号').css('color','red');
            $namelock = false;
        }
        // 如果账号小于6位字符，报错并提示
        if($uesrname.val().length < 6 && $uesrname.val().length > 0){
            $span.eq(0).html('账号不能小于6位字符').css('color','red');
            $namelock = false;
        }
        // 如果账号大于18位字符，报错并提示
        if($uesrname.val().length > 18){
            $span.eq(0).html('账号不能大于18位字符').css('color','red');
            $namelock = false;
        }
        // 判断用户是否输入除数字和英文字母之外的字符，如果有，不录入
        if(!/^[a-zA-Z0-9]$/.test($uesrname.val().substr(-1))){
            // 输入的时其他字符，重新赋值账号，将最后一位字符去掉，并提示
            $uesrname.val($uesrname.val().substring(0,$uesrname.val().length-1));
            $span.eq(0).html('账号由大小写字母和数字组成').css('color','red');
        }
    });



    $submit.on('click',function() {
        if($uesrname.val() == '') {
            $span.eq(0).html('请输入账号').css('color','red');
        }
        if(!$namelock) {
            return false; //阻止默认行为
        }
        
    });
}(jQuery);