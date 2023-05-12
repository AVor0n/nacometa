export const initProgressBar = ($container = document) => {
    const $progressBars = $container.querySelectorAll('.progressbar');
    for (const $progressBar of $progressBars) {
        const $progressText = $progressBar.querySelector('.progressbar__text-all');
        const $progressLine = $progressBar.querySelector('.progressbar__bar-current');

        const [progressCur, progressAll] = $progressText.textContent
            .match(/\d+(\s\d+)*/g)
            .map(val => Number(val.replace(' ', '')));
        const progressPercent = (progressCur / progressAll) * 100;
        $progressLine.style.width = `${progressPercent}%`;
    }
};
