<template>
  <div id="Message">
    <l-oadmore></l-oadmore>
    <t-abbar></t-abbar>
  </div>
</template>
<script>
  import Tabbar from '../components/Tabbar.vue'
  import Loadmore from '../components/Loadmore.vue'
  export default{
    name:'Message',
    components:{
      't-abbar':Tabbar,
      'l-oadmore':Loadmore
    }
  }
</script>
<style lang="less" scoped>
</style>


