import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import '@/assets/css/tailwind.css'

import store from './store';

import IndexPage from "./Pages/Index";
import AboutPage from './Pages/About';
import BackupsPage from './Pages/Backups';
import SingleServer from "./Pages/SingleServer";
import NotFoundErrorPage from './Pages/NotFoundError';

Vue.config.productionTip = false;


Vue.use(VueRouter);



const routes = [
  { path: '/', component: IndexPage},
  { path: '/about', exact: true, component: AboutPage},
  { path: '/backups', exact: true, component: BackupsPage},
  { path: '/servers/:name', exact: true, component: SingleServer },
  { path: '*', component: NotFoundErrorPage },
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
