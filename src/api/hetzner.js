import axios from 'axios';

// headers for API Request
const headers = {
    Authorization: 'Bearer ' + process.env.VUE_APP_API_KEY
}

export default {
    getAllServers(cb) {

        axios.get('https://api.hetzner.cloud/v1/servers', {headers: headers})
            .then(res => {
                cb(res.data.servers);
            }).catch(err => {
            this.$buefy.snackbar.open({
                duration: 6000,
                message: 'Error while loading your Servers!',
                type: 'is-danger',
                position: 'is-top',
                queue: false
            });
            console.log(err)
        })
    },

    getAllSnapshots(cb) {
        axios.get('https://api.hetzner.cloud/v1/images?type=snapshot', {headers: headers})
            .then(res => {
                cb(res.data.images);
            }).catch(err => {
            this.$buefy.snackbar.open({
                duration: 6000,
                message: 'Error while loading your Snapshots!',
                type: 'is-danger',
                position: 'is-top',
                queue: false
            });
            console.log(err);
        })
    },

    getAllBackups(cb) {
        axios.get('https://api.hetzner.cloud/v1/images?type=backup', {headers: headers})
            .then(res => {
                cb(res.data.images);
            }).catch(err => {
            this.$buefy.snackbar.open({
                duration: 6000,
                message: 'Error while loading your Backups!',
                type: 'is-danger',
                position: 'is-top',
                queue: false
            });
            console.log(err);
        })
    },

    // Metrics
    // CPU
    getCPUMetric(cb, serverId) {
        let startDate = '2020-03-15T08:31:56Z';
        let endDate = '2020-03-27T00:00:00Z';
        console.log(serverId)
        axios.get('https://api.hetzner.cloud/v1/servers/' + serverId + '/metrics?type=cpu&start=' + startDate + '&end=' + endDate + '&step=3600', {headers: headers})
            .then(res => {
                cb(res.data.metrics.time_series.cpu.values);
                console.log("CPU Metrics:")
                console.log(res.data.metrics.time_series.cpu.values);
            }).catch(err => {
            this.$buefy.snackbar.open({
                duration: 6000,
                message: 'Error while loading your Metrics!',
                type: 'is-danger',
                position: 'is-top',
                queue: false
            });
            console.log(err);
        })
    },

    // Disk
    getDiskMetric(cb, serverId) {
        let startDate = '2020-03-15T08:31:56Z';
        let endDate = '2020-03-27T00:00:00Z';

        axios.get('https://api.hetzner.cloud/v1/servers/' + serverId + '/metrics?type=disk&start=' + startDate + '&end=' + endDate + '&step=3600', {headers: headers})
            .then(res => {
                cb(res.data.metrics.time_series);
                console.log("DISK Metrics:")
                console.log(res.data.metrics.time_series);

            }).catch(err => {
            this.$buefy.snackbar.open({
                duration: 6000,
                message: 'Error while loading your Metrics!',
                type: 'is-danger',
                position: 'is-top',
                queue: false
            });
            console.log(err);
        })
    },

    // Network
    getNetMetric(cb, serverId) {
        let startDate = '2020-03-15T08:31:56Z';
        let endDate = '2020-03-27T00:00:00Z';

        axios.get('https://api.hetzner.cloud/v1/servers/' + serverId + '/metrics?type=network&start=' + startDate + '&end=' + endDate + '&step=3600', {headers: headers})
            .then(res => {
                cb(res.data.metrics.time_series);
                console.log("NET Metrics:")
                console.log(res.data.metrics.time_series);

            }).catch(err => {
            this.$buefy.snackbar.open({
                duration: 6000,
                message: 'Error while loading your Metrics!',
                type: 'is-danger',
                position: 'is-top',
                queue: false
            });
            console.log(err);
        })
    }
}