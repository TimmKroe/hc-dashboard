import hetzner from '../../api/hetzner';

// initial state
const state = {
    all: [],
}

// getters
const getters = {
    runningServers: state => {
        return state.all.filter(server => server.status.equals("running"))
    },

    allServers: state => {
        return state.all;
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