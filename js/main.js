/* Nav toggle */

const nav = document.querySelector('.header__nav');
const menuBtn = document.querySelector('.menu-btn');
const menuIcon = document.querySelector('.menu-icon');

menuBtn.onclick = function () {
    nav.classList.toggle('header__nav--mobile');
    menuIcon.classList.toggle('menu-icon--active');
    document.body.classList.toggle('no-scroll');
};

/* Phone Mask */
mask('[data-phone-input]')

/* Удаляем '+' если больше ничего не введено, т.е. возвращаем отображение placeholder у инпутов "Ваш телефон"*/
const phoneInputs = document.querySelectorAll('[data-phone-input]');
phoneInputs.forEach((input) => { // для каждого инпута подобного рода (selectorAll)
    input.addEventListener('input', () => {
        (input.value == '+') // если в инпуте только плюс сбрасывает его на дефолт
            ? input.value = ''
            : '';
    })
    input.addEventListener('blur', () => {
        (input.value == '+') // если в инпуте при переключении на другую область экрана или другой инпут был плюс, то тоже сбрасываем его на дефолт
            ? input.value = ''
            : '';
    })
});

/* Yandex Map */

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init() {
    // Создание карты.
    let map = new ymaps.Map('map', {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [59.974387, 30.319515],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 16,
    });

    let myPlacemark = new ymaps.Placemark(
        [59.974387, 30.319515],
        {
            balloonContent: `
				<div class="balloon">
					<div class="balloon__address">Аптекарский проспект 18</div>
					<div class="balloon__contacts">
						<a href="tel:+78121234567">+8 (812) 123-45-67</a>
					</div>
				</div>
			`,
        },
        {
            iconLayout: 'default#image',
            iconImageHref: './img/map/location-pin.svg',
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -40],
        }
    );

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип

    // map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

    map.geoObjects.add(myPlacemark);
    myPlacemark.balloon.open();

}

