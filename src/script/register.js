!function($) {
    const $username = $('.username');
    const $tel = $('.tel');
    const $password = $('.password');
    const $repass = $('.repass');
    const $submit = $('#submit');
    const $span = $('form span');

    let $namelock = false;
    let $tellock = false;
    let $passlock = false;
    let $repasslock = false;

    // 用户更改账号事件
    // 账号由大小写字母和数字组成
    // 账号不能小于6位字符
    // 账号不能大于18位字符
    $username.on('input',function() {
        // 用户每次更改账号将后面提示清空
        $span.eq(0).html('');
        // 如果账号的数值为空，报错并提示
        if($username.val() == '') {
            $span.eq(0).html('请输入账号').css('color','red');
            $namelock = false;
        }
        // 如果账号小于6位字符，报错并提示
        if($username.val().length < 6 && $username.val().length > 0){
            $span.eq(0).html('账号不能小于6位字符').css('color','red');
            $namelock = false;
        }
        // 如果账号大于18位字符，报错并提示
        if($username.val().length > 18){
            $span.eq(0).html('账号不能大于18位字符').css('color','red');
            $namelock = false;
        }
        // 判断用户是否输入除数字和英文字母之外的字符，如果有，不录入
        if(!/^[a-zA-Z0-9]$/.test($username.val().substr(-1))){
            // 输入的时其他字符，重新赋值账号，将最后一位字符去掉，并提示
            $username.val($username.val().substring(0,$username.val().length-1));
            $span.eq(0).html('账号由大小写字母和数字组成').css('color','red');
        }
        // 判断输入正确勾选并提示
        if($username.val().length >= 6 && $username.val().length <= 18) {
            $span.eq(0).html('√').css('color','green');
            $namelock = true;
        }
        changeSubmit();
    });

    // 账号失焦事件
    $username.on('blur',function() {
        if($namelock) {
            $.ajax({
                type: 'post',
                url: 'http://10.31.162.21/ZOL/php/register.php',
                data: {
                    username:$username.val()
                }
            }).done(function(result) {
                console.log(result);
                
                if(!result) { //不存在
                    $span.eq(0).html('该账号可用').css('color', 'green');
                }else {
                    $span.eq(0).html('该用户名已经存在').css('color', 'red');
                    $namelock = false;
                }
            });
        }
    })

    // 用户更改手机号事件
    $tel.on('input',function() {
        // 用户每次更改手机号码将后面提示清空
        $span.eq(1).html('');
        // 存取手机号码判断规则
        let $telreg = /^1[3-9][0-9]{9}$/;
        // 如果手机号码的数值为空，报错并提示
        if($tel.val() == '') {
            $span.eq(1).html('请输入手机号码').css('color','red');
            $tellock = false;
        }
        if($tel.val().length == 11) {
            // 粗略判断用户输入的手机号是否符合规范
            if(!$telreg.test($tel.val())) {
                $span.eq(1).html('手机号输入错误').css('color','red');
                $tellock = false;
            }
        }
        // 如果手机号码大于11位字符，报错并提示
        if($tel.val().length > 11){
            $span.eq(1).html('手机号输入错误').css('color','red');
            $tellock = false;
        }
        // 判断用户是否输入除数字之外的字符，如果有，不录入
        if(!/^\d$/g.test($tel.val().substr(-1))){
            // 输入的是除数字外的数值，重新赋值手机号码，将最后一位字符去掉，并提示
            $tel.val($tel.val().substring(0,$tel.val().length-1));
            $span.eq(1).html('账号由数字组成').css('color','red');
        }
        // 判断输入正确勾选并提示
        if($tel.val().length = 11 && $telreg.test($tel.val())) {
            $span.eq(1).html('√').css('color','green');
            $tellock = true;
        }
        changeSubmit();
    });

    // 用户更改输入密码事件
    // 密码安全等级有三级：
    // 弱：两种或两种以下格式密码
    // 中：三种格式密码
    // 强：四种格式密码
    $password.on('input',function() {
        // 用户每次更改密码将后面提示清空
        $span.eq(2).html('');
        // 判断用户密码安全等级
        let $passrank = 0;
        // 如果密码的数值为空，报错并提示
        if($password.val() == '') {
            $span.eq(2).html('请输入密码').css('color','red');
            $passlock = false;
        }
        // 判断如果密码中是否存在数字，有密码等级加1
        if(/\d/g.test($password.val())) {
            $passrank++;
        }
        // 判断如果密码中是否存在小写字母，有密码等级加1
        if(/[a-z]/g.test($password.val())) {
            $passrank++;
        }
        // 判断如果密码中是否存在大写字母，有密码等级加1
        if(/[A-Z]/g.test($password.val())) {
            $passrank++;
        }
        // 判断如果密码中是否存在特殊字符，有密码等级加1
        if(/[\W_]/g.test($password.val())) {
            $passrank++;
        }
        // 判断用户输入的密码安全等级
        switch($passrank) {
            case 1:
                $span.eq(2).html('密码等级：弱').css('color','red');
                break;
            case 2:
            case 3:
                $span.eq(2).html('密码等级：中').css('color','orange');
                break;
            case 4:
                $span.eq(2).html('密码等级：强').css('color','green');
        }
        // 如果密码小于6位字符，报错并提示
        if($password.val().length < 6){
            $span.eq(2).html('密码不能小于6位字符').css('color','red');
            $passlock = false;
        }
        // 如果密码大于16位字符，报错并提示
        if($password.val().length > 16){
            $span.eq(2).html('密码不能大于16位字符').css('color','red');
            $passlock = false;
        }
        // 判断是否存在确认密码
        if($repass.val().length != 0) {
            // 判断确认密码和输入密码是否一样
            if(!($repass.val() == $password.val())) {
                $span.eq(3).html('输入与密码不符').css('color','red');
                $repasslock = false;
            }
        }
        // 判断输入正确勾选并提示
        if($password.val().length >= 6 && $password.val().length <= 16 && $passrank >= 2) {
            $passlock = true;
        }
        changeSubmit();
    });

    // 判断用户输入的确认密码是否和密码一样
    $repass.on('input',function() {
        // 用户每次更改确认密码将后面提示清空
        $span.eq(3).html('');
        // 如果确认密码密码的数值为空，报错并提示
        if($repass.val() == '') {
            $span.eq(3).html('请输入密码').css('color','red');
            $repasslock = false;
        }
        // 获取与当前输入确认密码长度一样的密码
        let $mima = $password.val().substring (0,$repass.val().length);
        // 判断输入密码是否一样
        if(!($repass.val() == $mima)) {
            $span.eq(3).html('输入与密码不符').css('color','red');
            $repasslock = false;
        }
        if($password.val().length == 0) {
            $span.eq(3).html('请先输入密码').css('color','red');
        }
        // 判断确认密码和密码是否一样
        if($repass.val() == $password.val()) {
            $span.eq(3).html('√').css('color','green');
            $repasslock = true;
        }
        changeSubmit();
    });
    // 判断是否可以改变按钮颜色
    function changeSubmit() {
        if(!$namelock || !$tellock || !$passlock || !$repasslock) {
            $submit.css({
                background: '#ddd',
                color: '#999'
            });
        }else {
            $submit.css({
                background: '#ff4001',
                color: '#fff'
            });
        }
    }
    // 提交按钮点击事件
    $('form').on('submit',function() {
        if($username.val() == '') {
            $span.eq(0).html('请输入账号').css('color','red');
        }
        if($tel.val() == '') {
            $span.eq(1).html('请输入手机号码').css('color','red');
        }
        if($password.val() == '') {
            $span.eq(2).html('请输入密码').css('color','red');
        }
        if($repass.val() == '') {
            $span.eq(3).html('请确认密码').css('color','red');
        }
        if(!$namelock || !$tellock || !$passlock || !$repasslock) {
            return false; //阻止默认行为
        }else {
            alert("注册成功!");
        }
    });
}(jQuery);