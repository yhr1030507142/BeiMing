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
export default[
   
    {path:'/userLogin',name:'userLogin',component:userLogin},
    {path:'/userRegister',name:'userRegister',component:userRegister},
    {path:'/photo',name:'photo',component:photo},
    {path:'/',name:'userLogin',component:userLogin},
       {path:'/userIndex',name:'userIndex',component:userIndex,children:[
        {path:'userRightMain',name:'userRightMain',component:userRightMain},
        {path:'userFeedBack',name:'userFeedBack',component:userFeedBack},
        {path:'userCart',name:'userCart',component:userCart},
        {path:'userOrder',name:'userOrder',component:userOrder}, 
        {path:'userSearch',name:'userSearch',component:userSearch},
        {path:'userGoods',name:'userGoods',component:userGoods},
        {path:'userEvaluate',name:'userEvaluate',component:userEvaluate}

    ]}
    
 ]