import { lang } from '../../locale/index.js';

const getValueByPath = (obj, keys) => {
    let tempObj = obj;
    for (const key of keys) {
        tempObj = tempObj[key];
    }
    return tempObj;
};

const format = (template, ...values) => {
    return template.replaceAll(/{(\d)}/g, (_, idx) => values[idx] ?? '');
};

const getCurrentLocale = () => {
    return localStorage.getItem('locale') ?? window.navigator.language.startsWith('ru') ? 'ru' : 'en';
};

let currentLocale;

export const langs = {
    get lang() {
        return lang;
    },
    get locale() {
        return currentLocale;
    },
    set locale(locale) {
        if (currentLocale === locale) return;

        currentLocale = locale;
        localStorage.setItem('locale', currentLocale);

        const $items = document.querySelectorAll('[data-lang]');
        for (const $item of $items) {
            const path = [this.locale, ...$item.dataset.lang.split('.')];
            $item.textContent = getValueByPath(lang, path);
        }
    },
    getTextByKey(key, ...values) {
        const path = [this.locale, ...key.split('.')];
        const template = getValueByPath(lang, path);
        return values ? format(template, values) : template;
    },
    init() {
        this.locale = getCurrentLocale();
    },
};
