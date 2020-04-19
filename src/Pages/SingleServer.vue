<template>
    <div class="m-2">
        <h1 class="text-4xl pb-5">
            <span class="inline-block pr-4" >
                <svg v-if="this.singleServer(this.serverName).protection.delete === false" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 8V6a6 6 0 1 1 12 0h-3v2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"/></svg>
                <svg v-if="this.singleServer(this.serverName).protection.delete === true" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"/></svg>            </span>
            <span class="inline-block">
                {{ this.$route.path.replace("/servers/", "").replace("/", "")}}
            </span>
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
<!--                    {{ this.totalTrafficByServer(this.serverId)}}-->
                </div>
            </span>

            <span class="px-3">
                <strong>Datacenter: </strong>
                <div class="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border">
                    {{ this.singleServer(this.serverName).datacenter.name }}
                </div>
            </span>

        </div>

        <!-- CPU Chart -->
        <div class="bg-white rounded-md shadow-lg p-4 mt-5">

            <div class="pb-3">
                <strong>CPU usage</strong>
            </div>

            <div>
                <Chart />
            </div>

        </div>

        <!-- Network Chart -->
        <div class="flex flex-row">
            <div class="bg-white flex flex-col w-full rounded-md shadow-lg p-4 mt-5 mr-4">

                <div class="pb-3">
                    <strong>Network usage</strong>
                </div>

                <div>
                    <Chart />
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
                        <li><strong>Outgoing Traffic:</strong> {{ Math.round(this.byteConverter.convert(this.singleServer(this.serverName).outgoing_traffic, 'B', 'GB')) }} GB / 20TB</li>
                        <li><strong>Incoming Traffic:</strong> {{ Math.round(this.byteConverter.convert(this.singleServer(this.serverName).ingoing_traffic, 'B', 'GB')) }} GB / 20TB</li>
                        <li><strong>Total Traffic:</strong> {{ Math.round(this.byteConverter.convert(this.singleServer(this.serverName).included_traffic, 'B', 'TB')) }} TB</li>
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
                <Chart />
            </div>

        </div>


    </div>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import Chart from "@/components/Chart";
    import ByteConverter from '@wtfcode/byte-converter'

    export default {
        name: "SingleServer",
        components: {Chart},
        data() {
            return {
                serverName: this.$route.path.toString().replace("/servers/", ""),
                serverId: 0,
                byteConverter: new ByteConverter(),
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
        },
    }
</script>

<style scoped>
    .chart {
        margin-top: 25px;
    }
</style>