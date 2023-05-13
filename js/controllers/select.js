export const initSelector = (
    $container = document,
    handler = val => {
        console.log({ val });
    },
) => {
    const $selects = $container.querySelectorAll('.select');

    for (const $select of $selects) {
        $select.addEventListener('click', () => {
            const isOpen = $select.classList.contains('active');
            if (!isOpen) {
                $select.classList.add('active');
                document.addEventListener('click', () => $select.classList.remove('active'), {
                    once: true,
                    capture: true,
                });
            }
        });

        const $options = $select.querySelector('.select__options');
        $options.addEventListener('click', e => {
            if (e.target.classList.contains('select__option')) {
                handler(e.target.dataset.value);
                setTimeout(() => $options.parentElement.classList.remove('active'), 0);
            }
        });
    }
};
