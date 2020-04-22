
// initial state
const state = {
    isNavOpen: true,
}

// getters
const getters = {
    isNavOpen: state => {
        return state.isNavOpen;
    },
}

// actions
const actions = {}

// mutations
const mutations = {
    setIsNavOpen(status) {
        state.isNavOpen = status;
    },
    toggleNav() {
        state.isNavOpen = !state.isNavOpen;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}