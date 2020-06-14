// 轮播图
!function($) {
    $lunbo = $('.banner');
    $imgli = $('.banner ul li');
    $olli = $('.banner ol li');
    $left = $('.bannerleft');
    $right = $('.bannerright');

    let $index = 0;//接收下标

    $olli.on('click',function() {
        $index = $(this).index();
        lunbo();
    });

    $left.on('click',function() {
        $index--;
        if($index < 0) {
            $index = $imgli.length-1;
        }
        lunbo();
    });
    $right.on('click',function() {
        $index++;
        if($index > $imgli.length-1) {
            $index = 0;
        }
        lunbo();
    });
    
    function lunbo() {
        $olli.eq($index).addClass('active').siblings('.banner ol li').removeClass('active');
        $imgli.eq($index).css({
            opacity: 1
        }).siblings('.banner ul li').css({
            opacity: 0
        });
    }

    //设置自动轮播
    let timer = setInterval(() => {
        $right.click();
    }, 2000);

    // 鼠标移入停止自动轮播，移出恢复
    $lunbo.hover(function() {
        clearInterval(timer);
    },function() {
        let timer = setInterval(() => {
            $right.click();
        }, 2000);
    });
}(jQuery);

// 登录名称渲染
!function($) {
    let $sid = 0;
    if($.cookie('id')) {
        $sid = $.cookie('id');
        $('.index_login1').css({
            display: 'none'
        });
        $('.index_login2').css({
            display: 'block'
        });
        $('.index_login2 p').html($sid);
    }
}(jQuery);

// 热门采购渲染
!function($) {
    $.ajax({
        url:"http://10.31.162.21/ZOL/php/indexData.php",
        dataType: 'json'
    }).done(function(data) {
        let $arraydata = [];//存放热门采购的数组
        let num = 0;//默认下标
        $arraydata[0] = data.slice(0,6);
        $arraydata[1] = data.slice(6,12);
        $arraydata[2] = data.slice(12,18);
        
        render($arraydata,num);
        $('.procurementtop_change').on('click',function() {
            num++;
            if(num>2) {
                num = 0;
            }
            render($arraydata,num);
        });
    });

    //渲染
    function render(data,num) {
        let $strhtml = '<ul>';
        $.each(data[num],function(index,value) {
            $strhtml += `
                <li>
                    <img src="${value.url}">
                    <p>${value.title}</p>
                    <span>￥${value.price}</span>
                    <button>立即采购</button>
                </li>
            `;
        });
        $strhtml += '</ul>';
        $('.procurementcontent').html($strhtml) ;
    }
}(jQuery);

// 分类的渲染
!function($) {
    $.ajax({
        url:"http://10.31.162.21/ZOL/php/indexData.php",
        dataType: 'json'
    }).done(function(data) {
        let $arraydata = data.slice(0,8);
        let $strhtml = '';
        for(let i = 0; i < $arraydata.length; i++){
            $strhtml += `
                <li>
                    <img class="lazy" data-original="${$arraydata[i].url}" width="160" height="120">
                    <p>${$arraydata[i].title}</p>
                    <span>￥${$arraydata[i].price}</span>
                </li>
            `;
        }
        $('.classifyRight').html($strhtml) ;

        //添加懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
    });
}(jQuery);