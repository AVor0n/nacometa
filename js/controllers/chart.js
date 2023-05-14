export const init = () => {
    setTimeout(() => {
    const start = screen.height * 0.8;
    const end = screen.height * 0.6;

        const $animationItems = Array.from(document.querySelectorAll('.chart .animate'));
        const itemsTopOffsets = $animationItems.map($item => ({
            $item,
            topOffset: $item.getBoundingClientRect().y - start,
        }));
        const minItemTopOffset = Math.min(...itemsTopOffsets.map(it => it.topOffset));
        document.addEventListener('scroll', () => {
            if (window.scrollY >= minItemTopOffset) {
                for (const { $item, topOffset } of itemsTopOffsets) {
                    if (window.scrollY >= topOffset) {
                        $item.style.opacity = 1;
                    }
                }
            }
        });
    }, 500);
};
