<template>
  <vue-draggable-resizable
    :id="detail.style.type"
    :onDragStart="onDragStartCallback"
    @dragging="onDrag"
    @resizing="onResize(id)"
    @activated="onActivated"
    :snap="true"
    :parent="true"
    :x="ContentItem.x"
    :y="ContentItem.y"
    :w="ContentItem.w"
    :h="ContentItem.h">
    <div class="view-text" v-if="detail.style!=undefined" :style="{
        fontSize: detail.style.fontSize + 'px',
        fontFamily: detail.style.fontFamily,
        color: detail.style.foreColor,
        textAlign: detail.style.textAlign,
        lineHeight: detail.style.lineHeight + 'px',
    }" @keyup.delete="del(detail)">
      {{detail.style.text}}

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
      }
    },
    data () {
      return {
        lists:{}
      }
    },
    methods: {
      del (n) {
        this.$emit('remove', n)
      },
      onDragStartCallback (ev) {
        ev.stopPropagation()
      },
      onResize (type,x, y, w, h) {
        this.$store.commit('updateTextStyleResize', {type,x, y, w, h})
      },
      onDrag (moveX, moveY) {
        this.$store.commit('updateTextStyleDrag', {moveX, moveY})
      },
      onActivated (type) {
        this.$emit('activated', type);
      },
    },
    computed: {
      ContentItem(){
        let com = this.$store.state.components;
        for(let i of com){
          if(this.$store.state.switchElement==i.type){
            return i.style;
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
