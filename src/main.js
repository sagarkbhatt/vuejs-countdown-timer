import Vue from 'vue';

import CountDownTimer from './CountDownTimer.vue';

Vue.component( 'countdown-timer', CountDownTimer );

const App = Vue.extend( {

    template: '<countdown-timer :deadline="August 28, 2017 01:00:00" :timezone=""></countdown-timer>'

} );

new App().$mount( '#app' );
