import userRightMain from './userComponents/userRightMain'
import userFeedBack from './userComponents/userFeedBack'
import match from './components/match' 
import userIndex from './userIndex'
import userLogin from './userComponents/userLogin'
import userRegister from './userComponents/userRegister'
import photo from './userComponents/photo'
import userOrder from './userComponents/userOrder'
import userCart from './userComponents/userCart'
import userSearch from './userComponents/userSearch'
import userGoods from './userComponents/userGoods'
import userEvaluate from './userComponents/userEvaluate'
import userFace from './userComponents/userFace'
import userTop from './userComponents/userTop'
export default[
   
    {path:'/userTop',name:'userTop',component:userTop},
    {path:'/userLogin',name:'userLogin',component:userLogin},
    {path:'/userRegister',name:'userRegister',component:userRegister},
    {path:'/photo',name:'photo',component:photo},
    {path:'/',name:'userRightMain',component:userRightMain},
       {path:'/userIndex',name:'userIndex',component:userIndex,
       meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
       children:[
       
        {path:'userRightMain',name:'userRightMain',component:userRightMain},
        {path:'userFeedBack',name:'userFeedBack',component:userFeedBack},
        {path:'userCart',name:'userCart',component:userCart},
        {path:'userOrder',name:'userOrder',component:userOrder}, 
        {path:'userSearch',name:'userSearch',component:userSearch},
        {path:'userGoods/:id',name:'userGoods',component:userGoods},
        {path:'userEvaluate/:id',name:'userEvaluate',component:userEvaluate},
        {path:'userFace',name:'userFace',component:userFace}
    ]},
    {path:'*',component:userIndex,redirect:{ name: 'userIndex' }},

    
 ]