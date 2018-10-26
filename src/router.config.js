import rightMain from './components/rightMain'
import login from './components/login'
import index from './index'
import feedback from './components/feedback'
import match from './components/match' 
import order from './components/order'
import store from './components/store'


export default[
   
        {path:'/login',name:'login',component:login},
        {path:'/',name:'login',component:login},
        {path:'/index',name:'index',component:index,children:[
        {path:'rightMain',name:'rightMain',component:rightMain},
        {path:'feedback',name:'feedback',component:feedback},
        {path:'match',name:'match',component:match},
        {path:'order',name:'order',component:order},
        {path:'store',name:'store',component:store}


    ]}
    
 ]