<template>
  <div id="Loadmore">
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
      <ul>
        <li v-for="item in topics" :key="item.id">
          <router-link to="/">
            <h3 v-text="item.title"></h3>
            <div class="content">
              <img :src="item.author.avatar_url" alt="">
              <div class="info">
                <p>
                  <span class="name">
                    {{item.author.loginname}}
                  </span>
                  <span class="status">
                    <b>{{item.reply_count}}</b>
                    /{{item.visit_count}}
                  </span>
                </p>
                <p>
                  <time>{{item.create_at}}</time>
                  <time>{{item.last_reply_at}}</time>
                </p>
              </div>
            </div>
          </router-link>
        </li>
        <button @click="getTopics">加载数据</button>
        <button @click="gettab">点击</button>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'drop' }">下拉刷新</span>
        <span v-show="topStatus === 'drop'" :class="{ 'rotate': topStatus === 'drop' }">↑</span>
        <span v-show="topStatus === 'drop'" :class="{ 'rotate': topStatus === 'drop' }">释放更新</span>
        <span v-show="topStatus === 'loading'" :class="hide">加载中...</span>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        topStatus: '',
        list:20,
        hide:'hide',
        title:{},
        topics: [],
        index: {},
        topicarg:{
          page:4,
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
    },
    beforeRouteLeave(){
    },
    methods: {

      handleTopChange(status) {
        this.topStatus = status;
      },
      gettab(){
        console.log(this.list);
      },
      loadTop() {
      // 加载更多数据
        this.getTopics();
        //加载完成
        this.$refs.loadmore.onTopLoaded();
      },
      getTopics(tab){
          let _this = this;
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
          console.log(response.data.data)
          if ( response.data && response.data.data) {
            response.data.data.forEach(_this.mergeTopics);

          }
        })
      },
      mergeTopics(topic) {
        this.index[topic.id] = this.topics.length;
        this.topics.push(topic);
        console.log(this.topics.length);
      }
    },
    watch:{
      $route (to , from){
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
        console.log(this.topics);
      }
    }

  };
</script>
<style lang="less" scoped>
  @import '../less/config.less';
  #Loadmore{
    background:#fff;
    width:100%;
    height:100%;
    /*margin-top:4px;*/
    margin-bottom:55px;
  }
</style>
