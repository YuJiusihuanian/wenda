<template>
  <div id="Loadmore">
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
      <ul>
        <li v-for="item in list" :key="item.id">

          <router-link to="/">
            {{ topics }}
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
        topics:{},
        index:{},
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
        console.log('111');
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
        this.list=50;
        //加载完成
        this.$refs.loadmore.onTopLoaded();
      },
      getTopics(tab){
        this.$ajax({
          method: 'get',
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
          if (response && response.data && response.data.data) {
              console.log(response.data.data);
            response.data.data.forEach(this.mergeTopics);
          }
        })
          .catch(function (error) {
//                console.log(error);
          })
      },
      mergeTopics(topic) {
          console.log(topic);
        if (typeof this.index[topic.id] === 'number') {
          const topicsIndex = this.index[topic.id];
          this.topics[topicsIndex] = topic;
        } else {
          this.index[topic.id] = this.topics.length;
          this.topics.push(topic);
        }
      },
    },
    watch:{
      $route (to , from){
          if(to.query.tab){
              this.topicarg.tab = to.query.tab;
          }else{
            this.topicarg.tab = 'all'
          }
          this.topicarg.page = 1;
          this.getTopics();
        console.log(this.topicarg.tab);
        console.log(this);
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
