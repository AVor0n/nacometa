export const init = () => {
    const slider = document.querySelector('.feedback-slider');
    const cardsContainer = slider.querySelector('.feedback-slider__slides');
    const cards = slider.querySelectorAll('.feedback-slide');
    const sliderIndicators = slider.querySelector('.feedback-slider__indicators');
    const nextBtn = slider.querySelector('.feedback-slider__next-btn');
    const prevBtn = slider.querySelector('.feedback-slider__prev-btn');

    let currentSlide = 0;
    let countVisibleCards = getVisibleCardsCount();
    let touchStart = {
        x: 0,
        y: 0,
    };

    createIndicators();
    updateIndicators();
    updateBtns();

    cardsContainer.addEventListener('wheel', event => {
        const direction = Math.sign(event.deltaY);
        const cardIndex = getVisibleCardIndex(cards);
        const nextCardIndex = cardIndex + direction;
        if (0 <= nextCardIndex && nextCardIndex <= cards.length - countVisibleCards) {
            event.preventDefault();
            slideTo(nextCardIndex);
        }
    });

    cardsContainer.addEventListener('touchstart', event => {
        event.preventDefault();
        touchStart.x = event.touches[0].clientX;
        touchStart.y = event.touches[0].clientY;
    });

    cardsContainer.addEventListener('touchend', event => {
        const touchEnd = {
            x: event.changedTouches[0].clientX,
            y: event.changedTouches[0].clientY,
        };
        const diffX = touchStart.x - touchEnd.x;
        if (Math.abs(diffX) > 50) {
            const direction = diffX > 0 ? 1 : -1;
            const cardIndex = getVisibleCardIndex(cards);
            const nextCardIndex = cardIndex + direction;
            slideTo(nextCardIndex);
        } else {
            window.scrollBy(0, touchStart.y - touchEnd.y);
        }
    });

    function getVisibleCardIndex(cards) {
        const sliderRect = slider.getBoundingClientRect();
        const cardRects = Array.from(cards).map(card => card.getBoundingClientRect());
        const visibleCardIndex = cardRects.findIndex(cardRect => {
            return cardRect.left >= sliderRect.left - 30 && cardRect.right <= sliderRect.right;
        });
        return visibleCardIndex !== -1 ? visibleCardIndex : 0;
    }

    function createIndicators() {
        for (let i = 0; i < cards.length; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('feedback-slider__indicator');
            indicator.addEventListener('click', () => slideTo(i));
            sliderIndicators.appendChild(indicator);
        }
    }

    function updateIndicators() {
        const indicators = sliderIndicators.querySelectorAll('.feedback-slider__indicator');
        for (let i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove('active');
            if (i >= currentSlide && i < currentSlide + countVisibleCards) {
                indicators[i].classList.add('active');
            }
        }
    }

    function updateBtns() {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide + countVisibleCards >= cards.length;
    }

    function normalizeSlideIndex(index) {
        if (index < 0) return 0;
        if (index > cards.length - countVisibleCards) return cards.length - countVisibleCards;
        return index;
    }

    function slideTo(index) {
        currentSlide = normalizeSlideIndex(index);
        const targetCard = cards[currentSlide];
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        updateIndicators();
        updateBtns();
    }

    function getVisibleCardsCount() {
        const { width: sliderWidth } = cardsContainer.getBoundingClientRect();
        const { width: cardWidth } = [...cards][0].getBoundingClientRect();
        return Math.floor(sliderWidth / cardWidth);
    }

    window.addEventListener('resize', () => {
        const newCountVisibleCards = getVisibleCardsCount();
        if (countVisibleCards !== newCountVisibleCards) {
            sliderIndicators.innerHTML = '';
            countVisibleCards = getVisibleCardsCount();
            currentSlide = normalizeSlideIndex(currentSlide);
            createIndicators();
            updateIndicators();
        }
    });

    nextBtn.addEventListener('click', () => slideTo(currentSlide + 1));
    prevBtn.addEventListener('click', () => slideTo(currentSlide - 1));
};
