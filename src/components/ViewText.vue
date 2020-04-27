<template>
  <vue-draggable-resizable
    :id="detail.style.type"
    :onDragStart="onDragStartCallback"
    @dragging="onDrag"
    @resizing="onResize"
    @activated="onActivated"
    :snap="true"
    :parent="true"
    :x="textStyles.moveX"
    :y="textStyles.moveY"
    :w="textStyles.width"
    :h="textStyles.height">
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
        /*Twidth: 100,
        Theight: 100,
        moveX: 50,
        moveY: 50*/
      }
    },
    methods: {
      del (n) {
        this.$emit('remove', n)
      },
      onDragStartCallback (ev) {
        ev.stopPropagation()
      },
      onResize (moveX, moveY, width, height) {
        this.$store.commit('updateTextStyleResize', {moveX, moveY, width, height})
      },
      onDrag (moveX, moveY) {
        this.$store.commit('updateTextStyleDrag', {moveX, moveY})
      },
      onActivated (type) {
        this.$emit('activated', type);
      },
    },
    computed: {
      ...mapState([
        'textStyles'
      ])
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
