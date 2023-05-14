import { langs } from '../utils/locale.js';

const initImgUpload = () => {
    const $fileInput = document.querySelector('.create-dream__file');
    const $previewImg = document.querySelector('.create-dream__image');
    const $uploadLabels = document.querySelectorAll('.create-dream__image-label');

    $fileInput.addEventListener('change', () => {
        const [file] = $fileInput.files;
        if (file) {
            $uploadLabels.forEach(it => it.remove());
            $previewImg.style.background = `url(${URL.createObjectURL(file)})`;
            $previewImg.style.backgroundSize = 'cover';
            $previewImg.style.cursor = 'pointer';
            $previewImg.addEventListener('click', () => $fileInput.click());
        }
    });
};

const initSubmitBtn = () => {
    const $submit = document.querySelector('.create-dream__submit');
    $submit.addEventListener('click', e => {
        e.preventDefault();
        $submit.style.background = 'green';
        setTimeout(() => ($submit.style.background = ''), 500);
    });
};

const initProgressBar = () => {
    const $section = document.querySelector('.create-dream');
    const $title = $section.querySelector('.create-dream__input');
    const $money = $section.querySelector('.create-dream__target-money');
    const $progressCurrentText = $section.querySelector('[data-lang="createDream.progress.current"]');
    const $progressTotalText = $section.querySelector('[data-lang="createDream.progress.total"]');
    const $progressTitle = $section.querySelector('.progressbar__title');

    $progressCurrentText.innerHTML = langs.getTextByKey('createDream.progress.current', 0);
    $progressTotalText.innerHTML = langs.getTextByKey('createDream.progress.total', 5000);

    $title.addEventListener('input', () => {
        $progressTitle.innerHTML = $title.value.trim()
            ? $title.value.trim()
            : langs.getTextByKey('createDream.progress.title');
    });

    $money.addEventListener('input', () => {
        $progressTotalText.innerHTML = langs.getTextByKey('createDream.progress.total', $money.value);
    });
};

export const init = () => {
    initImgUpload();
    initSubmitBtn();
    initProgressBar();
};
