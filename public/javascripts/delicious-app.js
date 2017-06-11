import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import  autocomplete  from './modules/autocomplete';

console.log('delicious-app.js loaded.....');
autocomplete($('#address'), $('#lat'), $('#lng'));