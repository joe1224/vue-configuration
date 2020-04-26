<template>
  <div>
    <div id="dragArea" class="page" @mousedown="createBlock">
      <vue-draggable-resizable
        id="draImage"
        :x="imageStyles.moveX"
        :y="imageStyles.moveY"
        :w="Iwidth"
        :h="Iheight"
        :onDragStart="onDragStartCallback"
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
        :onDragStart="onDragStartCallback"
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
          <view-text :detail="modulesText" @remove="textRemove" tabindex="1"></view-text>
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
      <span id="bgBlock"></span>
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
      let draImage = document.getElementById('draImage')
      draImage.style.left = 0
      draImage.style.top = 0
      let draText = document.getElementById('draText')
      draText.style.left = 0
      draText.style.top = 0
    },
    methods: {
      onDragStartCallback (ev) {
        ev.stopPropagation()
      },
      onResize (moveX, moveY, width, height) {
        this.$store.commit('updateImgStyleResize', {moveX, moveY, width, height})
      },
      onDrag (moveX, moveY) {
        this.$store.commit('updateImgStyleDrag', {moveX, moveY})
      },
      onActivated (ev) {
        this.$store.commit('switchStatus', ev)
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
        this.modulesImage = {}
      },
      textRemove () {
        this.modulesText = {}
      },
      createBlock (e) {
        e.stopPropagation()
        let bgBlock = document.getElementById('bgBlock')
        let dragArea = document.getElementById('dragArea')
        let initL = e.clientX
        let initT = e.clientY
        bgBlock.style.opacity = '0.3'
        bgBlock.style.width = 0 + 'px'
        bgBlock.style.height = 0 + 'px'
        document.onmousemove = (e) => {
          let w = e.clientX - initL
          let h = e.clientY - initT
          bgBlock.style.width = Math.abs(w) + 'px'
          bgBlock.style.height = Math.abs(h) + 'px'
          if (e.clientX - initL > 0) {
            this.setPosition(bgBlock, initT - dragArea.offsetTop, initL - dragArea.offsetLeft)
          } else {
            this.setPosition(bgBlock, initT - dragArea.offsetTop + h, initL - dragArea.offsetLeft + w)
          }
        }
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
        }

      },

      setPosition (obj, top, left) {
        if (top !== -1) obj.style.top = top + 'px'
        if (left !== -1) obj.style.left = left + 'px'
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

  #bgBlock {
    display: block;
    position: absolute;
    background-color: rgba(161, 161, 161, 0.88);
    opacity: 0.3;
  }

  [tabindex] {
    outline: none !important;
  }

</style>
