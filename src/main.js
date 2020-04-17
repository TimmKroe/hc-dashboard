import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import '@/assets/css/tailwind.css'

import IndexPage from "./Pages/Index";
import BackupsPage from './Pages/Backups';


Vue.config.productionTip = false;


Vue.use(VueRouter);



const routes = [
  { path: '/', component: IndexPage},
  { path: '/backups', exact: true, component: BackupsPage}
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
