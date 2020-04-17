<template>

    <div>
        <div class="flex flex-col bg-gray-200" v-for="(server, id) in this.servers" :key="id">
            <div class="bg-white shadow-lg rounded-md p-5 m-2 flex items-center justify-between border-b">
                <span class="text-2xl">{{ server.name }}</span>
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