<template>
  <div id="Home">
    <n-avbar></n-avbar>
    <l-oadmore></l-oadmore>
    <t-abbar></t-abbar>
  </div>
</template>
<script>
  import Tabbar from '../components/Tabbar';
  import Navbar from '../components/Navbar';
  import Loadmore from '../components/Loadmore.vue';
  export default{
    name:'Home',
    components:{
      't-abbar':Tabbar,
      'n-avbar':Navbar,
      'l-oadmore':Loadmore
    },
    methods:{

    }
  }
</script>
<style lang="less" scoped>


  #Home{
    width:100%;
    background-color:#fff;
  }
</style>
