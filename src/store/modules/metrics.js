import hetzner from "@/api/hetzner";

export default {
    namespaced: true,
    state: {
        cpu: [],
        disk: [],
        network: [],
    },
    getters: {
        cpuMetrics: state => {
            let result = [];

            state.cpu.forEach(metric => {
                result.push({x: new Date(metric[0]), y: metric[1]})
            })

            return result;
        },
        diskMetrics: state => {
            return state.disk;
        },
        netMetrics: state => {
            return state.network;
        },


    },
    actions: {
        getAllMetrics ({ commit }, serverId) {
            hetzner.getCPUMetric(metric => {
                commit('setCPUMetric', metric)
            }, serverId)
            hetzner.getDiskMetric(metric => {
                commit('setDiskMetric', metric)
            }, serverId)
            hetzner.getNetMetric(metric => {
                commit('setNetMetric', metric)
            }, serverId)
        }
    },
    mutations: {
        setCPUMetric (state, metrics) {
            state.cpu = metrics
        },
        setDiskMetric (state, metrics) {
            state.disk = metrics
        },
        setNetMetric (state, metrics) {
            state.network = metrics
        }
    }
}