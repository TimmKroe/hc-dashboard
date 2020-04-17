import Vue from 'vue'
import Vuex from 'vuex'

import servers from './modules/servers';
import snapshots from './modules/snapshots';
import backups from './modules/backups';
import metrics from "@/store/modules/metrics";

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        servers,
        snapshots,
        backups,
        metrics
    },
})