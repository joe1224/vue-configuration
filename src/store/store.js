import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict:true, //开启了严格模式
  state: {
    switchElement: 'image',
    imageStyles: {
      moveX: 0,
      moveY: 0,
      width: 100,
      height: 100
    },
    textStyles: {
      moveX: 0,
      moveY: 0,
      width: 100,
      height: 100
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

   /* updateEditorData:(state)=>{
      console.log(state.switchElement);
      if(state.switchElement === 'image'){
        return state.imageStyles;
      }else {
        return state.textStyles;
      }
    }*/

  },
  mutations: {
    reducePrice: (state, payload) => {
      // setTimeout(function () {
      state.products.forEach(product => {
        product.price += payload
      })
      // }, 3000)
    },
    switchStatus: (state, payload) => {
      state.switchElement = payload
    },

    updateImgStyleResize(state,payload){
      state.imageStyles.moveX = payload.moveX;
      state.imageStyles.moveY = payload.moveY;
      state.imageStyles.width = payload.width;
      state.imageStyles.height = payload.height;
    },

    updateImgStyleDrag(state,payload){
      state.imageStyles.moveX = payload.moveX;
      state.imageStyles.moveY = payload.moveY;
    },

    updateTextStyleResize(state,payload){
      state.textStyles.moveX = payload.moveX;
      state.textStyles.moveY = payload.moveY;
      state.textStyles.width = payload.width;
      state.textStyles.height = payload.height;
    },

    updateTextStyleDrag(state,payload){
      state.textStyles.moveX = payload.moveX;
      state.textStyles.moveY = payload.moveY;
    },
  },
  actions: {
    reducePrice: (context, payload) => {
      setTimeout(function () {
        context.commit('reducePrice', payload)
      }, 2000)
    },

  }
})
