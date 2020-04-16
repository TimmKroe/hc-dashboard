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
                    <li v-for="item of servers" :key="item.id"><a :class="'/servers/' + item.name === $router.currentRoute.path ? 'is-active' : ''" :href="'/servers/' + item.name">{{ item.name }}</a></li>
                </ul>
            </li>
        </ul>
    </aside>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "SidebarNavigation",
        data() {
            return {
                servers: [],
            }
        },
        created() {

            const headers = {
                Authorization: 'Bearer SzNnpA76l2hqJgMFyZCPyXDFKt5gZpek4t3N9RiiRGnrVmQuMjAkVXBTcHhbYsFT'
            }

            axios.get('https://api.hetzner.cloud/v1/servers', {headers: headers})
                .then(res => {
                    this.servers = res.data.servers;
                }).catch(err => {
                console.log(err)
            });

            console.log(this.$router.currentRoute.path);
        }
    }
</script>

<style scoped>

</style>