import { langs } from '../utils/locale.js';

const initLangSelectors = () => {
    const updateSelector = (cssSelector, locale) => {
        const $burgerLangSelect = document.querySelector(cssSelector);
        $burgerLangSelect.innerHTML = langs.getTextByKey('nav.locale', langs.getTextByKey(`locale.${locale}`));
    };

    updateSelector('.burger__lang-select .select__current-option', langs.locale);
    updateSelector('.nav__lang-select .select__current-option', langs.locale);

    langs.onChange(locale => {
        updateSelector('.burger__lang-select .select__current-option', locale);
        updateSelector('.nav__lang-select .select__current-option', locale);
    });
};

const initBurgerMenu = () => {
    const $burgerBtn = document.querySelector('.nav__burger-btn');
    const $burger = document.querySelector('.burger');
    const $overlay = document.querySelector('.overlay');

    const closeBurger = () => {
        $burger.classList.remove('burger--active');
        $overlay.classList.remove('overlay--active');
    };

    const openBurger = () => {
        $burger.classList.add('burger--active');
        $overlay.classList.add('overlay--active');
    };

    $burgerBtn.addEventListener('click', () => {
        const isOpen = $burger.classList.contains('burger--active');
        isOpen ? closeBurger() : openBurger();
    });

    $overlay.addEventListener('click', closeBurger);
    $burger.addEventListener('click', e => e.target.classList.contains('burger__link') && closeBurger());
};

export const init = () => {
    initLangSelectors();
    initBurgerMenu();
};
