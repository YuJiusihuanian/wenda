<template>
  <div id="Loadmore">
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="30">
        <li class="topic" v-for="item in topics" :key="item.id">
          <router-link :to="{name:'Topic',params:{id:item.id}}">
            <div class="img">
              <img class="head" :src="item.author.avatar_url" alt="">
            </div>
            <div class="content">
              <div class="info">
                <h3 v-text="item.title"></h3>
                <p class="tabinfo">
                  <span class="status">
                    {{item.reply_count}}
                    /{{item.visit_count}}
                  </span>
                  <span class="tabtopgood">
                    <span v-if="item.tab" :class="getTabInfoTab(item.tab,true)" v-text="getTabInfoTab(item.tab,false)"></span>
                    <span v-if="item.top" :class="getTabInfoTop(item.top,true)" v-text="getTabInfoTop(item.top,false)"></span>
                    <span v-if="item.good" :class="getTabInfoGood(item.good,true)" v-text="getTabInfoGood(item.good,false)"></span>
                  </span>
                  <time class="time">{{item.last_reply_at | getLastTimeStr(true)}}</time>
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    <!--<img v-show="this.topicarg.page!=1" class="loginimg" src="../assets/gif/login-min.gif" alt="">-->
  </div>
</template>
<script>
  import utils from '../lib/utils.js'
  export default {
    data() {
      return {
        topStatus: '',
        topics: [],
        index: {},
        hide:'hide',
        loading:false,
        loginimg:false,
        topicarg:{
          page:1,
          tab:'all',
          limit:20,
          mdrender:true

        }
      };
    },
    created(){

    },
    mounted(){
      if(this.$route.query && this.$route.query.tab){
        this.topicarg.tab = this.$route.query.tab;
      }
      if (window.window.sessionStorage.topicarg && window.window.sessionStorage.tab === this.topicarg.tab) {
        this.topics = JSON.parse(window.window.sessionStorage.topics);
        this.topicarg = JSON.parse(window.window.sessionStorage.topicarg);
//        this.$nextTick(() => $(window).scrollTop(window.window.sessionStorage.scrollTop));
      } else {
        this.getTopics();
      }
    },
//    beforeRouteEnter (to, from, next) {
////        console.log(from.name);
//      if (from.name !== 'topic') {
//        // 页面切换移除之前记录的数据集
////        console.log(window.window.sessionStorage.tab);
//        if (window.window.sessionStorage.tab) {
//          window.window.sessionStorage.removeItem('topics');
//          window.window.sessionStorage.removeItem('topicarg');
//          window.window.sessionStorage.removeItem('tab');
//        }
//      }
//      next();
//    },
    methods: {

      loadMore() {
        this.loading = true;
        this.loginimg = true;
        setTimeout(() => {
          this.topicarg.page += 1;
          this.getTopics();
          this.loading = false;
//          this.loginimg = false;
        }, 2500);
      },
      getTopics(tab){
        this.$ajax({
          method: 'get',
          responseType: 'json',
          url: 'https://cnodejs.org/api/v1/topics',
          data: {},
          //请求参数
          params: {
            //页数
            page: this.topicarg.page,
            //主题分类
            tab: this.topicarg.tab,
            //每一页主题数量
            limit: this.topicarg.limit,
            //是否支持markdown格式文本
            mdrender: this.topicarg.mdrender
          }

        }).then(function (response) {
          let topics = {
            date: response.data.data[0].content,
            length: response.data.length,
          }
          if ( response.data && response.data.data) {
            response.data.data.forEach(this.mergeTopics);

          }
        }.bind(this))
      },
      mergeTopics(topic) {
        this.index[topic.id] = this.topics.length;
        this.topics.push(topic);
      },
      getTitles(tab){
          let str = '';
          switch(tab){
            case 'share' : str = '分享';
            break;
            case 'ask' : str = '问答';
            break;
            case 'job' : str = "招聘";
            break;
            case 'good' : str ='精华';
            break;
            default: str = '全部';
            break;
          }
      },
      getTabInfo(tab, good = true, top, isClass) {
        return utils.getTabInfo(tab, good, top, isClass);
      },
      getLastTimeStr(time, ago) {
        return utils.getLastTimeStr(time, ago);
      },
      getTabInfoTab(tab,isClass){
        return utils.getTabInfoTab(tab, isClass);
      },
      getTabInfoGood(good,isClass){
          return utils.getTabInfoGood(good,isClass);
      },
      getTabInfoTop(top,isClass){
          return utils.getTabInfoTop(top,isClass);
      }
    },
    watch:{
      '$route' (to , from){
          if(to.query.tab){
              this.topicarg.tab = to.query.tab;
              this.topics = [];
              this.index = {};
          }else{
            this.topicarg.tab = 'all';
            this.topics = [];
            this.index = {};
          }
          this.topicarg.page = 1;
          this.getTopics();
      }
    }

  };
</script>
<style lang="less" scoped>
  #Loadmore{
    background:#fff;
    width:100%;
    height:100%;
    margin-bottom:1rem;
    font-size:0.24rem;
    margin-top:0.6rem;
  }
  #Loadmore .topic{
    width:100%;
    height:1.4rem;
    position:relative;
    margin-bottom:0.1rem;
    border-bottom:1px solid #ccc;
    width:100%;
  }
  #Loadmore .topic a{
    width:100%;
    height:1rem;
  }
  #Loadmore h3{
    font-size:28px;
    color: #1e1e1e;
    /*color: #d6bf5f;*/
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  #Loadmore .topic .img{
    width:20%;
    height:100%;
    position:absolute;
  }
  #Loadmore .topic img.head{
    position:absolute;
    left:50%;
    margin-left:-0.4rem;
    border-radius:50%;
    height:0.8rem;
    width:0.8rem;
    top:50%;
    margin-top:-0.4rem;
  }
  #Loadmore .topic .content{
    left:23%;
    top:50%;
    position:absolute;
    margin-top:-0.4rem;
    width:72%;
    height:0.8rem;
  }
  #Loadmore .mint-loadmore-top span{
    font-size:0.2rem;
    color:#666;
  }
  #Loadmore .ask,#Loadmore .job,#Loadmore .share{
    font-size:0.18rem;
  }

  #Loadmore .tabinfo{
    padding-top:0.1rem;
    display: inline-flex;
    width:100%;
    justify-content:space-between;
  }
  #Loadmore .status{
    box-flex:1;
  }
  #Loadmore .rabtopgood{
    box-flex:1;
  }
  #Loadmore .time{
    box-flex:1;
    box-flex:1;

  }
  #Loadmore .loginimg{
    width:1rem;
    height:1rem;
    position:absolute;
    left:50%;
    margin-left:-0.5rem;
  }

</style>
