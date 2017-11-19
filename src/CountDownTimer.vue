<template>
	<div v-if="loaded === 'true'" class="clock">
		<span v-if="infinite === 'true'">N/A</span>
		<span v-else-if="runTimer === 'false'">Expired</span>
		<span v-else>{{ days }} {{ dayOrDays( days ) }} {{ hours }}:{{ minutes }}:{{ seconds }}</span>
	</div>
</template>

<script>

	export default {

		props: ['deadline'],

		data() {
			return {

				infinite: 'false',
				loaded: 'false',
				timer: '',
				runTimer: 'true',
				days: '',
				hours: '',
				minutes: '',
				seconds: '',
			};
		},
		mounted() {

			const vm = this;

			if ( vm.deadline ) {
				vm.initializeClock( vm.deadline );
			} else {
				vm.infinite = 'true';
				vm.loaded = 'true';
			}

		},
		methods: {

			/**
			 * Converts a UTC time to days, hours, minutes and seconds for countdown.
			 *
			 * @param {string} eventDate Date in YYYY-MM-DD HH:MM:SS format in UTC.
			 * @return {{days, hours, minutes, seconds}}
			 */
			getCountdownValues: function( eventDate ) {

				let currentTimeStamp, now, parseDate, timeDifference, convertMilliseconds;

				now = new Date();

				parseDate = function( eDate ) {
					let eventDateParts = eDate.split( /\D/ ),
						dateParts = [], date, i;

					for ( i = 0; i <= eventDateParts.length; i++ ) {
						dateParts[ i ] = parseInt( eventDateParts[ i ], 10 );
					}

					date = new Date( Date.UTC( dateParts[0], dateParts[1] - 1, dateParts[2], dateParts[3], dateParts[4], dateParts[5] ) );
					return date.valueOf();
				};

				currentTimeStamp = ( new Date( Date.UTC ( now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
					now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds() ) ) ).valueOf();

				convertMilliseconds = function( ms ) {
					let d, h, m, s, padNumber;
					s = Math.floor( ms / 1000 );
					m = Math.floor( s / 60 );
					h = Math.floor( m / 60 );
					d = Math.floor( h / 24 );

					padNumber = function( n ) {
						return n < 10 ? '0' + String( n ) : n;
					};

					return {
						total: ms,
						days: d,
						hours: padNumber( h % 24 ),
						minutes: padNumber( m % 60 ),
						seconds: padNumber( s % 60 ),
					};
				};

				timeDifference = parseDate( eventDate ) - currentTimeStamp;
				return convertMilliseconds( timeDifference );
			},
			initializeClock: function() {

				const vm = this;
				vm.timer = setInterval(() => {

					let diff = vm.getCountdownValues( vm.deadline );

					vm.days = diff.days;
					vm.hours = diff.hours;
					vm.minutes = diff.minutes;
					vm.seconds = diff.seconds;
					vm.loaded = 'true';

					if ( 0 >= diff.total ) {
						vm.runTimer = 'false';
						clearInterval( vm.timer );
					}

				}, 1000 );
			},
			dayOrDays: function( number ) {

				if ( 1 < parseInt( number, 10 ) ) {
					return 'DAYS';
				} else {
					return 'DAY';
				}
			},


		},

	};

</script>
