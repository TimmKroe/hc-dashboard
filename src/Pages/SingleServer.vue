<template>
    <div>
        <section class="hero is-info welcome is-small">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{ this.serverName }}
                        <small>{{this.singleServer(this.serverName).status}}</small>
                    </h1>
                    <h2 class="subtitle">
                        {{ this.singleServer(this.serverName).server_type.name.toUpperCase() + ', ' +
                        this.singleServer(this.serverName).image.name.replace("-", " ")}}
                    </h2>
                </div>
            </div>
        </section>

        <section class="card chart">
            <div class="card-header">
                <p class="card-header-title">
                    CPU Usage
                </p>
                <a aria-label="more options" class="card-header-icon">
                  <span class="icon">
                    <i aria-hidden="true" class="fas fa-angle-down"></i>
                  </span>
                </a>
            </div>
            <div class="card-content">
                <Chart :data="cpuMetrics"/>
            </div>
        </section>

        <section class="card chart">
            <div class="card-header">
                <p class="card-header-title">
                    Disk Usage
                </p>
                <a aria-label="more options" class="card-header-icon">
                  <span class="icon">
                    <i aria-hidden="true" class="fas fa-angle-down"></i>
                  </span>
                </a>
            </div>
            <div class="card-content">
                <Chart :data="diskMetrics"/>
            </div>
        </section>

        <section class="card chart">
            <div class="card-header">
                <p class="card-header-title">
                    Network Usage
                </p>
                <a aria-label="more options" class="card-header-icon">
                  <span class="icon">
                    <i aria-hidden="true" class="fas fa-angle-down"></i>
                  </span>
                </a>
            </div>
            <div class="card-content">
                <Chart :data="netMetrics"/>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import Chart from "@/components/Chart";

    export default {
        name: "SingleServer",
        components: {Chart},
        data() {
            return {
                serverName: this.$route.path.toString().replace("/servers/", ""),
            }
        },
        computed: {
            ...mapState({
                servers: state => state.servers.all,
                metrics: state => state.metrics,
            }),

            ...mapGetters('servers', {
                singleServer: 'matchingServer'
            }),

            ...mapGetters('metrics', {
                cpuMetrics: 'cpuMetrics',
                diskMetrics: 'diskMetrics',
                netMetrics: 'netMetrics',
            })
        },
        created() {
            this.$store.dispatch('servers/getAllServers');

            let servername = this.$route.path.toString().replace("/servers/", "");
            let serverTmpId = this.$store.getters["servers/matchingServer"](servername).id;
            this.$store.dispatch('metrics/getAllMetrics', serverTmpId)
        },
    }
</script>

<style scoped>
    .chart {
        margin-top: 25px;
    }
</style>