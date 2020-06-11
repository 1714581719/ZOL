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
            data = JSON.parse(data);
            console.log(data);
            for(let j = 0; j < data.length; j++) {
                $strhtml += `
                    <div class="cart_goods">
                        <label for=""><input type="checkbox" checked></label>
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
            }
            $('.cart').html($('.cart').html() + $strhtml);
        });

        // 全选事件
        $('.all').on('change',function() {
            
        });
    }
}(jQuery);