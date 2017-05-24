<template>
  <div id="Message">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">选项一</mt-tab-item>
      <mt-tab-item id="2">选项二</mt-tab-item>
      <mt-tab-item id="3">选项三</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-cell :key="n.id"　v-for="n in 10" :title="'内容 ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell :key="n.id" v-for="n in 4" :title="'测试 ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell :key="n.id" v-for="n in 6" :title="'选项 ' + n" />
      </mt-tab-container-item>
    </mt-tab-container>
    <t-abbar></t-abbar>
  </div>
</template>
<script>
  import Tabbar from '../components/Tabbar.vue'
  import Loadmore from '../components/Loadmore.vue'
  import { mapGetters } from 'vuex'
  import { Toast } from 'mint-ui';
  export default{
    name:'Message',
    data(){
      return{
        selected:''
      }
    },
    components:{
      't-abbar':Tabbar,
      'l-oadmore':Loadmore
    },
    computed:{
      ...mapGetters({
        userInfo:'getUserInfo'
      })
    },
    mounted(){
      if(!this.userInfo.loginname){
        Toast('请先登录!');
        this.$router.push({
          name:'More'
        })
      }
      this.$ajax({
        method: 'get',
        responseType: 'json',
        url: 'https://cnodejs.org/api/v1/topics',
      })
  },
    mothods:{

    }
  }
</script>
<style lang="less" scoped>
</style>


