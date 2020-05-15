import {ADD_COUNTER, ADD_TO_CART} from "./mutation-types";

export default {
  //mutation
  //addCart(state, payload) {
  //action
  addCart(context, payload) {
    return new Promise((resolve) => {
      //payload新添加的商品
      //判断商品是否已在购物车
      let oldProduct = null;
      for (let item of context.state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item
        }
      }
      //将商品添加
      if (oldProduct) {
        //oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前数量加一')
      } else {
        //首次添加，设置属性count
        payload.count = 1
        //state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加新商品')
      }
    })
  }
}
