<template>
  <div id="Navbar">
    <mt-navbar v-model="selected" :fixed=true>
      <mt-tab-item class="bg" id="1" to="/message">全部</mt-tab-item>
      <mt-tab-item class="bg" id="2">精华</mt-tab-item>
      <mt-tab-item class="bg" id="3">分享</mt-tab-item>
      <mt-tab-item class="bg" id="4">问答</mt-tab-item>
      <mt-tab-item class="bg" id="5">招聘</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" :swipeable=true>
      <mt-tab-container-item id="1">
        <!--<l-oadmore></l-oadmore>-->
        <!--<mt-cell v-for="n in 15" :key="n" :title="'内容 ' + n + n" />-->
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <!--<l-oadmore></l-oadmore>-->
        <!--<mt-cell v-for="n in 4" :key="n" :title="'测试 ' + n" />-->
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <!--<l-oadmore></l-oadmore>-->
        <!--<mt-cell v-for="n in 10" :key="n" :title="'选项 ' + n" />-->
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <!--<l-oadmore></l-oadmore>-->
        <!--<mt-cell v-for="n in 10" :key="n" :title="'选项 ' + n" />-->
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
        <!--<l-oadmore></l-oadmore>-->
        <!--<mt-cell v-for="n in 10" :key="n" :title="'选项 ' + n" />-->
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  export default{
      name:'Navbar',
    data(){
          return{
            selected:'1',
            value:'',

          }
    },
    components:{
//      'l-oadmore':Loadmore
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
</style>
