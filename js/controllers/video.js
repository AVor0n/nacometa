export const init = () => {
    const slider = document.querySelector('.video-slider');
    const cardsContainer = slider.querySelector('.video-slider__slides');
    const card = slider.querySelector('.video-slider__slide');
    const nextBtn = slider.querySelector('.video-slider__next-btn');
    const prevBtn = slider.querySelector('.video-slider__prev-btn');
    const scrollStep = card.clientWidth / 2;

    const isEnd = () => cardsContainer.scrollLeft + cardsContainer.clientWidth + 10 >= cardsContainer.scrollWidth;
    const isStart = () => cardsContainer.scrollLeft === 0;

    const updateBtns = () => {
        nextBtn.disabled = isEnd();
        prevBtn.disabled = isStart();
    };

    updateBtns();

    cardsContainer.addEventListener('wheel', e => {
        const direction = e.deltaY < 0 ? 'up' : 'down';
        if ((direction === 'up' && isStart()) || (direction === 'down' && isEnd())) {
            return;
        }
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
