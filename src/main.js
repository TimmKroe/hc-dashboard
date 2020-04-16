import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import VueRouter from "vue-router";
import store from './store';

import IndexPage from "./Pages/Index";
import SingleServer from "./Pages/SingleServer";

import 'buefy/dist/buefy.css'

Vue.config.productionTip = false;
Vue.use(Buefy);

Vue.use(VueRouter);



const routes = [
  { path: '/', component: IndexPage},
  { path: '/servers/:name', exact: true, component: SingleServer },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
