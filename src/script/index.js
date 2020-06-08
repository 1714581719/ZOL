// 轮播图
!function($) {

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