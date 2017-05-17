<template>
    <mt-tabbar id="tabbar" :fixed=true>
        <mt-tab-item id="首页">
          <img slot="icon" src="../assets/svg/home.svg">
          <router-link :class="btnPadding" to="/home">首页</router-link>
        </mt-tab-item>
        <mt-tab-item  id="提问">
          <img slot="icon" src="../assets/svg/publish.svg">
          <router-link :class="btnPadding" to="/publish">提问</router-link>
        </mt-tab-item>
        <mt-tab-item  id="消息">
          <img slot="icon" src="../assets/svg/message.svg">
          <router-link :class="btnPadding" to="/message">消息</router-link>
        </mt-tab-item>
        <mt-tab-item  id="我的">
          <img slot="icon" src="../assets/svg/more.svg">
          <router-link :class="btnPadding" to="/more">我的</router-link>
        </mt-tab-item>
    </mt-tabbar>
</template>

<script>
    export default{
      name:'Tabbar',
      data(){
          return{
            selected:'',
            btnPadding:'btnPadding',
            fixed:true
        }
      }
    }

</script>

<style lang="less" scoped>
  @import "../less/common";
  @import "../less/config.less";
    .btnPadding{
        padding:34/@font 28/@font 6/@font 28/@font;
    }
    #tabbar a{
        color:#8a8a8a;
    }
</style>
