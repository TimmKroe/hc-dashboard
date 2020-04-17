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
                <a class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
            </div>
            <div class="card-content">
                <Chart :chartData="this.cpuData"/>
            </div>
        </section>

        <section class="card chart">
            <div class="card-header">
                <p class="card-header-title">
                    Disk Usage
                </p>
                <a class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
            </div>
            <div class="card-content">
                <Chart :chartData="this.diskData" />
            </div>
        </section>

        <section class="card chart">
            <div class="card-header">
                <p class="card-header-title">
                    Network Usage
                </p>
                <a class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
            </div>
            <div class="card-content">
                <Chart :chartData="this.netData"/>
            </div>
        </section>

    </div>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    import Chart from "@/components/Chart";

    export default {
        name: "SingleServer",
        components: {Chart},
        data() {
            return {
                serverName: this.$route.path.toString().replace("/servers/", ""),
                visibleCPU: true,
                cpuData: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                        {
                            label: 'Data One',
                            backgroundColor: '#f87979',
                            data: [40, 39, 10, 40, 39, 80, 100]
                        }
                    ]
                },
                diskData: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                        {
                            label: 'Data One',
                            borderColor: '#000000',
                            data: [40, 39, 10, 40, 39, 80, 100]
                        },
                        {
                            label: 'Data Two',
                            borderColor: '#939393',
                            data: [45, 3, 100, 30, 50, 60, 100]
                        },
                    ]
                },
                netData: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                        {
                            label: 'Data One',
                            borderColor: '#ffc900',
                            data: [40, 39, 10, 40, 39, 80, 100]
                        },
                        {
                            label: 'Data Two',
                            borderColor: '#52ff00',
                            data: [45, 3, 100, 30, 50, 60, 100]
                        },
                    ]
                },

            }
        },
        computed: {
            ...mapState({
                servers: state => state.servers.all
            }),

            ...mapGetters('servers', {
                singleServer: 'matchingServer'
            })
        },
        created() {
            this.$store.dispatch('servers/getAllServers')
        },
    }
</script>

<style scoped>
    .chart {
        margin-top: 25px;
    }
</style>