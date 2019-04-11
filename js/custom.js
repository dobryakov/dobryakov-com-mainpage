window.custom_data = window.custom_data || {};
window.custom_data['scrolled_elements'] = [];

// функция проверки полной видимости элемента
function checkPosition(el) {
    if (window.custom_data['scrolled_elements'].includes(el.attr('id'))) { return }
    //console.log('checking element', el);

    // координаты дива
    var div_position = el.offset();
    // отступ сверху
    var div_top = div_position.top;
    // отступ слева
    var div_left = div_position.left;
    // ширина
    var div_width = el.width();
    // высота
    var div_height = el.height();

    // проскроллено сверху
    var top_scroll = $(document).scrollTop();
    // проскроллено слева
    var left_scroll = $(document).scrollLeft();
    // ширина видимой страницы
    var screen_width = $(window).width();
    // высота видимой страницы
    var screen_height = $(window).height();

    // координаты углов видимой области
    var see_x1 = left_scroll;
    var see_x2 = screen_width + left_scroll;
    var see_y1 = top_scroll;
    var see_y2 = screen_height + top_scroll;

    // координаты углов искомого элемента
    var div_x1 = div_left;
    var div_x2 = div_left + div_height;
    var div_y1 = div_top;
    var div_y2 = div_top + div_width;

    // проверка - виден див полностью или нет
    //if (div_x1 >= see_x1 && div_x2 <= see_x2 && div_y1 >= see_y1 && div_y2 <= see_y2) {
    // проверка - виден ли верхний край элемента
    //console.log(see_y1, div_y1);
    if (see_y1+100 >= div_y1) {
        // если виден
        //el.css({'background-color': 'green'});
        conversion_id = el.data('conversion-id');
        console.log('visible ', el, conversion_id);
        window.custom_data['scrolled_elements'].push(el.attr('id'));

        gtag('event', 'conversion', {
            'send_to': conversion_id
        });

    } else {
        // если не виден
        //el.css({'background-color': 'red'});
    }
}

function checkElementsVisible() {
    $("[data-conversion-id]").each(function(i, el){ checkPosition($(el)); });
}

(function ($) {

    $(document).scroll(function () {
        // при скролле страницы делаем проверку
        checkElementsVisible();
    });

    // после загрузки страницы сразу проверяем
    checkElementsVisible();

    // проверка при масштабировании и изменении размера страницы
    $(window).resize(function () {
        checkElementsVisible();
    });

})(jQuery);
