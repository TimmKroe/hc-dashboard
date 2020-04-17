import hetzner from '../../api/hetzner';

export default {
    namespaced: true,
    state: {
        all: [],
    },
    getters: {
        runningServers: state => {
            return state.all.filter(server => server.status === "running")
        },

        // params: name, get the server matching the url
        matchingServer: (state) => (name) => {
            return state.all.filter(server => server.name === name)[0];
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