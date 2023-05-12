import { langs } from './utils/locale.js';

langs.init();
import('./controllers/leads.js').then(section => section.init());
