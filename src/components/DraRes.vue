<template>
  <div>
    <div class="page">
      <vue-draggable-resizable
        :x="imageStyles.moveX"
        :y="imageStyles.moveY"
        :w="imageStyles.width"
        :h="imageStyles.height"
        @dragging="onDrag"
        @resizing="onResize"
        @activated="onActivated('image')"
        :parent="true"
        :is-conflict-check="true"
        :snap="true"
        :snap-tolerance="20"
        @refLineParams="getRefLineParams">
        <div @drop="onDrop($event)" @dragover.prevent style="height:100%;width: 100%;">
          <!--          <view-text  :detail="lists"></view-text>-->
          <view-image :detail="modulesImage" @remove="remove"></view-image>
        </div>
      </vue-draggable-resizable>
      <vue-draggable-resizable
        @refLineParams="getRefLineParams"
        @dragging="onDrag2"
        @resizing="onResize2"
        @activated="onActivated('text')"
        :snap="true"
        :x="textStyles.moveX"
        :y="textStyles.moveY"
        :w="textStyles.width"
        :h="textStyles.height">
        <!--        <img src="../assets/images/logo.png"  :width="width" :height="height"/>-->
        <div @drop="onDropText($event)" @dragover.prevent style="height:100%;width: 100%;">
          <view-text :detail="modulesText"></view-text>
        </div>
      </vue-draggable-resizable>
      <span class="ref-line v-line"
            v-for="item in vLine"
            v-show="item.display"
            :style="{ left: item.position, top: item.origin, height: item.lineLength}"
      />
      <span class="ref-line h-line"
            v-for="item in hLine"
            v-show="item.display"
            :style="{ top: item.position, left: item.origin, width: item.lineLength}"
      />
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ViewText from './ViewText'
  import ViewImage from './ViewImage'

  export default {
    components: {
      ViewText,
      ViewImage
    },
    data () {
      return {
        modulesText: {},
        modulesImage: {},
        vLine: [],
        hLine: []
      }
    },
    methods: {
      onResize (x, y, width, height) {
        this.$store.state.imageStyles.moveX = x
        this.$store.state.imageStyles.moveY = y
        this.$store.state.imageStyles.width = width
        this.$store.state.imageStyles.height = height;
      },
      onDrag (x, y) {
        this.$store.state.imageStyles.moveX = x
        this.$store.state.imageStyles.moveY = y
      },
      onActivated (ev) {
        this.$store.commit('switchStatus',ev);
      },
      onResize2 (x, y, width, height) {
        this.$store.state.textStyles.moveX = x
        this.$store.state.textStyles.moveY = y
        this.$store.state.textStyles.width = width
        this.$store.state.textStyles.height = height
      },
      onDrag2 (x, y) {
        this.$store.state.textStyles.moveX = x
        this.$store.state.textStyles.moveY = y
      },
      getRefLineParams (params) {
        const {vLine, hLine} = params
        this.vLine = vLine
        this.hLine = hLine
      },
      onDrop (event) {
        event.preventDefault()
        let infoJson = event.dataTransfer.getData('my-info')
        this.modulesImage = JSON.parse(infoJson)
      },
      onDropText (event) {
        event.preventDefault()
        let infoJson = event.dataTransfer.getData('my-info')
        this.modulesText = JSON.parse(infoJson)
      },
      remove () {
        console.log('remove')
      },
    },
    computed: {
      ...mapState([
        'imageStyles', 'textStyles'
      ])
    }
  }
</script>
<style>
  .page {
    height: 800px;
    width: 100%;
    box-sizing: content-box;
    border: 1px solid red;
    position: relative;
  }
</style>
