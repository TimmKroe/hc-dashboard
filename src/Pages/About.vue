<template>
    <div>
        <h1 class="text-4xl pb-5 ml-2">About</h1>

        <div class="bg-white shadow-lg rounded-md p-5 m-2 border-b">

            <div class="mb-4">
                <h3 class="text-2xl font-semibold">Description</h3>
                <p>hc-dashboard is a public dashboard for all your Cloud Servers. It acts as a public Status Page for your Customers, Friends, or for yourself.</p>
            </div>

            <div class="mb-4">
                <h3 class="text-2xl font-semibold">License</h3>
                <p><a href="https://github.com/TimmKroe/hc-dashboard/blob/master/LICENSE" class="hover:text-blue-700">LICENSE</a></p>
            </div>

            <div class="mb-4">
                <h3 class="text-2xl font-semibold">Software / Technology used</h3>
                <ul class="list-disc pl-10">
                    <li><a class="text-blue-500 hover:text-blue-900" href="https://www.npmjs.com/package/vue">Vue.js</a></li>
                    <li><a class="text-blue-500 hover:text-blue-900" href="https://www.npmjs.com/package/vuex">Vuex</a></li>
                    <li><a class="text-blue-500 hover:text-blue-900" href="https://www.npmjs.com/package/vue-router">Vue Router</a></li>
                    <li><a class="text-blue-500 hover:text-blue-900" href="https://www.npmjs.com/package/vue-chartjs">Vue Chart.js</a></li>
                    <li><a class="text-blue-500 hover:text-blue-900" href="https://www.npmjs.com/package/chartjs">Chart.js</a></li>
                    <li><a class="text-blue-500 hover:text-blue-900" href="https://www.npmjs.com/package/dotenv">dotenv</a></li>
                    <li><a class="text-blue-500 hover:text-blue-900" href="https://www.npmjs.com/package/axios">axios</a></li>
                </ul>
            </div>

            <div class="mb-4">
                <h3 class="text-2xl font-semibold">Version</h3>
                <p><strong>Local →</strong> <code>2020.2 dev</code> released <code>just now</code></p>
                <p>
                    Latest Release → <img class="inline-block" alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/timmkroe/hc-dashboard?style=flat-square">
                </p>

            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped>

</style>