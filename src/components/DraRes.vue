<template>
  <div>
    <div id="dragArea" class="page">

      <!--<div @drop="onDropImg($event)" @dragover.prevent style="height:100%;width: 100%;">
        <view-image :detail="modulesImage" @remove="remove" tabindex="1"></view-image>
      </div>-->

      <div @drop="onDropText($event)" @dragover.prevent style="height:100%;width: 100%;">
        <view-text v-for="(item,index) in modulesText" :key="index" :detail="item"
                   @remove="textRemove"
                   @activated="handlActivate(item.type)"
                   tabindex="1">
        </view-text>
      </div>

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
        itemText: {},
        modulesText: [],
        modulesImage: {},
        vLine: [],
        hLine: [],
      }
    },
    mounted () {
    },
    methods: {
      getRefLineParams (params) {
        const {vLine, hLine} = params
        this.vLine = vLine
        this.hLine = hLine
      },
      onDropImg (event) {
        event.preventDefault();
        let infoJson = event.dataTransfer.getData('my-info');
        this.modulesImage = JSON.parse(infoJson);
      },
      onDropText (event) {
        console.log(event);
        event.preventDefault();
        let infoJson = event.dataTransfer.getData('my-info');
        this.itemText = JSON.parse(infoJson);
        let component = this.itemText;
        this.modulesText.push(this.itemText);
        console.log(this.modulesText);
        this.$store.commit('components',{component});
        let x = this.itemText.style.x;
        let y = this.itemText.style.y;
        let w = this.itemText.style.w;
        let h = this.itemText.style.h;
        this.$store.commit('updateTextStyleResize',{x,y,w,h});
      },
      remove () {
        this.modulesImage = {}
      },
      handlActivate(type){
        this.$store.commit('switchStatus',type);
      },
      textRemove () {
        this.itemText = {}
      },

    },
    computed: {}
  }
</script>
<style>
  .page {
    height: 800px;
    width: 100%;
    border: 1px solid red;
    box-sizing: content-box;
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
