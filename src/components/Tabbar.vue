<template>
    <mt-tabbar v-model="selected" id="Tabbar" :fixed=true>
        <mt-tab-item href="#/home" id="1">
          <img v-show="this.$route.name ==='Home'" slot="icon" src="../assets/svg/home.svg">
          <img v-show="this.$route.name !== 'Home'" slot="icon" src="../assets/svg/home-hover.svg">
          首页
        </mt-tab-item>
        <mt-tab-item  href="#/publish" id="2">
          <img v-show="this.$route.name === 'Publish'" slot="icon" src="../assets/svg/publish.svg">
          <img v-show="this.$route.name !== 'Publish'" slot="icon" src="../assets/svg/publish-hover.svg">
          发表
        </mt-tab-item>
        <mt-tab-item  href="#/message" id="3">
          <img v-show="this.$route.name === 'Message'" slot="icon" src="../assets/svg/message.svg">
          <img v-show="this.$route.name !== 'Message'" slot="icon" src="../assets/svg/message-hover.svg">
          消息
        </mt-tab-item>
        <mt-tab-item  href="#/more" id="4">
          <img v-show="this.$route.name === 'More' ||　this.$route.name === 'User'" slot="icon" src="../assets/svg/more.svg">
          <img v-show="this.$route.name != 'More' &&　this.$route.name != 'User'" slot="icon" src="../assets/svg/more-hover.svg">
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
      mounted(){
          if(this.$route.path){
              console.log(this.$route.name);
    }
      },
      methods:{

      },
      watch:{
//        selected:function(str){
//            if(str){
//                switch(str){
//                  case '首页':this.$router.push('/home');
//                  break;
//                  case '发表':this.$router.push('/publish');
//                    break;
//                  case '消息':this.$router.push('/message');
//                    break;
//                  case '我的':this.$router.push('/more');
//                    break;
//                }
//            }
//        }
      }
    }

</script>

<style lang="less" scpoed>
  @import '../less/common.less';
  #Tabbar a{
    color:#8a8a8a;
    font-size:0.3rem;
    background-color:#fff !important;
  }
  .mint-tab-item .mint-tab-item-icon{
    width:0.40rem !important;
    height:0.40rem !important;
  }
  .mint-tab-item-label{
    font-size:0.32rem !important;
  }
</style>
