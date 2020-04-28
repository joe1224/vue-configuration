<template>
  <div>
    <div class="title-style">{{$t('message.style')}}</div>
    <el-form label-position="left" label-width="80px" class="padding-2">
      <el-form-item label="X" size="mini">
        <el-input v-model.number="initContent.x" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Y">
        <el-input v-model.number="initContent.y" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Width" size="mini">
        <el-input v-model.number="initContent.w" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Height">
        <el-input v-model.number="initContent.h" type="number"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'EditorStyle',
    data () {
      return {}
    },
    created () {

    },
    mounted () {

    },
    computed: {
      initContent () {
        let com = this.$store.state.components
        for (let i of com) {
          if (this.$store.state.switchElement == i.type) {
            return i.style
          }
        }
      },
    },
    methods: {}
  }
</script>

<style scoped>
  .title-style {
    height: 50px;
    line-height: 50px;
    color: #ffffff;
    background-color: #4a4944;
    text-align: left;
    margin-bottom: 15px;
    padding-left: 15px;
  }

  .padding-2 {
    padding: 20px;
  }
</style>
