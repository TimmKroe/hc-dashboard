<template>
    <div class="md:flex flex-row md:flex-row md:min-h-screen w-full ">

        <SidebarNavigation />

        <div class="flex flex-col bg-gray-200 w-full">
            <div class="container mx-auto mt-20 md:p-10">

                <router-view>

                </router-view>

            </div>
        </div>

    </div>
</template>

<script>

    import SidebarNavigation from "@/components/SidebarNavigation";
    export default {
        name: 'App',
        components: {SidebarNavigation}
    }
</script>

<style>
</style>
