import hetzner from '../../api/hetzner';
import Byteconverter from "@wtfcode/byte-converter";

export default {
    namespaced: true,
    state: {
        all: [],
    },
    getters: {
        allServers: state => {
            return state.all;
        },

        runningServers: state => {
            return state.all.filter(server => server.status === "running")
        },

        // params: name, get the server matching the url
        matchingServer: (state) => (name) => {
            return state.all.filter(server => server.name === name)[0];
        },

        totalTraffic: state => {
            let traffic = 0;

            const byteconverter = new Byteconverter();

            state.all.forEach(server => {

               traffic +=  byteconverter.convert(server.outgoing_traffic, 'B', 'GB') + byteconverter.convert(server.ingoing_traffic, 'B', 'GB');
            });

            let wert = 2;
            wert = parseFloat(wert);
            if (!wert) return 0;

            traffic = parseInt(traffic);
            if (!traffic) traffic = 0;

            let umrechnungsfaktor = Math.pow(10, traffic);

            traffic = Math.round(wert * umrechnungsfaktor) / umrechnungsfaktor; // GB 0.00 rounded

            return traffic;
        },

        totalTrafficByServer: (state) => (serverId) => {
            let server = state.all.find(server => server.id = serverId);

            const byteconverter = new Byteconverter();

            let traffic = 0;
            traffic = byteconverter.convert(server.outgoing_traffic, 'B', 'GB') + byteconverter.convert(server.ingoing_traffic, 'B', 'GB');

            return traffic;
        }

    },
    actions: {
        getAllServers ({ commit }) {
            hetzner.getAllServers(servers => {
                commit('setServers', servers)
            })
        },
    },
    mutations: {
        setServers (state, servers) {
            state.all = servers
        },
    }
}