<template>
  <div class="view-image" v-if="detail.style!=undefined" @keyup.delete="del(detail)">
      <template v-if="imageURL !== ''">
        <img :width="imageStyles.width" :height="imageStyles.height" :src="detail.style.url" @dragstart.prevent @dragover.prevent @drop.prevent/>
      </template>
      <template v-else>
<!--        <i :style="{fontSize:detail.style.fontSize+'rem'}" class="iconfont" :class="detail.style.icon"></i>-->
        <img :width="imageStyles.width+'px'" :height="imageStyles.height+'px'" src="../assets/images/logo.png"/>
      </template>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'view-image',
    data () {
      return {
        url:require('../assets/images/logo.png')
      }
    },
    props: {
      detail: {
        type: Object,
        default: {}
      },
      editMode: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      imageURL: function () {
        if (this.detail.style.url == undefined || this.detail.style.url == '') {
          return '';
        } else {
          return this.detail.style.url
        }
      },
      ...mapState ([
        "imageStyles"
      ])
    },
    components: {},
    data () {
      return {}
    },
    methods: {
      del(n){
        console.log(n)
        this.$emit('remove',n);
      }
    }

  }
</script>

<style>
  .view-image {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
