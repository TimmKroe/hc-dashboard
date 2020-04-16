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
    }
}