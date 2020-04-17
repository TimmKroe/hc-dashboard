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
                        {{ this.singleServer(this.serverName).server_type.name.toUpperCase() + ', ' +  this.singleServer(this.serverName).image.name.replace("-", " ")}}
                    </h2>
                </div>
            </div>
        </section>
        <h3 class="is-size-3"></h3>

    </div>
</template>

<script>
     import {mapState, mapGetters} from "vuex";

    export default {
        name: "SingleServer",
        components: {},
        data() {
            return {
                serverName: this.$route.path.toString().replace("/servers/", ""),
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
        }
    }
</script>

<style scoped>

</style>