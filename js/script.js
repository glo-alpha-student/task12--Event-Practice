'use strict';

const titleName = document.getElementsByTagName('h1')[0];
const startButton = document.getElementsByClassName('handler_btn')[0];
const resetButton = document.getElementsByClassName('handler_btn')[1];
const plusButton = document.querySelector('.screen-btn');
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');
const range = document.querySelector('.rollback input');
const span = document.querySelector('.rollback .range-value');
const total = document.getElementsByClassName('total-input')[0];
const countOfscreen = document.getElementsByClassName('total-input')[1];
const countOther = document.getElementsByClassName('total-input')[2];
const fullContent = document.getElementsByClassName('total-input')[3];
const countRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {

    title: '',
    screens: [],
    adaptive: true,
    screenPrice: 0,
    fullPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    servicePricePercent: 0,
    servicePriceNumber: 0,
    rollback: 0,
    servicePercentPrice: 0,
    totalScreen: 0,
    init: function () {
        appData.addTitle();

        startButton.addEventListener('click', appData.start);
        plusButton.addEventListener('click', appData.addScreenblock);
        range.addEventListener('input', appData.addRange);
    },
    addTitle: function () {
        document.title = titleName.textContent;
    },
    redefination: function () {
        screens = document.querySelectorAll('.screen');
    },
    start: function () {
        appData.redefination();
        for (let i = 0; i < screens.length; i++) {
            if (screens[i].querySelector('select').value === '' ||
                screens[i].querySelector('input').value === '') {
                alert('no');
                return false;
            }
        }

        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        // appData.logger();
        appData.showResult();
    },
    showResult: function () {
        total.value = appData.screenPrice;
        countOther.value = appData.servicePricePercent + appData.servicePriceNumber;
        fullContent.value = appData.fullPrice;
        countRollback.value = appData.servicePercentPrice;
        countOfscreen.value = appData.totalScreen;
    },
    addRange: function () {
        span.textContent = range.value + "%";
        appData.rollback = range.value;
    },
    addScreens: function () {
        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            });

        });
    },
    addServices: function () {
        percentItems.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }

        });
        numberItems.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }

        });
    },
    addScreenblock: function () {
        appData.redefination();

        const cloneScreen = screens[0].cloneNode(true);

        cloneScreen.querySelector('input').value = '';

        screens[screens.length - 1].after(cloneScreen);

    },
    addPrices: function () {

        for (let myTears of appData.screens) {
            appData.screenPrice += +myTears.price;
        }
        for (let myTears of appData.screens) {
            appData.totalScreen += +myTears.count;
        }
        for (let myTears in appData.servicesNumber) {
            appData.servicePriceNumber += appData.servicesNumber[myTears];
        }
        for (let myTears in appData.servicesPercent) {
            appData.servicePricePercent += appData.screenPrice * (appData.servicesPercent[myTears] / 100);
        }

        appData.fullPrice = appData.screenPrice + appData.servicePriceNumber + appData.servicePricePercent;

        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    },

};

appData.init();