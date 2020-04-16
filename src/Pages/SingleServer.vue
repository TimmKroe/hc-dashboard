<template>
    <div>
        <section class="hero is-info welcome is-small">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{ this.serverName }}
                        <small>{{ this.singleServer.status}}</small>
                    </h1>
                    <h2 class="subtitle">
                        {{ this.singleServer.image.name}}
                    </h2>
                </div>
            </div>
        </section>
        <h3 class="is-size-3"></h3>
        {{ this.servers}}

    </div>
</template>

<script>
    import {mapState, mapGetters} from "vuex";

    export default {
        name: "SingleServer",
        components: {},
        data() {
            return {
                serverName: '',
                singleServer: null
            }
        },
        computed: {
            ...mapState({
                servers: state => state.servers.all,
            }),
            ...mapGetters({
                server: 'servers/matchingServer'
            }),
        },
        created() {
            this.$store.dispatch('servers/getAllServers');
            this.serverName = this.$route.path.toString().replace("/servers/", "")
            this.singleServer = this.server(this.serverName);
        }
    }
</script>

<style scoped>

</style>