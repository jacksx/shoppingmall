import Vue from "vue";
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
//安装插件
Vue.use(Vuex)

//创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations,
  actions,
  getters
  //非异步修改state 必须要经过mutation，异步经过action
  // mutations: {
  //   addCounter(state, payload) {
  //     payload.count++
  //   },
  //   addToCart(state, payload) {
  //     state.cartList.push(payload)
  //   }
  // },

})

//挂载Vue实例上
export default store
