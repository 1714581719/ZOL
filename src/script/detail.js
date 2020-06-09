// 渲染
!function($) {
    // 获取传来的sid
    let $sid = location.search.substring(1).split('=')[1];

    // 设置默认sid
    if(!$sid) {
        $sid = 4;
    }

    $.ajax({
        url: 'http://10.31.162.21/ZOL/php/gitsid.php',
        data: {
            sid: $sid
        },
        dataType: 'json'
    }).done(function(data) {
        $('.title').html(data.goods_name);
        $('.price i').html(data.goods_price);
        // 设置大图的图片路径
        $('.imgbox img').attr("src",data.goods_img);

        let $picarr = data.piclistimg.split(',');
        let $strhtml = `
            <li>
                <img src="${data.goods_img}" alt="">
            </li>
        `;

        // 设置常量
        const $iconLeft = $('.icon-left1');
        const $iconRight = $('.icon-right');
        const $imgUl = $('.imglist ul');

        for(let i = 0; i < $picarr.length; i++) {
            $strhtml += `
                <li>
                    <img src="${$picarr[i]}" alt="">
                </li>
            `;
        }
        // 设置imgUl的宽度
        $imgUl.css({
            width: ($picarr.length + 1) * (64 + 14)
        }).html($strhtml);

        // 设置常量
        const $imgUlList = $('.imglist ul li');

        $index = 0;// 缩略图选中下标
        // 缩略图效果
        $imgUlList.eq($index).addClass('active');
        // 鼠标点击左箭头事件
        $iconLeft.on('click',function() {
            $index--;
            imgMove();
        });

        // 鼠标点击右箭头事件
        $iconRight.on('click',function() {
            $index++;
            imgMove();
        });

        // 鼠标点击缩略图事件
        $imgUlList.on('click',function() {
            $index = $(this).index();
            imgMove();
        });

        // 鼠标点击左右箭头时缩略图的变化
        function imgMove() {
            // 给左右按钮添加状态
            if($index==0) {
                $iconLeft.addClass('iconfont_ban');
            }else if($index == $picarr.length) {
                $iconRight.addClass('iconfont_ban');
            }else {
                $iconLeft.removeClass('iconfont_ban');
                $iconRight.removeClass('iconfont_ban');
            }
            // 给li添加边框
            $imgUlList.eq($index).addClass('active').siblings('.imglist ul li').removeClass('active');
            //移动ul前判断是否移动    +1是因为自己额外添加了一张缩略图
            if($index <= $picarr.length + 1 - 5){
                // 移动ul
                $imgUl.css({
                    left: - $index * ($imgUlList.outerWidth() + 14)
                });
            }else {
                $imgUl.css({
                    left: - ($picarr.length + 1 - 5) * ($imgUlList.outerWidth() + 14)
                });
            }
            // 设置大图的图片路径
            if($index == 0) {
                $('.imgbox img').attr("src",data.goods_img);
            }else {
                $('.imgbox img').attr("src",$picarr[$index-1]);
            }
        }
    });
}(jQuery);

// 放大镜效果
!function($) {
    const $bigbox = $('.img_small');
    const $img_small = $('.img_small img');
    const $img_big = $('.img_big img');
    const $xiaofang = $('.xiaofang');
    const $dafang = $('.img_big');

    //设置小放的尺寸
    $xiaofang.css({
        width: $bigbox.outerWidth() / $img_big.outerWidth() * $dafang.outerWidth(),
        height: $bigbox.outerHeight() / $img_big.outerHeight() * $dafang.outerHeight()
    });

    $bigbox.hover(function() {
        // 显示小放和大放
        $xiaofang.css({
            visibility: 'visible'
        });
        $dafang.css({
            visibility: 'visible'
        });
        
        $(this).on('mousemove',function(ev) {
            var ev = ev || window.event;
            let leftvalue = ev.pageX - $bigbox.offset().left - $xiaofang.outerWidth() / 2;
            let topvalue = ev.pageY - $bigbox.offset().top - $xiaofang.outerHeight() / 2;

            // 规定小放的移动范围
            if(leftvalue < 0) {
                leftvalue = 0;
            }else if(leftvalue > $bigbox.outerWidth() - $xiaofang.outerWidth() - 2) {
                leftvalue = $bigbox.outerWidth() - $xiaofang.outerWidth() - 2;
            }
            if(topvalue < 0 ) {
                topvalue = 0
            }else if(topvalue > $bigbox.outerHeight() - $xiaofang.outerHeight() - 2) {
                topvalue = $bigbox.outerHeight() - $xiaofang.outerHeight() - 2;
            }

            // 小图移动
            $xiaofang.css({
                left: leftvalue,
                top: topvalue 
            });

            // 大图移动
            $img_big.css({
                left: - $dafang.outerWidth() / $xiaofang.outerWidth() * leftvalue,
                top: - $dafang.outerHeight() / $xiaofang.outerHeight() * topvalue,
            });
        })
    },function() {
        $xiaofang.css({
            visibility: 'hidden'
        });
        $dafang.css({
            visibility: 'hidden'
        });
    });
}(jQuery);

// 添加数量到cookie
!function($) {
    let arrsid = [];// 存储商品编号
    let arrnum = [];// 存储商品数量
    const $number = $('.number');
    const $num_add = $('.num_add');
    const $num_sub = $('.num_sub');
    
    
    // 需要判断此商品是否是第一次加入购物车
    // 第一次加入：在购物车页面创建商品列表
    // 多次加入：不需要创建商品列表，追加数量

    // 取出cookie
    function cookietoarray() {
        if($.cookie('cookiesid') || $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(',');
            arrnum = $.cookie('cookienum').split(',');
        }else {
            arrsid = [];
            arrnum = [];
        }
    }
    cookietoarray();

        console.log(arrsid);
        console.log(arrnum);

    // 点击加入购物车按钮事件
    $('.add_cart').on('click',function() {
        
        // 获取当前商品的sid
        let $sid = location.search.substring(1).split('=')[1];
        console.log($sid);

        // 取出当前cookie
        cookietoarray();

        console.log(arrsid);
        console.log(arrnum);
        console.log($.inArray($sid,arrsid) != -1);
        

        // 查找当前商品的sid在cookie是否存在
        if($.inArray($sid,arrsid) != -1){
            // 当前商品存在
            //先取出cookie中存在的数量+当前添加的数量，一起添加到cookie中。
            // let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#count').val()); //取值
            // arrnum[$.inArray($sid, arrsid)] = $num; //赋值
            arrnum[$.inArray($sid,arrsid)] = parseInt(arrnum[$.inArray($sid,arrsid)]) + parseInt($number.val());
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        }else {
            arrsid.push($sid);
            arrnum.push($number.val());
            $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        }
        alert('按钮触发了');
    });

    // 点击减
    $num_sub.on('click',function() {
        if($number.val()>0) {
            $number.val($number.val() - 1);
        }
    });
    // 点击加
    $num_add.on('click',function() {
        $number.val(parseInt($number.val()) + 1);
    });
}(jQuery);