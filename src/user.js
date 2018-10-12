// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import user from './user.vue'
import VueRouter from 'vue-router'
import routes from './router.config1'
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
/* eslint-disable no-new */
Vue.config.productionTip = false
const router = new VueRouter({
  routes
})

new Vue({
  el: '#user',
  router,
  store,
  render:h=>h(user)
})
