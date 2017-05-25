<template>
  <div id="More">
    <l-ogin></l-ogin>
    <t-abbar></t-abbar>
    <!--<router-view></router-view>-->
  </div>
</template>
<script>
//  import { Toast } from 'mint-ui';
  import Tabbar from '../components/Tabbar.vue'
  import Login from '../components/Login.vue'
  import { mapGetters } from 'vuex'
  export default{
    name: 'More',
    data(){
      return {
        username: '',
        token: '34d3ae05-0484-4efd-8591-f7c6512e3610'
      }
    },
    components: {
      't-abbar': Tabbar,
      'l-ogin': Login
    },
    computed:{
      ...mapGetters({
        userInfo:'getUserInfo'
      })
    },
    mounted(){
      if(this.userInfo.loginname){
        this.$router.push({
          name:'User',
          params:{
            loginname:this.userInfo.loginname
          }
        })
      }
    },
  }
</script>
<style lang="less" scoped>
  #More{
    width:100%;
    background-color:#fff;
    margin:0 auto;
    height:100%;
  }
</style>


