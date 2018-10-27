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
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//       if (this.$store.state.userInfo) {  //通过vuex state获取当前的token是否存在
//           next();
//       }
//       else {
//           next({
//               path: '/login',
//               query: {redirect: to.fullPath}  //将跳转的路由path作为参数，登录成功后跳转到该路由
//           })
//       }
//   }
//   else {
//       next();
//   }
// })
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
