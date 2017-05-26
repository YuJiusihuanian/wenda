<template>
  <div id="Index">
  </div>
</template>

<script>
  export default {
  name: 'Index',

  mounted(){
      setTimeout(() => {
          this.$router.push({
            name:'Home',
          });
      },2000);
  }
}
</script>

<style lang="less">
  @import 'less/common.less';
  body{
    background:url(./assets/gif/login4.gif) no-repeat center #fff;
    background-size:1.2rem 1.2rem;
    height:100%;
    width:100%;
    line-height:1;
  }
</style>
