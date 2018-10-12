// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueRouter from 'vue-router'
import routes from './router.config'
import vuex from 'vuex'
import axios from 'axios'
import store from './store/index'
import ElementUI from 'element-ui'
import  'element-ui/lib/theme-chalk/index.css';
import './assets/sass/base.scss'
import './Mock/mock'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(vuex)
Vue.prototype.$http=axios
Vue.config.productionTip = false
const router = new VueRouter({
  routes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
