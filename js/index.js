import { langs } from './utils/locale.js';

langs.init();

import('./controllers/header.js').then(section => section.init());
import('./controllers/leads.js').then(section => section.init());
