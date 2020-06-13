// 渲染购物车列表
!function($) {
    let $username = 0;
    let $arrsid = [];
    let $arrnum = [];

    // 判断是否登录
    if($.cookie('id')) {
        $username = $.cookie('id');
        // 判断是否存在商品购买列表
        if($.cookie($username + 'sid') && $.cookie($username + 'num')) {
            $arrsid = $.cookie($username + 'sid').split(',');
            $arrnum = $.cookie($username + 'num').split(',');
        }else {
            $arrsid = [];
            $arrnum = [];
        }
        // 渲染购物车列表
        $.ajax({
            type: 'post',
            url: 'http://10.31.162.21/ZOL/php/cartData.php',
            data: {
                arrsid: $arrsid
            }
        }).done(function(data) {
            let $strhtml = '';
            let $sum = 0;
            data = JSON.parse(data);
            for(let j = 0; j < data.length; j++) {
                $strhtml += `
                    <div class="cart_goods" goods_sid="${data[j].id}">
                        <label for=""><input type="checkbox" class="check" checked></label>
                        <div class="goods_img">
                            <img src="${data[j].goods_img}" alt="">
                        </div>
                        <span class="goods_title">${data[j].goods_name}</span>
                        <span class="goods_price">${data[j].goods_price}</span>
                        <div class="number">
                            <span class="num_sub">
                                <img src="img/detail_minus.png" alt="">
                            </span>
                            <input class="goods_num" type="text" value="${$arrnum[j]}">
                            <span class="num_add">
                                <img src="img/detail_add.png" alt="">
                            </span>
                        </div>
                        <span class="goods_total_price">${(data[j].goods_price * $arrnum[j]).toFixed(2)}</span>
                        <span class="goods_delete">删除</span>
                    </div>
                `;
                $sum += data[j].goods_price * $arrnum[j];
            }
            $('.goods_cart').html($strhtml);
            $('.total_value').html($sum.toFixed(2));
            $('.goods_num').html($('.cart_goods').length);
        });
    }
}(jQuery);

// 购物车部分功能
!function($) {
    // 商品选择事件
    const $all = $('.all');

    // 全选事件
    $all.on('click',function() {
        $('.check').prop('checked',$(this).prop('checked'));
        $all.prop('checked',$(this).prop('checked'));
        update_money();
    });

    // 商品复选框事件
    $('.goods_cart').on('click','.check',function() {
        // 可以获取被选中的复选框
        // console.log($('.check:checked'));
        if($('.check:checked').length == $('.cart_goods').length) {
            $all.prop('checked',true);
        }else {
            $all.prop('checked',false);
        }
        update_money();
    });

    // 数量加事件
    $('.goods_cart').on('click','.num_add',function() {
        let $update_addnum = parseInt($(this).prev('.goods_num').val()) + 1
        // 更改数量
        $(this).prev('.goods_num').val($update_addnum);
        // 更改金额
        $(this).parent().nextAll('.goods_total_price').html(($(this).parent().prev().html() * $update_addnum).toFixed(2));
        // 重新渲染总商品件数和总价
        update_money();
        update_cookie($(this),'cookie_update');
    });

    // 数量减事件
    $('.goods_cart').on('click','.num_sub',function() {
        let $update_num = parseInt($(this).next('.goods_num').val());
        if($update_num > 1) {
            $update_num--;
            // 更改数量
            $(this).next('.goods_num').val($update_num);
            // 更改金额
            $(this).parent().nextAll('.goods_total_price').html(($(this).parent().prev().html() * $update_num).toFixed(2));
            // 重新渲染总商品件数和总价
            update_money();
            update_cookie($(this),'cookie_update');
        }else if($update_num == 1){
            return false;
        }
    });

    // 更改商品数量
    $('.goods_cart').on('input','.goods_num',function() {
        let $goods_nums = $(this).val();
        // 禁止用户输入除数字外的其他字符
        $(this).val($(this).val().replace(/[\D]/ig,""));
        // 数量最大值为999
        if($goods_nums > 999) {
            $(this).val(999);
        }
        $(this).parent().next().html(($(this).val() * $(this).parent().prev().html()).toFixed(2));
        update_money();
    });

    // 当商品数量失焦时，如果数量为0或没有，默认更改为1
    $('.goods_cart').on('blur','.goods_num',function() {
        if($(this).val() == '' || $(this).val() == 0) {
            $(this).val(1)
        }
        $(this).parent().next().html(($(this).val() * $(this).parent().prev().html()).toFixed(2));
        update_money();
        update_cookie($(this),'cookie_update');
    });

    // 商品删除事件
    $('.goods_cart').on('click','.goods_delete',function() {
        update_cookie($(this),'cookie_delete');
        $(this).parents('.cart_goods').remove();
        update_money();
    });

    // 多选商品删除事件
    $('.more_delete').on('click',function() {
        for(let i = 0; i < $('.check:checked').length; i++) {
            update_cookie($('.check:checked').parent().nextAll('.goods_total_price').eq(i),'cookie_delete');
            $('.check:checked').parents('.cart_goods').remove();
        }
        update_money();
    });

    // 渲染商品总件数和总价
    function update_money() {
        let $sum = 0;
        for(let i = 0; i < $('.check:checked').length; i++) {
            $sum += Number($('.check:checked').parent().nextAll('.goods_total_price').eq(i).html());
        }
        $('.total_value').html($sum.toFixed(2));
        $('.goods_num').html($('.check:checked').length);
    }

    // 更新cookie值
    function update_cookie(_this,affair) {
        // 获取id
        $username = $.cookie('id');
        // 获取cookie值
        $arrsid = $.cookie($username + 'sid').split(',');
        $arrnum = $.cookie($username + 'num').split(',');

        let $sid = _this.parents('.cart_goods').attr('goods_sid');
        let $num = _this.parents('.cart_goods').find('.goods_num').val();

        // 判断事件类型
        if(affair == 'cookie_update') {
            for(let i = 0; i < $arrsid.length; i++) {
                if($sid == $arrsid[i]) {
                    $arrnum[i] = $num;
                }
            }
        }else if(affair == 'cookie_delete') {
            for(let i = 0; i < $arrsid.length; i++) {
                if($sid == $arrsid[i]) {
                    $arrsid.splice(i,1);
                    $arrnum.splice(i,1);
                }
            }
        }

        // 给cookie重新赋值
        $.cookie($username + 'sid', $arrsid, { expires: 10, path: '/' });
        $.cookie($username + 'num', $arrnum, { expires: 10, path: '/' });
    }
}(jQuery);