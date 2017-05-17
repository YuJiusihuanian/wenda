<template>
  <div id="Navbar">
    <mt-navbar v-model="selected" :fixed=true>
      <mt-tab-item :class="{'is-selected':!this.$route.query.tab}" id="1"><router-link class="abg" :to="{'Home':'home'}">全部</router-link></mt-tab-item>
      <mt-tab-item :class="{'is-selected':this.$route.query.tab === 'good'}" id="2"><router-link class="abg" :to="{'Home':'home',query:{tab:'good'}}">精华</router-link></mt-tab-item>
      <mt-tab-item :class="{'is-selected':this.$route.query.tab === 'share'}" id="3"><router-link class="abg" :to="{'Home':'home',query:{tab:'share'}}">分享</router-link></mt-tab-item>
      <mt-tab-item :class="{'is-selected':this.$route.query.tab === 'ask'}" id="4"><router-link class="abg" :to="{'Home':'home',query:{tab:'ask'}}">问答</router-link></mt-tab-item>
      <mt-tab-item :class="{'is-selected':this.$route.query.tab === 'job'}" id="5"><router-link class="abg" :to="{'Home':'home',query:{tab:'job'}}">招聘</router-link></mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <!--<mt-tab-container v-model="selected" :swipeable=true>-->
      <!--<mt-tab-container-item id="1">-->

        <!--&lt;!&ndash;<mt-cell v-for="n in 15" :key="n" :title="'内容 ' + n + n" />&ndash;&gt;-->
      <!--</mt-tab-container-item>-->
      <!--<mt-tab-container-item id="2">-->
        <!--&lt;!&ndash;<l-oadmore></l-oadmore>&ndash;&gt;-->
        <!--&lt;!&ndash;<mt-cell v-for="n in 4" :key="n" :title="'测试 ' + n" />&ndash;&gt;-->
      <!--</mt-tab-container-item>-->
      <!--<mt-tab-container-item id="3">-->
        <!--&lt;!&ndash;<l-oadmore></l-oadmore>&ndash;&gt;-->
        <!--&lt;!&ndash;<mt-cell v-for="n in 10" :key="n" :title="'选项 ' + n" />&ndash;&gt;-->
      <!--</mt-tab-container-item>-->
      <!--<mt-tab-container-item id="4">-->
        <!--&lt;!&ndash;<l-oadmore></l-oadmore>&ndash;&gt;-->
        <!--&lt;!&ndash;<mt-cell v-for="n in 10" :key="n" :title="'选项 ' + n" />&ndash;&gt;-->
      <!--</mt-tab-container-item>-->
      <!--<mt-tab-container-item id="5">-->
        <!--&lt;!&ndash;<l-oadmore></l-oadmore>&ndash;&gt;-->
        <!--&lt;!&ndash;<mt-cell v-for="n in 10" :key="n" :title="'选项 ' + n" />&ndash;&gt;-->
      <!--</mt-tab-container-item>-->
    <!--</mt-tab-container>-->
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
  .mint-navbar .mint-tab-item.is-selected{
    color:#FDDF6D !important;
    border-color:#FDDF6D !important;
  }
  .mint-cell{
    width:100%;
  }
  .mint-cell:first-child{
    margin-top:48/@font;
    border-color:#fff !important;
  }
  .mint-tab-item-label a{

  }
  .abg{
    padding:16px 20/@font 16px 20/@font;
 }
  .bg{
  }
</style>
