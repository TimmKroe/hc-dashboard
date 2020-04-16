import hetzner from '../../api/hetzner';

// initial state
const state = {
    all: [],
}

// getters
const getters = {

}

// actions
const actions = {
    getAllSnapshots ({ commit }) {
        hetzner.getAllSnapshots(snapshots => {
            commit('setSnapshots', snapshots)
        })
    },
}

// mutations
const mutations = {

    setSnapshots (state, snapshots) {
        state.all = snapshots
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}