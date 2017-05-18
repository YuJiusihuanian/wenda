<template>
  <div id="Index">
  </div>
</template>

<script>
//  import Tabbar from './components/Tabbar'
//  import Navbar from './components/Navbar'
  export default {
  name: 'Index',
//  components:{
//    't-abbar':Tabbar,
//    'n-avbar':Navbar,
//  },
  mounted(){
      setTimeout(() => {
          this.$router.push({
            name:'Home',
          });
      },3000);
  }
}
</script>

<style lang="less">
  @import 'less/common.less';
  body{
    background:url(./assets/gif/login.gif) no-repeat center;
    background-size:2rem 2rem;
  }
</style>
