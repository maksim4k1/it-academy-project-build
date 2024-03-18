(function () {
  "use strict";

  const checkboxes = document.querySelectorAll("input[name=tableNum]");
  const form = document.getElementById("js-form");
  if (checkboxes && form) {
    let tablesSet = new Set();
    const redCost = 1400;
    const blackCost = 1250;
    let redСhairs = 0;
    let blackСhairs = 0;

    const countRed = document.getElementById("js-countRed");
    const countBlack = document.getElementById("js-countBlack");
    const sumRed = document.getElementById("js-sumRed");
    const sumBlack = document.getElementById("js-sumBlack");
    const sum = document.getElementById("js-sum");

    for (let input of checkboxes) {
      input.addEventListener("change", () => {
        let [tableNum, chairs] = input.value.split(" ").map((el) => +el);
        let table = document.getElementById(`js-table${tableNum}`);

        let isAdd = true;
        if (table.classList.contains("active")) isAdd = false;
        table.classList.toggle("active");

        let isRed = table.classList.contains("scene__table--red");

        if (isAdd) {
          tablesSet.add(input.value);
          if (isRed) redСhairs += chairs;
          else blackСhairs += chairs;
        } else {
          tablesSet.delete(input.value);
          if (isRed) redСhairs -= chairs;
          else blackСhairs -= chairs;
        }

        countRed.innerText = `${redСhairs} шт. | ${redCost}`;
        sumRed.innerText = `${redСhairs * redCost} ₽`;
        countBlack.innerText = `${blackСhairs} шт. | ${blackCost}`;
        sumBlack.innerText = `${blackСhairs * blackCost} ₽`;
        sum.innerText = `${blackСhairs * blackCost + redСhairs * redCost} ₽`;
      });
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const disabledInputs = [];
      for (let val of tablesSet) {
        disabledInputs.push(document.querySelector(`input[value="${val}"]`));
        let tableEl = document.getElementById(`js-table${val.split(" ")[0]}`);
        tableEl.classList.remove("active");
        tableEl.classList.add("disabled");
      }

      for (let input of disabledInputs) {
        input.checked = false;
        input.setAttribute("disabled", true);
      }

      redСhairs = 0;
      blackСhairs = 0;

      countRed.innerText = `${redСhairs} шт. | ${redCost}`;
      sumRed.innerText = `${redСhairs * redCost} ₽`;
      countBlack.innerText = `${blackСhairs} шт. | ${blackCost}`;
      sumBlack.innerText = `${blackСhairs * blackCost} ₽`;
      sum.innerText = `${blackСhairs * blackCost + redСhairs * redCost} ₽`;
    });
  }

  // document overflow functions
  function documentOverflowAuto() {
    document.documentElement.style.overflow = "auto";
  }
  function documentOverflowHidden() {
    document.documentElement.style.overflow = "hidden";
  }

  // modal
  const modalEl = document.getElementById("js-modal");

  if (modalEl) {
    const closeModalFormButtonEl = document.getElementById(
      "js-close-modal-form-button",
    );
    const closeModalButtonEl = document.getElementById("js-close-modal-button");
    const openModalButtonEl = document.getElementById("js-open-modal-button");

    function closeModal() {
      documentOverflowAuto();
      modalEl.classList.remove("modal--visible");
    }
    function openModal() {
      documentOverflowHidden();
      modalEl.classList.add("modal--visible");
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" || event.keyCode === 27) closeModal();
    });

    modalEl.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) closeModal();
    });

    if (closeModalFormButtonEl)
      closeModalFormButtonEl.addEventListener("click", closeModal);
    if (closeModalButtonEl)
      closeModalButtonEl.addEventListener("click", closeModal);
    if (openModalButtonEl)
      openModalButtonEl.addEventListener("click", openModal);
  }

  // navbar
  const navbar = document.getElementById("js-header-nav");
  const burgerButton = document.getElementById("js-burger-button");

  let navbarIsOpened = false;

  function closeNavbar() {
    documentOverflowAuto();
    navbar.classList.remove("page-header__nav--opened");
    burgerButton.classList.remove("page-header__burger-button--close");
    navbarIsOpened = false;
  }
  function openNavbar() {
    documentOverflowHidden();
    navbar.classList.add("page-header__nav--opened");
    burgerButton.classList.add("page-header__burger-button--close");
    navbarIsOpened = true;
  }

  navbar.addEventListener("click", (event) => {
    if (navbarIsOpened && event.target !== event.currentTarget) closeNavbar();
  });

  burgerButton.addEventListener("click", () => {
    if (navbarIsOpened === false) openNavbar();
    else closeNavbar();
  });

  //select
  const jsSelectric = $(".js-selectric");
  if (jsSelectric.length) {
    jsSelectric.selectric({
      nativeOnMobile: false,
    });
  }

  //datapicker
  var dateField = $(".js-dateField");

  if (dateField.length) {
    var pickerInit = function (pick) {
      var dateInput = pick.find(".js-dateInput");
      var dateDay = pick.find(".js-dateDay");
      var dateMonth = pick.find(".js-dateMonth");
      var dateYear = pick.find(".js-dateYear");

      var dateConfig = {
        autoClose: true,
        minDate: new Date(),
        navTitles: {
          days: "MMMM <i>yyyy</i>",
        },
        onSelect: function ({ date }) {
          dateDay.val(date ? ("0" + date.getDate()).slice(-2) : "");
          dateMonth.val(date ? ("0" + (date.getMonth() + 1)).slice(-2) : "");
          dateYear.val(date ? date.getFullYear() : "");
        },
      };
      new AirDatepicker(dateInput[0], dateConfig);
    };

    $.each(dateField, function (i) {
      pickerInit($(this));
    });
  }

  // phone
  const mobileMask = $(".js-mobileMask");
  if (mobileMask.length) {
    mobileMask.mask("+7 (000) 000 00 00", {
      placeholder: "+7 (___) ___ __ __",
    });
  }

  // validate
  const eventForm = $("#js-eventForm");
  if (eventForm.length) {
    eventForm.validate({
      errorElement: "span",
    });
  }
  const subscribeForm = $("#js-subscribeForm");
  if (subscribeForm.length) {
    const subscribeAction = subscribeForm.attr("action");
    const subscribeEmail = subscribeForm.find("#js-subscribeEmail");
    subscribeForm.validate({
      errorElement: "span",
      submitHandler: function (form, event) {
        event.preventDefault();
        $.ajax({
          url: subscribeAction,
          method: "POST",
          data: {
            email: subscribeEmail.val(),
          },
          success: function () {
            subscribeEmail.val("");
            subscribeEmail.blur();
            alert("Вы успешно подписались на рассылку новостей");
          },
          error: function () {
            alert("Что-то пошло не так, попробуйте еще раз");
          },
        });
      },
    });
  }

  // swiper
  const swipers = document.querySelectorAll(".js-swiper");

  swipers.forEach(function (swpr) {
    new Swiper(swpr, {
      updateOnWindowResize: true,
      slidesPerView: "auto",
      freeMode: true,
      spaceBetween: 0,
      speed: 500,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-arrow-next",
        prevEl: ".swiper-arrow-prev",
        disabledClass: "button-disabled",
      },
    });
  });

  // map
  const contactsMap = document.querySelector("#js-map");
  if (contactsMap) {
    const mapStyles = [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#242f3e",
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#746855",
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#242f3e",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563",
          },
        ],
      },
      {
        featureType: "poi",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#263c3f",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#6b9a76",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#38414e",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#212a37",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9ca5b3",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#746855",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#1f2835",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#f3d19c",
          },
        ],
      },
      {
        featureType: "transit",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#2f3948",
          },
        ],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#17263c",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#515c6d",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#17263c",
          },
        ],
      },
    ];
    const mapCenter = new google.maps.LatLng(56.49387, 84.96274);
    const mapOptions = {
      center: mapCenter,
      disableDefaultUI: true,
      draggable: true,
      gestureHandling: "cooperative",
      scrollwheel: false,
      styles: mapStyles,
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
    };
    const map = new google.maps.Map(contactsMap, mapOptions);

    const point = new google.maps.LatLng(56.49385, 84.96274);
    const mapPin = new google.maps.MarkerImage(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABHCAMAAABf/MtLAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAADAUExURUdwTK8wILwyJL0zI70yJbwyI79AIL0yJL8wILs0JLw0JLsyJL0zJbwyJbwzJB8eHv///3Nycjs6OldWVsRMP4+OjsRNP8fHx+Pj492ZkUlISOazrauqqu7MyMfGxsBAMS0sLMlZTc1mW/vy8sBAMvvy8WVkZMVMQPbl48lZTtmMg81mWtmMhMxmW4+Pj/fm4/fl5OGmnvHx8Z2cnMVNQPLZ1tWAdt6ZktBzaHNzc9V/duq/u+Gmn8hZTNFzabm5uYZR+N4AAAAOdFJOUwAQz9/f3xB/EIDPz9/ftWbT5QAAAWxJREFUWMPt1VlTwjAQAGDEaluPJiQhYGjtAeUQxPu+/v+/cpO2DC+OI7PRYcw+JOlO55vMdpO2WmtBNo3W9+FsZzvb2c529l/Y45hXi/iG6yA8fuKMkGUMqS5X1RvLONvA7tJOtaD9au5AginSo5A6hUem3+hRhmUTwhubjNFttbKzDwT7GqqtGpv0G5vE2Ptes9FrsvqW/9FmXDGIjHCuZwYJc0wUHCn9aYlJKO7uKmf/sh39LJxtxx7lObJ9e1emMA1oISN5OUmFmNMrIQSGnd/TM2M/w3iRwCDpCdK+i9EwMfY5jMkU056l0SvNtf0GT0PUfT9K+a6tAYUKP0wFpl3oSpTansuXchIh2jM9LKDWet/SlATNLkxjg2lqsjAtg9cnOqCbU1Ev9Ji6+wTTdv/LLbJdbHnsh160GwZW6ANz+Ns28LC+WXwL9lFt71mwv7gSUcKzuG/fYr2DtqEPd2w0YeAfR55vg/4EpN3f8dlAXnoAAAAASUVORK5CYII=",
      new google.maps.Size(91, 71),
      new google.maps.Point(0, 0),
      new google.maps.Point(0, 71),
    );
    new google.maps.Marker({
      position: point,
      map: map,
      icon: mapPin,
      title: "TAGREE digital",
    });
  }
})();
