<template>
  <div id="Index">
    <!--<img class="index" src="./assets/img/logo.png">-->
    <img class="login" src="./assets/gif/login.gif" alt="加载中">
    <span class="logtext">加载中</span>
  </div>
</template>

<script>
//  require('./less/common.less');
  import Tabbar from './components/Tabbar'
  import Navbar from './components/Navbar'
  export default {
  name: 'Index',
  data(){
    bg:require('./assets/gif/login.gif')
  },
  components:{
    't-abbar':Tabbar,
    'n-avbar':Navbar,
  },
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
  @import './less/config.less';
  @import 'less/common.less';
  #Index{
    width:320/@font;
    height:568/@font;
    /*background-color:#FDDF6D;*/
    position:relative;
    background-color:#fff;
    margin:0;
    padding:0;
  }
  .index{
    position:absolute;
    left:50%;
    margin-left:-100/@font;
    width:200/@font;
    height:200/@font;
    top:100/@font;
  }
  .login{
    width:200/@font;
    height:200/@font;
    left:50%;
    margin-left:-100/@font;
    top:100/@font;
    position:absolute;
  }
  .logtext{
    text-align:center;
    position:absolute;
    top:250/@font;
    left:50%;
    font-size:14/@font;
    width:50/@font;
    margin-left:-25/@font;
    color:#ccc;
  }
  body{
    width:100%;
    height:100%;
    background-size:200/@font 200/@font;
  }
</style>
