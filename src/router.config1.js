import userRightMain from './userComponents/userRightMain'
import userFeedBack from './userComponents/userFeedBack'
import match from './components/match' 
import userIndex from './userIndex'
import userLogin from './userComponents/userLogin'
export default[
   
    {path:'/userLogin',name:'userLogin',component:userLogin},

    {path:'/',name:'userLogin',component:userLogin},
       {path:'/userIndex',name:'userIndex',component:userIndex,children:[
        {path:'userRightMain',name:'userRightMain',component:userRightMain},
        {path:'userFeedBack',name:'userFeedBack',component:userFeedBack},
        {path:'match',name:'match',component:match}
    ]}
    
 ]