import vuex from 'vuex'
import Vue from 'vue'
import product_data from '../Mock/produce'
import axios from "axios";
Vue.prototype.$http=axios
Vue.use(vuex)
const Http = new Vue
const state ={
    face:false,
    test:'test',
    productList:[],
    cartList:[],
    base64:'',
    userNo:'',
    photoBox:'',
    menuId:'',
    //全局传递订单结算信息
    accountInfo:[],

    //登录信息
    userLogin:{
        userName:'',
        shopName:'',
        shopId:'',
        userInfo:[],
    },
    indexLogin:{
        userName:'',
        shopName:'',
        shopId:'',
        userInfo:[],
    }
}

const getters ={
    changeFace(state){
        return state.face
    }
}
const actions ={
    changeFace:({commit,state})=>{
        commit('changeFace')
    },
    getProductList(context){
        setTimeout(()=>{
            context.commit('setProductList',product_data)
        },500);
        // Http.$http.post('/api/localhost/cart').then((res)=>{
        //     console.log(res)
        //     context.commit('setProductList',res)
        // })
    },
    getCartList(context){
        Http.$http.get('/api/yang/shoppingCars').then((res)=>{
            console.log(res.data.info.shoppingCarInfo[0].shopName)
            context.commit('getCartList',res.data.info.shoppingCarInfo[0])
        })
    }
}

const mutations ={
    changeFaceT:(state)=>{
            state.face=true
    },
    changeFaceF:(state)=>{
        state.face=true
    },
    setProductList(state,data){
        state.productList = data 
    },
    getCartList(state,data){
        state.cartList = data 
    },
    addCart(state,id){
        const isAdded = state.cartList.find(item => item.id === id);
        if(isAdded){
            isAdded.count++;
        }else{
            state.cartList.push({
                id:id,
                count:1
            })
        }
    }
}

const store =new vuex.Store({
    state,mutations,actions,getters
})
export default store;