import { langs } from './utils/locale.js';

langs.init();

import('./controllers/select.js').then(section =>
    section.initSelector(document, locale => {
        langs.locale = locale;
    }),
);

import('./controllers/header.js').then(section => section.init());
import('./controllers/leads.js').then(section => section.init());
import('./controllers/feedback.js').then(section => section.init());
import('./controllers/chart.js').then(section => section.init());
import('./controllers/video.js').then(section => section.init());
import('./controllers/createDream.js').then(section => section.init());
