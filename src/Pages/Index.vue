<template>

    <div class="m-2">
        <h1 class="text-4xl pb-5">Dashboard</h1>

        <div class="sm:grid sm:h-32 sm:grid-flow-row sm:gap-4 sm:grid-cols-3 mb-4">
            <div id="jh-stats-positive" class="flex flex-col justify-center px-4 py-4 bg-white border border-gray-300 rounded-md shadow-lg">
                <div>
                    <div>
                        <p class="flex items-center justify-end text-green-500 text-md">
                            <span class="font-bold">6%</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z"/></svg>
                        </p>
                    </div>
                    <p class="text-3xl font-semibold text-center text-gray-800">{{ allServers.length }}</p>
                    <p class="text-lg text-center text-gray-500">Total</p>
                </div>
            </div>

            <div id="jh-stats-negative" class="flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded-md shadow-lg sm:mt-0">
                <div>
                    <div>
                        <p class="flex items-center justify-end text-red-500 text-md">
                            <span class="font-bold">6%</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z"/></svg>
                        </p>
                    </div>
                    <p class="text-3xl font-semibold text-center text-gray-800">{{ runningServers.length }}</p>
                    <p class="text-lg text-center text-gray-500">online</p>
                </div>
            </div>

            <div id="jh-stats-neutral" class="flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded-md shadow-lg sm:mt-0">
                <div>
                    <div>
                        <p class="flex items-center justify-end text-gray-500 text-md">
                            <span class="font-bold">0%</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M17 11a1 1 0 010 2H7a1 1 0 010-2h10z"/></svg>
                        </p>
                    </div>
                    <p class="text-3xl font-semibold text-center text-gray-800">{{ offlineServers.length }}</p>
                    <p class="text-lg text-center text-gray-500">offline/problems</p>
                </div>
            </div>
        </div>



        <div class="flex flex-col bg-gray-200" v-for="(server, id) in this.servers" :key="id">
            <div class="bg-white shadow-lg rounded-md p-5 m-2 flex items-center justify-between border-b">
                <span class="text-2xl">
                    {{ server.name }}
                    <span class="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border align-middle">{{ server.server_type.name }}</span>
                </span>

                <span v-if="server.status === 'running'" class="float-right py-1 px-3 text-sm text-white font-semibold bg-green-500 rounded-full">{{ server.status }}</span>
                <span v-if="server.status === 'off'" class="float-right py-1 px-3 text-sm text-white font-semibold bg-red-500 rounded-full">{{ server.status }}</span>
                <span v-if="server.status === 'initializing'" class="float-right py-1 px-3 text-sm text-white font-semibold bg-yellow-500 rounded-full">{{ server.status }}</span>
                <span v-if="server.status === 'stopping'" class="float-right py-1 px-3 text-sm text-white font-semibold bg-yellow-500 rounded-full">{{ server.status }}</span>
                <span v-if="server.status === 'deleting'" class="float-right py-1 px-3 text-sm text-white font-semibold bg-yellow-500 rounded-full">{{ server.status }}</span>
                <span v-if="server.status === 'migrating'" class="float-right py-1 px-3 text-sm text-white font-semibold bg-yellow-500 rounded-full">{{ server.status }}</span>
                <span v-if="server.status === 'rebuilding'" class="float-right py-1 px-3 text-sm text-white font-semibold bg-yellow-500 rounded-full">{{ server.status }}</span>
            </div>
        </div>
    </div>

</template>

<script>
    import Byteconverter from '@wtfcode/byte-converter';
    import { mapState, mapGetters } from 'vuex';

    export default {
        name: "Index",
        computed: {
            ...mapState({
                servers: state => state.servers.all,
                images: state => state.snapshots.all,
                backups: state => state.backups.all
            }),

            ...mapGetters('servers', {
                allServers: 'allServers',
                runningServers: 'runningServers',
                offlineServers: 'offlineServers'
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