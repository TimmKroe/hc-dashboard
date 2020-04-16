<template>

    <div>
        <section class="hero is-info welcome is-small">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Hello there.
                    </h1>
                    <h2 class="subtitle">
                        I hope you are having a great day!
                    </h2>
                </div>
            </div>
        </section>
        <section class="info-tiles">
            <div class="tile is-ancestor has-text-centered">
                <div class="tile is-parent">
                    <article class="tile is-child box">
                        <p class="title">{{ this.servers.length }}</p>
                        <p class="subtitle">Servers</p>
                    </article>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child box">
                        <p class="title">{{ getRunningServers() }}</p>
                        <p class="subtitle">Online</p>
                    </article>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child box">
                        <p class="title">{{ getOfflineServers() }}</p>
                        <p class="subtitle">Offline</p>
                    </article>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child box">
                        <p class="title">{{ getTotalTraffic() }} GB</p>
                        <p class="subtitle">Total Traffic</p>
                    </article>
                </div>
            </div>
        </section>
        <div class="columns">
            <div class="column is-6">
                <div class="card events-card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Images
                        </p>
                        <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                  </span>
                        </a>
                    </header>
                    <div class="card-table">
                        <div class="content">
                            <table class="table is-fullwidth is-striped">
                                <tbody>
                                <tr v-for="(image, id) in this.images" :key="id">
                                    <td width="5%">
                                        <i v-if="image.protection.delete === true" class="fa fa-lock"></i>
                                        <i v-if="image.protection.delete === false" class="fa fa-lock-open"></i>
                                    </td>

                                    <td>{{ image.description }}</td>
                                    <td class="tag level-right"
                                        :class="image.status === 'available' ? 'is-success' : ''">{{ image.status }}
                                    </td>
                                </tr>

                                </tbody>
                            </table>

                            <p class="has-text-centered has-text-weight-bold" style="margin-bottom: 14px" v-if="this.images.length === 0">
                                NO SNAPSHOTS YET
                            </p>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item">View All</a>
                    </footer>
                </div>
            </div>
            <div class="column is-6">
                <div class="card events-card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Backups
                        </p>
                        <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                  </span>
                        </a>
                    </header>
                    <div class="card-table">
                        <div class="content">
                            <table class="table is-fullwidth is-striped">
                                <tbody>
                                <tr v-for="(backup, id) in this.backups" :key="id">
                                    <td width="5%">
                                        <i v-if="backup.protection.delete === true" class="fa fa-lock"></i>
                                        <i v-if="backup.protection.delete === false" class="fa fa-lock-open"></i>
                                    </td>

                                    <td>{{ backup.description }}</td>
                                    <td class="tag level-right"
                                        :class="backup.status === 'available' ? 'is-success' : ''">{{ backup.status }}
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                            <p class="has-text-centered has-text-weight-bold" style="margin-bottom: 14px" v-if="this.backups.length === 0">
                                    NO BACKUPS YET
                            </p>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item">View All</a>
                    </footer>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Byteconverter from '@wtfcode/byte-converter';
    import { mapState } from 'vuex';

    export default {
        name: "Index",
        computed: {
            ...mapState({
                servers: state => state.servers.all,
                images: state => state.snapshots.all,
                backups: state => state.backups.all
            })
        },
        created() {
            this.$store.dispatch('servers/getAllServers')
            this.$store.dispatch('snapshots/getAllSnapshots')
            this.$store.dispatch('backups/getAllBackups')
        },
        methods: {
            getRunningServers() {
                var anzahl = 0;
                for (var i = 0; i < this.servers.length; i++) {
                    switch (this.servers[i].status) {
                        case "running":
                            anzahl++;
                            break;
                        case "initializing":
                            anzahl++;
                            break;
                        case "starting":
                            anzahl++;
                            break;
                    }
                }
                return anzahl;
            },

            getOfflineServers() {
                var anzahl = 0;
                for (var i = 0; i < this.servers.length; i++) {
                    switch (this.servers[i].status) {
                        case "stopping":
                            anzahl++;
                            break;
                        case "off":
                            anzahl++;
                            break;
                        case "migrating":
                            anzahl++;
                            break;
                        case "rebuilding":
                            anzahl++;
                            break;
                        case "unknown":
                            anzahl++;
                            break;
                    }
                }
                return anzahl;
            },

            getTotalTraffic() {
                const byteconverter = new Byteconverter();
                var traffic = 0;

                for (var i = 0; i < this.servers.length; i++) {
                    traffic += byteconverter.convert(this.servers[i].outgoing_traffic, 'B', 'GB') + byteconverter.convert(this.servers[i].ingoing_traffic, 'B', 'GB')
                }


                return this.roundDez(traffic, 2);
            },

            roundDez(wert, dez) {
                wert = parseFloat(wert);
                if (!wert) return 0;

                dez = parseInt(dez);
                if (!dez) dez = 0;

                var umrechnungsfaktor = Math.pow(10, dez);

                return Math.round(wert * umrechnungsfaktor) / umrechnungsfaktor;
            }
        },
    }
</script>

<style scoped>

</style>