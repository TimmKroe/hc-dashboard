<template>
    <div>
        <h1 class="text-4xl pb-5">{{ this.$route.path.replace("/servers/", "").replace("/", "")}}
            <div class="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full align-middle"
                 v-if="this.singleServer(this.serverName).status === 'running' || this.singleServer(this.serverName).status === 'initializing' || this.singleServer(this.serverName).status === 'starting'">
                {{ this.singleServer(this.serverName).status }}
            </div>
        </h1>


        <div class="bg-white rounded-md shadow-lg p-4">
            <span class="px-3">
                <strong>Server-Type: </strong>
                <div class="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border">
                    {{ this.singleServer(this.serverName).server_type.name.toUpperCase() }}
                </div>
            </span>
            <span class="px-3">
                <strong>OS: </strong>
                <div class="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border">
                    {{ this.singleServer(this.serverName).image.name.replace("-", " ")}}
                </div>
            </span>

            <span class="px-3">
                <strong>Total Traffic: </strong>
                <div class="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border">
                    {{ Math.round(this.totalTrafficByServer(this.singleServer(this.serverName).id)) }} GB
                </div>
            </span>

        </div>

        <!-- CPU Chart -->
        <div class="bg-white rounded-md shadow-lg p-4 mt-5">

            <div class="pb-3">
                <strong>CPU usage</strong>
            </div>

            <div>
                <CPUChart :data="cpuMetrics" />
            </div>

        </div>

        <!-- Network Chart -->
        <div class="flex flex-row">
            <div class="bg-white flex flex-col w-full rounded-md shadow-lg p-4 mt-5 mr-4">

                <div class="pb-3">
                    <strong>Network usage</strong>
                </div>

                <div>
                    <NetChart :data="netMetrics" />
                </div>

            </div>

            <div class="bg-white flex flex-col w-full rounded-md shadow-lg p-4 mt-5">

                <div class="pb-3">
                    <strong>Network details</strong>
                </div>

                <div>
                    <ul class="list-none">
                        <li><strong>IPv4:</strong> {{ this.singleServer(this.serverName).public_net.ipv4.ip }}</li>
                        <li><strong>IPv6:</strong> {{ this.singleServer(this.serverName).public_net.ipv6.ip }}</li>
                        <li class="w-2/3 py-2">
                            <hr>
                        </li>
                        <li><strong>Outgoing Traffic:</strong> {{ this.singleServer(this.serverName).outgoing_traffic }} / 20TB</li>
                        <li><strong>Incoming Traffic:</strong> {{ this.singleServer(this.serverName).ingoing_traffic }} / 20TB</li>
                        <li><strong>Total Traffic:</strong> {{ this.singleServer(this.serverName).included_traffic }} / 20TB</li>
                    </ul>
                </div>

            </div>
        </div>

        <!-- Disk Chart -->
        <div class="bg-white rounded-md shadow-lg p-4 mt-5">

            <div class="pb-3">
                <strong>Disk usage</strong>
            </div>

            <div>
                <DiskChart :data="diskMetrics" />
            </div>

        </div>


    </div>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import CPUChart from "@/components/Charts/CPUChart";
    import DiskChart from "@/components/Charts/DiskChart";
    import NetChart from "@/components/Charts/NetChart";

    export default {
        name: "SingleServer",
        components: {CPUChart, DiskChart, NetChart},
        data() {
            return {
                serverName: this.$route.path.toString().replace("/servers/", ""),
                serverId: 0,
            }
        },
        computed: {
            ...mapState({
                servers: state => state.servers.all,
                metrics: state => state.metrics,
            }),

            ...mapGetters('servers', {
                singleServer: 'matchingServer',
                totalTrafficByServer: 'totalTrafficByServer',
            }),

            ...mapGetters('metrics', {
                cpuMetrics: 'cpuMetrics',
                diskMetrics: 'diskMetrics',
                netMetrics: 'netMetrics',
            })
        },
        created() {
            this.$store.dispatch('servers/getAllServers');
            this.$store.dispatch('metrics/getAllMetrics', this.singleServer(this.serverName).id)
        },
    }
</script>

<style scoped>
    .chart {
        margin-top: 25px;
    }
</style>