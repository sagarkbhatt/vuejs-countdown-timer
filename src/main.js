import Vue from 'vue';

import CountDownTimer from './CountDownTimer.vue';

Vue.component( 'countdown-timer', CountDownTimer );

const App = Vue.extend( {

	template: '<countdown-timer deadline="2018-08-21 12:00:00" ></countdown-timer>'

} );

new App().$mount( '#app' );
