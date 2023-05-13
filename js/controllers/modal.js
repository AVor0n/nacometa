const createModal = $content => {
    const $overlay = document.createElement('div');
    const $modal = document.createElement('div');
    $overlay.classList.add('overlay');
    $modal.classList.add('modal');

    $overlay.append($modal);
    $modal.append($content);
    document.body.append($overlay);

    return { $overlay, $modal };
};

const expandModal = ({ $modal, $overlay }) => {
    $overlay.classList.add('overlay--active');
    $modal.classList.add('active');

    document.addEventListener('click', e => {
        if (e.target.classList.contains('overlay')) {
            $modal.classList.remove('active');
            $overlay.classList.remove('overlay--active');
            setTimeout(() => $overlay.remove(), 1000);
        }
    });
};

export const openModal = $content => {
    const { $modal, $overlay } = createModal($content);
    setTimeout(() => expandModal({ $modal, $overlay }));
};
