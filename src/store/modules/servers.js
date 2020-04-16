import hetzner from '../../api/hetzner';

// initial state
const state = {
    all: [],
}

// getters
const getters = {
    runningServers: state => {
        return state.all.filter(server => server.status === "running")
    },

    allServers: state => {
        return state.all;
    },

    // params: name, get the server matching the url
    matchingServer: (state) => (name) => {
        return state.all.filter(o => o.name === name)[0];
    }

}

// actions
const actions = {
    getAllServers ({ commit }) {
        hetzner.getAllServers(servers => {
            commit('setServers', servers)
        })
    },
}

// mutations
const mutations = {
    setServers (state, servers) {
        state.all = servers
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}