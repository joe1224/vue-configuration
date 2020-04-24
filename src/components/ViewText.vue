<template>
<div class="view-text" v-if="detail.style!=undefined" :style="{
        fontSize: detail.style.fontSize + 'px',
        fontFamily: detail.style.fontFamily,
        color: detail.style.foreColor,
        textAlign: detail.style.textAlign,
        lineHeight: detail.style.lineHeight + 'px',
    }">
    {{detail.style.text}}
</div>
</template>

<script>

export default {
    name: 'view-text',
    props: {
      detail: {
        type: Object,
        default: {}
      }
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style>
.view-text {
    height: 100%;
    width: 100%;
}
</style>
