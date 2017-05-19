<template>
  <div id="More">
    <t-abbar></t-abbar>
    <demo></demo>
  </div>
</template>
<script>
  import Tabbar from '../components/Tabbar.vue'
  import demo from '../components/demo.vue'
  export default{
    name:'More',
    components:{
      't-abbar':Tabbar,
      'demo':demo
    }
  }
</script>
<style lang="less" scoped>
</style>


