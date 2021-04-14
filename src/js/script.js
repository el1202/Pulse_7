// ----------------1-й вар слайдера Slick и библиот JQuery
$(document).ready(function() { /* копируем код с сайта slick - initialize your slider */
    $('.carousel__inner').slick({
        speed: 1200,
        /* скорость переключения слайдера, в млсек или 1,2 сек, чем больше число, тем медлен переключение */
        adaptiveHeight: true,
        // задаем вид стрелочек переключения слайда при помощи картинки и потом застилизовать стрелочки файл _carousel, задать размеры картинки
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [{ /* адаптивн верстка слайдера , 768 пикс - граница перехода с больш экран на планшет и мобил версии*/
            // [ ] - массив, { } - объект с данными
            breakpoint: 992,
            /* от 0 до 992 пикс- размер экрана для которого будут работать пропис ниже правила */
            settings: {
                dots: true,
                /* точки под слайдером включаем */

                arrows: false /* стрелки прокрутки выключаем */
            }
        }]
    });

    // ---------------скрипты для табов переключения каталога товаров, копируем исх скрип с сайта и донастраиваем
    // есть в index тег ul. с классом catalog__tabs
    // кликаем на li: с классом catalog__tab_active
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            // .addClass('catalog__tab_active') добавл класс акт второму табу
            // siblings().removeClass('catalog__tab_active') - у всех соседних табов нужно удалить класс активности, если он у них присутствует
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')

        //   далее находим ближайщий элемент с классом - div.container'
        // внутри этого контейнера нужно найти блок - find('div.catalog__content')
        // у найденых элементов удаляем класс актив - removeClass('catalog__content_active')
        // когда у меня таб номер два, следовательно нужно октрыть контент номер два- eq($(this).index()).addClass('catalog__content_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });


    // --------------------------скрипт для кнопок ПОДРОБНЕЕ и НАЗАД
    // toggleSlide(item) - ссылка к которой обращаемся
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    // указываем ссылки к которым идет обращение
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // ---------------Modal
    // скрипта для модальных окон
    // обращаемся к, получаем данные по дата - атрибуту[data - modal] -
    // on('click') - кликаем по єлементу
    // function() {}); - что будет происходить при клике по кнопке сначала получаем $('.overlay'), тк он изначально скрыт, для оптимизации можно сразу указать уник id(#consultation)
    // .fadeIn(); - будем показывать это оверлей(.overlay), 'slow' - можно указать что открывание мод окна будет происходить медленно 
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    // скрипт для крестика закрытия окна обращемся к крестику - кликаем - будет закрываться все єлементы, которые нас не интересуют 
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    // скрипт для второго модал окна 
    // меняем в модал окне название пульсометра
    // .each - задем перебор будет віполняться определ операция
    // (i) - отвечает за номер элемента попорядку
    // $(this) - та кнопка на которую сейчас нажали, кнопка определенной карточки товара
    // on('click'); - на нее сейчас будет совершен кликаем
    // $('#order  - внутри модал окна есть такое класс .modal__descr')
    // text($('.catalog-item__subtitle'' - хочу поместить во внутрь какой-то текст, который наход в каталоге карточек товаров
    // eq(i) - указываем номер карточки, получать определенный элемент по порядку
    // text() - получаем текст данного элемента, карточки
    // $('.overlay, #order').fadeIn('slow'); - команда которая показывает модальное оконо
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // плагин валидыции форм - подсказки в инпутах форм
    // для обращения прописываем уник идентиф форм 

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            // настраиваем сообщения подсказки под окнами формы
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    // прописываем скрипт для маски ввода номера телефона
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // прописываем скрипт для отправки писем с сайта
    // делаем обращение к форме $('form') 
    // submit() когда они будут подтверждаться все условия, инпуты и валидация и форма отправляется
    // function() { - задаем функцию
    // e.preventDefault(); - отменяем стандартное поведение браузера, отключили перезазрузку браузера после отправки формі
    // при помощи метода s.ajax({- отправляем данные на сервер
    // type: "POST" - отдаем данные на сервер
    // ulr: "mailer/smart.php" -адрес запроса
    // data: $(this)- данные, которые отправляем на всервер
    // .done(function() { - выполнили операцию и задем еще функцию или операцию
    // find("input") - находим данные
    // val("") - очищаем все импуты, задаем пустую строку


    // $('form').trigger('reset');- запускаем тригер для очистки форм
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            // скрипт модальн окна с блпгодарностью
            // fadeOut() закрываем модальн окна после отправки
            $('#consultation, #order').fadeOut();
            // модальные окна будут вызвывать анимацию fadeIn('slow')
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // smooth scroll and pageup - скрипт для плавного скрола и элемента вверх
    $(window).scroll(function() {
        // если при прокрутке уже пролистано 1600рх сверху
        if ($(this).scrollTop() > 1600) {
            // ссылка вверх появится
            $('.pageup').fadeIn();
        } else {
            // если условие не выполнено, то ссылка-стрелка скрыта
            $('.pageup').fadeOut();
        }
    });

    // скрипт плавной прокрутки при нажатии на ссылку-стрелку
    $("a[href^='#']").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });

    // подключаем плагин для анимации отзывов
    new WOW().init();
});

// -------------2-й вар слайдера tiny-slider
// const slider = tns({
//     container: '.carousel__inner',
//     /* контейнер нашего слайдера */
//     items: 1,
//     /* кол видимых картинок в слайдере */
//     slideBy: 'page',
//     /* кол переключаемых слайдов */
//     autoplay: false,
//     /* автопрокрутка */
//     controls: false,
//     /* убираем исходные (кнопки идущие в исх коде слайдера) кнопки прокрутки */
//     nav: false /* убираем точки под слайдером навигации */
// });

// активизируем кнопки-стрелки - задаем обращенеи к селектору (обращ к первой кнопке)
// document.querySelector('.prev').addEventListener('click', function() {
//     slider.goTo('prev');
// });

// document.querySelector('.next').addEventListener('click', function() {
//     slider.goTo('next');
// });