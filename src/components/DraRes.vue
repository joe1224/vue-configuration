<template>
  <div>
    <div class="page">
      <vue-draggable-resizable
        id="draImage"
        :x="imageStyles.moveX"
        :y="imageStyles.moveY"
        :w="Iwidth"
        :h="Iheight"
        @dragging="onDrag"
        @resizing="onResize"
        @activated="onActivated('image')"
        :parent="true"
        :is-conflict-check="true"
        :snap="true"
        :snap-tolerance="20"
        @refLineParams="getRefLineParams">
        <div @drop="onDrop($event)" @dragover.prevent style="height:100%;width: 100%;">
          <view-image :detail="modulesImage" @remove="remove" tabindex="1"></view-image>
        </div>
      </vue-draggable-resizable>
      <vue-draggable-resizable
        id="draText"
        @refLineParams="getRefLineParams"
        @dragging="onDrag2"
        @resizing="onResize2"
        @activated="onActivated('text')"
        :snap="true"
        :parent="true"
        :x="textStyles.moveX"
        :y="textStyles.moveY"
        :w="Twidth"
        :h="Theight">
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
        hLine: [],
        Iwidth: 1262,
        Iheight: 800,
        Twidth: 1262,
        Theight: 800,
      }
    },
    mounted () {
      let draImage = document.getElementById('draImage');
      draImage.style.left = 0;
      draImage.style.top = 0;
      let draText = document.getElementById('draText');
      draText.style.left = 0;
      draText.style.top = 0;
    },
    methods: {
      onResize (moveX, moveY, width, height) {
        this.$store.commit('updateImgStyleResize', {moveX, moveY, width, height})
      },
      onDrag (moveX, moveY) {
        this.$store.commit('updateImgStyleDrag', {moveX, moveY})
      },
      onActivated (ev) {
        this.$store.commit('switchStatus', ev);
      },
      onResize2 (moveX, moveY, width, height) {
        this.$store.commit('updateTextStyleResize', {moveX, moveY, width, height})
      },
      onDrag2 (moveX, moveY) {
        this.$store.commit('updateTextStyleDrag', {moveX, moveY})
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
        this.Iwidth = this.$store.state.imageStyles.width
        this.Iheight = this.$store.state.imageStyles.height

      },
      onDropText (event) {
        event.preventDefault()
        let infoJson = event.dataTransfer.getData('my-info')
        this.modulesText = JSON.parse(infoJson)
        this.Twidth = this.$store.state.textStyles.width
        this.Theight = this.$store.state.textStyles.height
      },
      remove () {
        console.log('remove');
        this.modulesImage={};
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
