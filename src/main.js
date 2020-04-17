import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import '@/assets/css/tailwind.css'

import IndexPage from "./Pages/Index";



Vue.config.productionTip = false;


Vue.use(VueRouter);



const routes = [
  { path: '/', component: IndexPage}
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
