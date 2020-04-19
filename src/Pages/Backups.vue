<template>
    <div class="m-2">
        <h1 class="text-4xl pb-5">All Backups</h1>

        <div class="flex flex-col bg-gray-200" v-for="(backup, id) in allBackups" :key="id">
            <div class="bg-white shadow-lg rounded-md p-5 m-2 flex items-center justify-between border-b">
                <span class="text-2xl">
                    {{ backup.description }}
                    <span class="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border align-middle">{{ backup.created_from.name }}</span>
                </span>
                <span v-if="backup.status === 'available'" class="float-right py-1 px-3 text-sm text-white font-semibold bg-green-500 rounded-full">{{ backup.status }}</span>
                <span v-if="backup.status === 'creating'" class="float-right py-1 px-3 text-sm text-white font-semibold bg-yellow-500 rounded-full">{{ backup.status }}</span>
            </div>
        </div>

        <table class="md: hidden min-w-full leading-normal shadow-lg rounded-md">
            <thead>
            <tr>
                <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Backupname
                </th>
                <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Server
                </th>
                <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created at
                </th>
                <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                </th>
            </tr>
            </thead>
            <tbody>
            <tr :key="id" v-for="(backup, id) in allBackups">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div class="flex items-center">
                        <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                                {{ backup.description }}
                            </p>
                        </div>
                    </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">
                        {{ backup.created_from.name }}
                    </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">
                        {{ backup.created }}
                    </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span v-if="backup.status === 'available'" class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden
                              class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span class="relative">available</span>
                    </span>
                    <span v-if="backup.status === 'creating'" class="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                        <span aria-hidden
                              class="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                        <span class="relative">creating</span>
                    </span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';

    export default {
        name: "Backups",
        computed: {
            ...mapState({
                backups: state => state.backups,
            }),
            ...mapGetters('backups', {
                allBackups: 'allBackups'
            })
        },
        created() {
            this.$store.dispatch('backups/getAllBackups');
        }
    }
</script>

<style scoped>

</style>