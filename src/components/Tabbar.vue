<template>
    <mt-tabbar v-model="selected" id="tabbar" :fixed=true>
        <mt-tab-item id="首页">
          <img v-show="this.$route.path ==='/home'" slot="icon" src="../assets/svg/home.svg">
          <img v-show="this.$route.path !=='/home'" slot="icon" src="../assets/svg/home-hover.svg">
          首页
        </mt-tab-item>
        <mt-tab-item  id="发表">
          <img v-show="this.$route.path === '/publish'" slot="icon" src="../assets/svg/publish.svg">
          <img v-show="this.$route.path !== '/publish'" slot="icon" src="../assets/svg/publish-hover.svg">
          发表
        </mt-tab-item>
        <mt-tab-item  id="消息">
          <img v-show="this.$route.path === '/message'" slot="icon" src="../assets/svg/message.svg">
          <img v-show="this.$route.path !== '/message'" slot="icon" src="../assets/svg/message-hover.svg">
          消息
        </mt-tab-item>
        <mt-tab-item  id="我的">
          <img v-show="this.$route.path === '/more'" slot="icon" src="../assets/svg/more.svg">
          <img v-show="this.$route.path !== '/more'" slot="icon" src="../assets/svg/more-hover.svg">
          我的
        </mt-tab-item>
    </mt-tabbar>
</template>

<script>
    export default{
      name:'Tabbar',
      data(){
          return{
            selected:'',
            fixed:true,
            selected:''
        }
      },
      methods:{

      },
      watch:{
        selected:function(str){
            if(str){
                switch(str){
                  case '首页':this.$router.push('/home');
                  break;
                  case '发表':this.$router.push('/publish');
                    break;
                  case '消息':this.$router.push('/message');
                    break;
                  case '我的':this.$router.push('/more');
                    break;
                }
            }
        }
      }
    }

</script>

<style lang="less">
  @import '../less/common.less';
  #tabbar a{
    color:#8a8a8a;
    font-size:0.3rem;
  }
  .mint-tab-item .mint-tab-item-icon{
    width:0.40rem !important;
    height:0.40rem !important;
  }
  .mint-tab-item-label{
    font-size:0.32rem;
  }
</style>
