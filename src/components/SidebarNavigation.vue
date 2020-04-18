<template>
    <div class="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0 shadow-2xl">
        <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
            <a class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
               href="#">HC
                Dashboard</a>
            <button
                    class="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path v-if="isNavOpen" @click="toggleNav()" clip-rule="evenodd"
                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                          fill-rule="evenodd"></path>
                    <path v-if="!isNavOpen" @click="this.toggleNav()" clip-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          fill-rule="evenodd"></path>
                </svg>
            </button>
        </div>
        <nav class="block flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
            <a :class="this.$route.path === '/' ? 'dark-mode:bg-gray-700 bg-gray-200' : 'bg-transparent dark-mode:bg-transparent'" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
               href="/">Status</a>
            <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
               href="#">Servers</a>
            <ul>
                <li :key="id" v-for="(server, id) in allServers">
                    <a :href="'/servers/' + server.name" :class="$route.path === '/servers/' + server.name ? 'dark-mode:bg-gray-700 bg-gray-200' : 'bg-transparent dark-mode:bg-transparent'"
                       class="block px-4 py-2 mt-2 ml-10 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">{{
                        server.name }}</a>
                </li>
            </ul>
            <a :class="this.$route.path === '/backups' ? 'dark-mode:bg-gray-700 bg-gray-200' : 'bg-transparent dark-mode:bg-transparent'" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
               href="/backups">Backups</a>
            <a :class="this.$route.path === '/about' ? 'dark-mode:bg-gray-700 bg-gray-200' : 'bg-transparent dark-mode:bg-transparent'" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
               href="/about">About</a>
            <a :class="this.$route.path === '/settings' ? 'dark-mode:bg-gray-700 bg-gray-200' : 'bg-transparent dark-mode:bg-transparent'" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
               href="/settings">Settings</a>

        </nav>
    </div>
</template>

<script>

    import {mapState, mapGetters, mapMutations} from "vuex";

    export default {
        name: "SidebarNavigation",
        data() {
            return {
                open: false,
            }
        },
        computed: {
            ...mapState({
                servers: state => state.servers.all,
                navigation: state => state.navigation.isNavOpen
            }),

            ...mapGetters('servers', {
                allServers: 'allServers'
            }),

            ...mapGetters('navigation', {
                isNavOpen: 'isNavOpen'
            }),

            ...mapMutations('navigation', {
                toggleNav: 'toggleNav'
            })
        },
        created() {
            this.$store.dispatch('servers/getAllServers')
        },
    }
</script>

<style scoped>

</style>