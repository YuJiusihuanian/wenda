<template>
  <div id="Navbar">
    <mt-navbar v-model="selected" :fixed=true>
      <mt-tab-item class="bg" id="1"><router-link to="{'name':'list',query}">全部</router-link></mt-tab-item>
      <mt-tab-item class="bg" id="2"><router-link to="/message">精华</router-link></mt-tab-item>
      <mt-tab-item class="bg" id="3"><router-link to="/message">分享</router-link></mt-tab-item>
      <mt-tab-item class="bg" id="4"><router-link to="/message">问答</router-link></mt-tab-item>
      <mt-tab-item class="bg" id="5"><router-link to="/message">招聘</router-link></mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" :swipeable=true>
      <mt-tab-container-item id="1">

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
