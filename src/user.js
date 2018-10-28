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
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'
import $ from 'jquery'
Vue.component('ImgInputer', ImgInputer)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(vuex)
Vue.prototype.$http=axios
/* eslint-disable no-new */
Vue.config.productionTip = false
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
router.beforeEach((to, from, next) => { 
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆 
   if (sessionStorage.getItem('userInfo')) { // 查询本地存储信息是否已经登陆
    next(); 
   } else { 
     console.log(2)
    next({ 
     path: '/userLogin', // 未登录则跳转至login页面 
    //  query: {redirect: to.fullPath} // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面 
     }); 
   } 
  } else { 
   next(); 
  } 
 });
 
new Vue({
  el: '#user',
  router,
  store,
  render:h=>h(user)
})
