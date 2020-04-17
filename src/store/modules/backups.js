import hetzner from '../../api/hetzner';

// initial state
const state = {
    all: [],
}

// getters
const getters = {}

// actions
const actions = {
    getAllBackups ({ commit }) {
        hetzner.getAllBackups(backups => {
            commit('setBackups', backups)
        })
    }
}

// mutations
const mutations = {

    setBackups (state, backups) {
        state.all = backups;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}