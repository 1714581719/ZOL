!function($) {
    let array_default = [];//排序前的li数组
    let array = [];//排序的数组
    let prev = null;
    let next = null;

    // 渲染列表数据
    $.ajax({
        url:'http://10.31.162.21/ZOL/php/listdata.php',
        dataType: 'json'
    }).done(function(data) {
        let $strhtml = '';
        for(let i = 0; i < data.length; i++){
            $strhtml += `
                <li>
                    <a href="detail.html?sid=${data[i].id}">
                        <img class="lazy" data-original="${data[i].goods_img}" width="220" height="165">
                    </a>
                    <p>${data[i].goods_name}</p>
                    <span class="goods_price">￥${data[i].goods_price}</span>
                    <em></em>
                </li>
            `;
        }
        $('.goodsUl').html($strhtml);

        //添加懒加载
         $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });

        array_default = [];//排序前的数组
        array = [];//排序的数组
        prev = null;
        next = null;

        $('.goodsUl li').each(function(index){
            array[index] = $(this);
            array_default[index] = $(this);
        });
    });

    //分页
    $('.page').pagination({
        pageCount:3,//总的页数
        jump: true,//是否开启跳转到指定的页数，布尔值
        coping: true,//是否开启首页和尾页，布尔值
        prevContent: '<上一页',
        nextContent: '下一页>',
        homePage: '首页',
        endPage: '尾页',
        callback: function(api) {
            console.log(api.getCurrent());//获取的页码给后端
            $.ajax({
                url: 'http://10.31.162.21/ZOL/php/listdata.php',
                data: {
                    page: api.getCurrent(),
                },
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                for(let i = 0; i < data.length; i++){
                    $strhtml += `
                        <li>
                            <a href="detail.html?sid=${data[i].id}">
                                <img src="${data[i].goods_img}">
                            </a>
                            <p>${data[i].goods_name}</p>
                            <span class="goods_price">￥${data[i].goods_price}</span>
                            <em></em>
                        </li>
                    `;
                }
                $('.goodsUl').html($strhtml);

                array_default = [];//排序前的li数组
                array = [];//排序中的数组
                prev = null;
                next = null;

                //将页面的li元素加载到两个数组中
                $('.goodsUl li').each(function (index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            });
        }
    })

    // 排序
    $('.rankdefault').on('click', function () {
        $('.rankdefault').addClass('rank_active').siblings('.rank ul li').removeClass('rank_active');
        $.each(array_default, function (index, value) {
            $('.goodsUl').append(value);
        });
        return;
    });
    $('.ranklow').on('click', function () {
        $('.ranklow').addClass('rank_active').siblings('.rank ul li').removeClass('rank_active');
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.goods_price').html().substring(1));
                next = parseFloat(array[j + 1].find('.goods_price').html().substring(1));
                //通过价格的判断，改变的是li的位置。
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        $.each(array, function (index, value) {
            $('.goodsUl').append(value);
        });
    });
    $('.rankhigh').on('click', function () {
        $('.rankhigh').addClass('rank_active').siblings('.rank ul li').removeClass('rank_active');
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.goods_price').html().substring(1));
                next = parseFloat(array[j + 1].find('.goods_price').html().substring(1));
                //通过价格的判断，改变的是li的位置。
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //清空原来的列表，将排序后的数据添加上去。
        //empty() : 删除匹配的元素集合中所有的子节点。
        // $('.list ul').empty();//清空原来的列表
        $.each(array, function (index, value) {
            $('.goodsUl').append(value);
        });
    })
}(jQuery);