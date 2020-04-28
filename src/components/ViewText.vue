<template>
  <vue-draggable-resizable
    id="draText"
    :onDragStart="onDragStartCallback"
    @dragging="(x,y) => onDrag(x,y, type)"
    @resizing="(x,y,w,h) => onResize(x,y,w,h, type)"
    @activated="onActivated"
    :parent="true"
    :is-conflict-check="true"
    :snap="true"
    :snap-tolerance="20"
    @refLineParams="getRefLineParams"
    :x="detail.style.x"
    :y="detail.style.y"
    :w="detail.style.w"
    :h="detail.style.h">
    <div @keyup.delete="del(detail)" tabindex="1">
      <div class="view-text" v-if="detail.style!=undefined" :style="{
        fontSize: detail.style.fontSize + 'px',
        fontFamily: detail.style.fontFamily,
        color: detail.style.foreColor,
        textAlign: detail.style.textAlign,
        lineHeight: detail.style.lineHeight + 'px',}">
        {{detail.style.text}}
      </div>
    </div>
  </vue-draggable-resizable>

</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: 'view-text',
    props: {
      detail: {
        type: Object,
        default: {},
      },
      type: {
        type: String,
        default: 'text',
      }
    },
    data () {
      return {
        lists: {}
      }
    },
    methods: {
      del (n) {
        this.$emit('remove', n)
      },
      getRefLineParams (params) {
        this.$emit('getRefLineParams', params)
      },
      onDragStartCallback (ev) {
        ev.stopPropagation()
      },
      onResize (x, y, w, h, type) {
        console.log(type)
        console.log(this.$store.state.switchElement)
        this.$store.commit('updateTextStyleResize', {x, y, w, h, type})

      },
      onDrag (x, y, type) {
        this.$store.commit('updateTextStyleDrag', {x, y, type})
      },
      onActivated (type) {
        this.$emit('activated', type)
      },
    },
    computed: {
      ContentItem () {
        let com = this.$store.state.components
        for (let i of com) {
          if (this.$store.state.switchElement == i.type) {
            return i.style
          }
        }
      },
    },
    mounted () {

    }
  }
</script>

<style>
  .view-text {
    height: 100%;
    width: 100%;
  }

  .viewText {
  }
</style>
