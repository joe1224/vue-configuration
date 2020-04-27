import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict:true, //开启了严格模式
  state: {
    switchElement: '',
    /*imageStyles: {
      moveX: 0,
      moveY: 0,
      width: 100,
      height: 100
    },*/
    textStyles: {
      type: '',
      moveX: 0,
      moveY: 0,
      width: 100,
      height: 100
    },
    components: [
      {
        type: 'text',
        action: [],
        dataBind: {},
        style: {
          x: 0,
          y: 0,
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

    switchStatus: (state, payload) => {
      state.switchElement = payload
      console.log(state.switchElement)
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
      state.textStyles.moveX = payload.moveX
      state.textStyles.moveY = payload.moveY
      state.textStyles.width = payload.width
      state.textStyles.height = payload.height
    },

    updateTextStyleDrag (state, payload) {
      state.textStyles.moveX = payload.moveX
      state.textStyles.moveY = payload.moveY
    },

    components (state, payload) {
      state.components.push(payload.component)
      /*for(let i of state.components){
        console.log(i.style);
      }*/
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
