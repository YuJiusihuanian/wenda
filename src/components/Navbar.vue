<template>
  <div id="Navbar">
    <mt-navbar v-model="selected" :fixed=true>
      <mt-tab-item :class="{'is-selected':!this.$route.query.tab}" id="1"><router-link class="abg" :to="{'Home':'home'}">全部</router-link></mt-tab-item>
      <mt-tab-item :class="{'is-selected':this.$route.query.tab === 'good'}" id="2"><router-link class="abg" :to="{'Home':'home',query:{tab:'good'}}">精华</router-link></mt-tab-item>
      <mt-tab-item :class="{'is-selected':this.$route.query.tab === 'share'}" id="3"><router-link class="abg" :to="{'Home':'home',query:{tab:'share'}}">分享</router-link></mt-tab-item>
      <mt-tab-item :class="{'is-selected':this.$route.query.tab === 'ask'}" id="4"><router-link class="abg" :to="{'Home':'home',query:{tab:'ask'}}">问答</router-link></mt-tab-item>
      <mt-tab-item :class="{'is-selected':this.$route.query.tab === 'job'}" id="5"><router-link class="abg" :to="{'Home':'home',query:{tab:'job'}}">招聘</router-link></mt-tab-item>
    </mt-navbar>
  </div>
</template>
<script>
  export default{
      name:'Navbar',
    data(){
          return{
            selected:'',
            value:'',
            aa:'is-selected'
          }
    },
    components:{
    },
    methods:{

    }
  }
</script>
<style lang="less" scoped>
  @import '../less/config.less';
  #Navbar{
    width:100%;
    background:#fff;
  }
  #Navbar a{
    font-size:28px;
  }
  #Navbar .mint-navbar a{
    padding:0.3rem 0;
  }
  .mint-navbar .mint-tab-item.is-selected{
    color:#FDDF6D !important;
    border-color:#FDDF6D !important;
  }
  .mint-cell{
    width:100%;
  }
  .mint-cell:first-child{
    margin-top:0.48rem;
    border-color:#fff !important;
  }
  .mint-tab-item-label a{

  }
  #Navbar .mint-navbar a.abg{
    padding:0.3rem 0.36rem;
 }
  .bg{
  }
</style>
