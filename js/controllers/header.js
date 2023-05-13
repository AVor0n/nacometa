export const init = () => {
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
