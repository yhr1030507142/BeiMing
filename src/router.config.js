import rightMain from './components/rightMain'
import login from './components/login'
import index from './index'
import feedback from './components/feedback'
import match from './components/match' 
import order from './components/order'
import store from './components/store'
import getFood from './components/getFood'

export default[
   
        {path:'/login',name:'login',component:login},
        {path:'/',name:'index',component:index,
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        }
    },
        {path:'/index',name:'index', 
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component:index,children:[
        {path:'rightMain',name:'rightMain',component:rightMain},
        {path:'feedback',name:'feedback',component:feedback},
        {path:'match',name:'match',component:match},
        {path:'order',name:'order',component:order},
        {path:'store',name:'store',component:store},
        {path:'getFood/:id',name:'getFood',component:getFood}

    ]},
      {path:'*',component:index,redirect:{ name: 'index' }},
    

    
 ]