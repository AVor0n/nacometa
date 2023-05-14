export const init = () => {
    const slider = document.querySelector('.video-slider');
    const cardsContainer = slider.querySelector('.video-slider__slides');
    const card = slider.querySelector('.video-slider__slide');
    const nextBtn = slider.querySelector('.video-slider__next-btn');
    const prevBtn = slider.querySelector('.video-slider__prev-btn');
    const scrollStep = card.clientWidth / 2;

    const updateBtns = () => {
        nextBtn.disabled = cardsContainer.scrollLeft + cardsContainer.clientWidth === cardsContainer.scrollWidth;
        prevBtn.disabled = cardsContainer.scrollLeft === 0;
    };

    updateBtns();

    cardsContainer.addEventListener('wheel', e => {
        cardsContainer.scrollBy(e.deltaY, 0);
        updateBtns();
        e.preventDefault();
    });

    nextBtn.addEventListener('click', () => {
        cardsContainer.scrollBy(scrollStep, 0);
        updateBtns();
    });
    prevBtn.addEventListener('click', () => {
        cardsContainer.scrollBy(-scrollStep, 0);
        updateBtns();
    });
};
