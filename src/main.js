// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Index from './Index'
import router from './router/index.js'
import Mint from 'mint-ui'
import axios from 'axios';

import 'mint-ui/lib/style.css';
Vue.config.productionTip = false
Vue.use(Mint);
Vue.prototype.$ajax = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
}).$mount('#app');
