console.log('script work!');

$(document).ready(function () {

  $('#fullpage').fullpage({
    autoScrolling: true,
    scrollHorizontally: true,
    anchors: ['promo', 'services', 'portfolio', 'team', 'contact'],
    menu: '#menu',
  });

  $('.menu__icon').on('click', function (e) {
    $(this).toggleClass('menu-open');
    $('.menu__list').toggleClass('menu__list-open');
    popup.removeClass('open');

    if ($('.menu__icon').hasClass('menu-open')) {
      lockScroll();
      return;
    }

    unLockScroll();
  });

  $('.menu__list > li').on('click', function (e) {
    $('.menu__icon').removeClass('menu-open');
    $('.menu__list').removeClass('menu__list-open');
    unLockScroll();
  })

  const popup = $('.popup');

  $('.button').on('click', (e) => {
    popup.toggleClass('open');
    $('.menu__icon').removeClass('menu-open');
    $('.menu__list').removeClass('menu__list-open');

    if (popup.hasClass('open')) {
      lockScroll();
      fullpage_api.setLockAnchors(true);
      return;
    }

    unLockScroll();
    fullpage_api.setLockAnchors(false);
  });

  $('.close').on('click', (e) => {
    popup.removeClass('open');

    unLockScroll();
    fullpage_api.setLockAnchors(false);
  });

  document.addEventListener('keyup', function (e) {
    if (e.key == 'Escape' && popup.hasClass('open')) {
      popup.removeClass('open');
      unLockScroll();
      fullpage_api.setLockAnchors(false);
    }
  });

  $('#serviceList').niceSelect();

  let start = new Date(),
    startHours = 9;

  // 09:00
  start.setHours(9);
  start.setMinutes(0);

  new AirDatepicker('#dateTime', {
    timepicker: true,
    startDate: start,
    minDate: start,
    minHours: startHours,
    maxHours: 20,
    maxMinutes: 30,
    minutesStep: 30,
    isMobile: true,
  });

  let prefIndex;

  $('.spoller__info').on('click', function (e) {

    let currentIndex = $(this).index('.spoller__info');

    if (currentIndex === prefIndex) {
      $(this).next().slideToggle();
      $(this).toggleClass('open');
      return;
    }

    $(this).next().slideDown();
    $(this).addClass('open');
    $('.spoller__info').eq(prefIndex).next().slideUp();
    $('.spoller__info').eq(prefIndex).removeClass('open');
    prefIndex = currentIndex;

  });

  $('.portfolio__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    lazyLoad: 'ondemand',
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 767.98,
        settings: {
          arrows: false,
          dots: true
        }
      }],
  });

  $('.team__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    lazyLoad: 'ondemand',
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 767.98,
        settings: {
          arrows: false,
          dots: true
        }
      }],
  });

  function lockScroll() {
    fullpage_api.setAllowScrolling(false);
    fullpage_api.setKeyboardScrolling(false);
  };

  function unLockScroll() {
    fullpage_api.setAllowScrolling(true);
    fullpage_api.setKeyboardScrolling(true);
  }

});

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [30.14157090797415, 59.84811395435769],
    zoom: 17,
    controls: ['zoomControl', 'searchControl', 'routeButtonControl', 'geolocationControl', 'trafficControl'],
  }, {
    searchControlProvider: 'yandex#search'
  }),
    myPlacemark = new ymaps.Placemark([30.140810826921093, 59.84845637006679], {
      balloonContentHeader: "Blade & Beard",
      balloonContentBody: "Каждый день с <em>9:00</em> до <em>21:00</em>",
      balloonContentFooter: "+7 800 555-65-65",
    });

  myMap.behaviors.disable('scrollZoom');
  myMap.geoObjects.add(myPlacemark);
}
