import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

import FastClick from 'fastclick'
import VueLazyLoad from "vue-lazyload";
Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('./assets/images/common/placeholder.png')
})

FastClick.attach(document.body)
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
