import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict:true, //开启了严格模式
  state: {
    switchElement:"image",
    imageStyles: {
      moveX:200,
      moveY:100,
      width:100,
      height:100
    },
    textStyles:{
      moveX:400,
      moveY:260,
      width:100,
      height:100
    }
  },
  getters: {
    saleProducts: (state) => {
      var saleProducts = state.products.map(item => {
        return {
          name: item.name + '**',
          price: item.price
        }
      })
      return saleProducts
    },
  },
  mutations: {
    reducePrice: (state, payload) => {
      // setTimeout(function () {
        state.products.forEach(product => {
          product.price += payload
        })
      // }, 3000)
    },
    switchStatus:(state,payload)=>{
        state.switchElement = payload;
    }
  },
  actions: {
    reducePrice: (context, payload) => {
      setTimeout(function () {
        context.commit('reducePrice', payload)
      }, 2000)
    }
  }
})
