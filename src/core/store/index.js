import Vue from "vue";
import Vuex from "vuex";
import apis from "@/core/api/index"
// console.log("OK");
Vue.use(Vuex);

//定义属性值  data
const state={
  shopCart: { "N": 0, "list": [] },
  userInfo:""
};
//定义同步方法
const mutations = {
  vuexInit(state){
    state.cartList=sessionStorage.getItem("cartList")|| { "N": 0, "list": [] };

  },
  // 添加商品信息到vuex的数据中
  add(state, data) {
    if (state.shopCart.list.length > 0) {
      var con = true;
      state.shopCart.list.forEach(ele => {

        if (ele.id == data.id) {
          ele.num++;
          con=false;
          return
        }
      });

      if (con) {
        state.shopCart.list.push(data)
      }
      state.shopCart.N++
    } else {
      state.shopCart.list.push(data);
      state.shopCart.N++
    }
    sessionStorage.setItem("cartList", JSON.stringify(state.shopCart));
  },
  //减法
  minus(state,data){
    state.shopCart.list.forEach(ele => {
      if(ele.id==data){
        ele.num--;
        if (ele.num == 0) {
          ele.num = 1;
        }else {
          state.shopCart.N--;
        }
      }
    });
    sessionStorage.setItem("cartList", JSON.stringify(state.shopCart));
  },
  //加法
  push(state,data){
    state.shopCart.list.forEach(ele => {
      if(ele.id==data){
        ele.num++;
        state.shopCart.N++
      }

    });
    sessionStorage.setItem("cartList", JSON.stringify(state.shopCart));
  },
  saveUserInfo(state,data){
    state.userInfo=data;
    // console.log(state.userInfo);
  }
};

//定义 computed(属性计算)
const getters={
  // count(state){
  //   return state.shopCart.list.length;
  // }
};

//定义异步方法,可以在这个里面做一些异步操作,比如调用通用数据接口
const actions={

};

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
