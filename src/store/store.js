import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict:true, //开启了严格模式
  state: {
    switchElement: 'text',
    /*textStyles: {
      type: '',
      moveX: 0,
      moveY: 0,
      width: 100,
      height: 100
    },*/
    components: [
      {
        type: 'text',
        action: [],
        dataBind: {},
        style: {
          x: 50,
          y: 50,
          w: 100,
          h: 100,
          backColor: 'transparent',
          foreColor: '#FF0000',
          zIndex: 1,
          transform: 0,
          text: 'Test',
          textAlign: 'center',
          fontSize: 30,
          fontFamily: 'Arial',
          lineHeight: 100
        }
      }
    ]
  },
  getters: {
    saleProducts: (state) => {
      let saleProducts = state.products.map(item => {
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

    switchStatus: (state, payload) => {
      state.switchElement = payload
    },

    /*updateImgStyleResize(state,payload){
      state.imageStyles.moveX = payload.moveX;
      state.imageStyles.moveY = payload.moveY;
      state.imageStyles.width = payload.width;
      state.imageStyles.height = payload.height;
    },

    updateImgStyleDrag(state,payload){
      state.imageStyles.moveX = payload.moveX;
      state.imageStyles.moveY = payload.moveY;
    },*/

    updateTextStyleResize (state, payload) {
      for (let i of state.components) {
        if (state.switchElement == i.type) {
          i.style.x = payload.x
          i.style.y = payload.y
          i.style.w = payload.w
          i.style.h = payload.h
        }
      }
    },

    updateTextStyleDrag (state, payload) {
      for (let i of state.components) {
        if (state.switchElement == i.type) {
          i.style.x = payload.x
          i.style.y = payload.y
        }
      }
    },

    components (state, payload) {
      state.components.push(payload.component)
    }
  },
  actions: {
    reducePrice: (context, payload) => {
      setTimeout(function () {
        context.commit('reducePrice', payload)
      }, 2000)
    },

  }
})
