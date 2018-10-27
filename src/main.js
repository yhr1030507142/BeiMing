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
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(vuex)
Vue.component('ImgInputer', ImgInputer)
Vue.prototype.$http=axios
Vue.config.productionTip = false
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
router.beforeEach((to, from, next) => { 
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆 
   if (sessionStorage.getItem('info')) { // 查询本地存储信息是否已经登陆 
    next(); 
   } else { 
    next({ 
     path: '/login', // 未登录则跳转至login页面 
    //  query: {redirect: to.fullPath} // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面 
     }); 
   } 
  } else { 
   next(); 
  } 
 });

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
