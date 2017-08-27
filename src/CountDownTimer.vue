<template>
    <div v-if="loaded === 'true'">
        <span class="icon-clock" v-if="infinite === 'true'">N/A</span>
        <span class="icon-clock" v-else-if="runTimer === 'false'">Expired</span>
        <span class="icon-clock" v-else>{{ twoDigits( days ) }} DAY {{ twoDigits( hours ) }}:{{ twoDigits( minutes ) }}:{{ twoDigits( seconds ) }}</span>
    </div>
</template>

<script>

    export default {
        props: [ 'deadline', 'timezone' ],

        data() {
            return {
                // getTime() returns number of milliseconds since given date.
                // convert milliseconds to seconds.
                now     : null,
                date    : null,
                timer   : null,
                diffSec : null,
                diffMin : null,
                diffHour: null,
                diffDay : null,
                runTimer: 'true',
                infinite: 'false',
                loaded  : 'false',
            }
        },

        mounted() {

            let vm   = this;

            let parseDate = Date.parse( vm.deadline );

            if( isNaN( parseDate ) ) {

                vm.infinite = 'true';
                vm.loaded = 'true';

            } else {

                vm.date  = Math.trunc( parseDate / 1000 );

                vm.timer = setInterval( () => {

                    vm.runTimer = 'true';

                let timeZoneLocale = new Date().toLocaleString( 'en-US', { timeZone: vm.timezone } );
                vm.now = Math.trunc( ( new Date( timeZoneLocale ) ).getTime() / 1000 );

                vm.loaded = 'true';

            }, 1000 )

            }
        },

        methods: {
            stopTimer: function () {

                let vm = this;
                clearInterval( vm.timer );
                vm.runTimer = 'false';

            },
            twoDigits: function ( val ) {

                if ( value.toString().length <= 1 ) {
                    return '0' + value.toString();
                }

                return value.toString();
            }
        },

        computed: {
            seconds() {

                let vm     = this;
                vm.diffSec = Math.trunc( vm.date - vm.now ) % 60;

                if( vm.diffSec < 0 ) {

                    vm.diffSec  = 0;
                    vm.stopTimer();

                }

                return vm.diffSec;

            },

            minutes() {

                let vm     = this;
                vm.diffMin = Math.trunc( ( vm.date - vm.now ) / 60 ) % 60;

                if( vm.diffMin < 0 ) {

                    vm.diffMin  = 0;

                }

                return vm.diffMin;

            },

            hours() {

                let vm      = this;
                vm.diffHour = Math.trunc( ( vm.date - vm.now ) / 60 / 60 ) % 24;

                if( vm.diffHour < 0 ) {
                    vm.diffHour = 0;
                }

                return vm.diffHour;

            },

            days() {

                let vm     = this;
                vm.diffDay = Math.trunc( ( vm.date - vm.now ) / 60 / 60 / 24 );

                if( vm.diffDay < 0 ) {
                    vm.diffDay = 0;
                }

                return vm.diffDay;
            }
        }
    }

</script>