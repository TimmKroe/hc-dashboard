<template>
    <aside class="menu is-hidden-mobile">
        <p class="menu-label">
            General
        </p>
        <ul class="menu-list">
            <li><a :class="'/' === $router.currentRoute.path ? 'is-active' : ''" href="/">Dashboard</a></li>
            <li>
                <a>My Servers</a>
                <ul>
                    <li v-for="item of servers" :key="item.id"><a
                            :class="'/servers/' + item.name === $router.currentRoute.path ? 'is-active' : ''"
                            :href="'/servers/' + item.name">{{ item.name }}</a></li>
                </ul>
            </li>
        </ul>
    </aside>
</template>

<script>

    import {mapState} from "vuex";

    export default {
        name: "SidebarNavigation",
        computed: {
            ...mapState({
                servers: state => state.servers.all,
            })
        },
        created() {
            this.$store.dispatch('servers/getAllServers')
        },
    }
</script>

<style scoped>

</style>