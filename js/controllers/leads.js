import { langs } from '../utils/locale.js';
import { openModal } from './modal.js';
import { initProgressBar } from './progressbar.js';

const $cardTemplate = document.getElementById('leads__dream-card');
const $cardsContainer = document.querySelector('.leads__dream-cards');

const getDreamCardsData = async () => {
    return await fetch('../../data/dreams.json').then(data => data.json());
};

const getLeadsData = (data, count = 3) => {
    return data.sort((a, b) => b.money.current - a.money.current).slice(0, count);
};

const createDreamCard = data => {
    const $card = $cardTemplate.content.cloneNode(true);
    $card.querySelector('.dream-card__title').innerHTML = data.title;
    $card.querySelector('.dream-card__text').innerHTML = data.text;
    $card.querySelector('.dream-card__img').src = `data/img/dreams/${data.id}.png`;
    $card.querySelector('.progressbar__title').innerHTML = data.lastUpdate;

    const $progressCurrent = $card.querySelector('.progressbar__text-current');
    $progressCurrent.innerHTML = langs.getTextByKey($progressCurrent.dataset.lang, data.money.current);

    const $progressTotal = $card.querySelector('.progressbar__text-total');
    $progressTotal.innerHTML = langs.getTextByKey($progressTotal.dataset.lang, data.money.total);

    return $card;
};

const fillCardsContainer = ($container, data) => {
    const cards = data.map(createDreamCard);
    $container.append(...cards);
    setTimeout(() => {
        $container.style.opacity = 1;
    }, 100);
    setTimeout(() => initProgressBar($container), 700);
};

const addModalHandler = $cards => {
    for (const $card of $cards) {
        $card.addEventListener('click', () => {
            openModal($card.cloneNode(true));
        });
    }
};

export const init = async () => {
    const { data } = await getDreamCardsData();
    fillCardsContainer($cardsContainer, getLeadsData(data));
    addModalHandler([...$cardsContainer.children]);
};
