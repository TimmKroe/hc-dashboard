import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import VueRouter from "vue-router";


import IndexPage from "./Pages/Index";

import 'buefy/dist/buefy.css'

Vue.config.productionTip = false;
Vue.use(Buefy);

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
