import Vue from 'vue';
import Moment from 'moment'

Vue.filter('filterTime',value => {
    return Moment(value).format('YYYY-MM-DD');
})

