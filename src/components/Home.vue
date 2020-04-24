<template>
  <div>
    <el-container>
      <el-header>
        <el-row style="line-height: 68px;">
          <el-button size="mini" plain @click="leftJustify">
            <i class="iconfont icon-jurassic-left"></i>
          </el-button>
          <el-button size="mini" plain @click="rightJustify">
            <i class="iconfont icon-jurassic-right"></i>
          </el-button>
          <el-button size="mini" plain @click="bottomJustify">
            <i class="iconfont icon-jurassic-bottom"></i>
          </el-button>
          <el-button size="mini" plain @click="topJustify">
            <i class="iconfont icon-jurassic-top"></i>
          </el-button>
          <el-button size="mini" plain >
            <i class="iconfont icon-jurassic_horizalign-center"></i>
          </el-button>
          <el-button size="mini" plain>
            <i class="iconfont icon-jurassic_verticalalign-center"></i>
          </el-button>
        </el-row>
        <el-dropdown size="medium" split-button type="primary" @command="switchLang" class="res-btn">
          选择语言
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="en">English</el-dropdown-item>
            <el-dropdown-item command="cn">简体中文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside>
          <basic-list></basic-list>
        </el-aside>
        <el-main>
          <dra-res></dra-res>
        </el-main>
        <el-aside>
          <editor-style></editor-style>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import DraRes from './DraRes'
  import EditorStyle from './EditorStyle'
  import BasicList from './BasicList'
  import ViewText from './ViewText'
  import ViewImage from './ViewImage'

  export default {
    components: {
      DraRes,
      EditorStyle,
      BasicList,
      ViewText,
      ViewImage
    },
    data: function () {
      return {
        lists: {},
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      switchLang (lang) {
        this.$i18n.locale = lang
        localStorage.setItem('lang', lang)
      },
      leftJustify () {
        let textX = this.$store.state.textStyles.moveX
        let imageX = this.$store.state.imageStyles.moveX
        if (textX < imageX) {
          this.$store.state.imageStyles.moveX = textX
        } else {
          this.$store.state.textStyles.moveX = imageX
        }
      },
      rightJustify () {
        let textW = this.$store.state.textStyles.width
        let imageW = this.$store.state.imageStyles.width
        let textX = this.$store.state.textStyles.moveX + textW
        let imageX = this.$store.state.imageStyles.moveX + imageW
        if (textX > imageX) {
          this.$store.state.imageStyles.moveX = textX - imageW
        } else {
          this.$store.state.textStyles.moveX = imageX - textW
        }
      },
      bottomJustify () {
        let textH = this.$store.state.textStyles.height
        let imageH = this.$store.state.imageStyles.height
        let textY = this.$store.state.textStyles.moveY + textH
        let imageY = this.$store.state.imageStyles.moveY + imageH
        if (textY > imageY) {
          this.$store.state.imageStyles.moveY = textY - imageH
        } else {
          this.$store.state.textStyles.moveY = imageY - textH
        }
      },
      topJustify () {
        let textY = this.$store.state.textStyles.moveY
        let imageY = this.$store.state.imageStyles.moveY
        if (textY < imageY) {
          this.$store.state.imageStyles.moveY = textY
        } else {
          this.$store.state.textStyles.moveY = imageY
        }
      },
    },
    computed: {},

  }
</script>


<style scoped>
  .el-header, .el-footer {
    position: relative;
    background-color: #2080d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    width: 200px;
  }

  .el-main {
    height: 865px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .res-btn {
    position: absolute;
    top: 0;
    right: 0;
  }

  .head-font {
    margin: 10px 0;
    color: #3a8ee6;
  }

  .flex-box {
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    margin-top: 60px;
  }
</style>
