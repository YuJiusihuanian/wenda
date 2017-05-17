<template>
  <div id="Loadmore">
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
      <ul>
        <li v-for="item in list" :key="item.id">
          <router-link to="/home">
            {{ item }}
          </router-link>
        </li>
        <button @click="getTopics">加载数据</button>
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
        topicarg:{
          page:4,
          tab:'all',
          limit:20,
          mdrender:true

        }
      };
    },
    methods: {
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop() {
      // 加载更多数据
        this.list=50;
        //加载完成
        this.$refs.loadmore.onTopLoaded();
      },

      getTopics(tab){
          this.$ajax({
            method:'get',
            url:'https://cnodejs.org/api/v1/topics',
            data:{
            },
            //请求参数
            params:{
              //页数
              page:this.topicarg.page,
              //主题分类
              tab:this.topicarg.tab,
              //每一页主题数量
              limit:this.topicarg.limit,
              //是否支持markdown格式文本
              mdrender:this.topicarg.mdrender
            }

          }).then(function(response){
            console.log(response);
            console.log(url);
              let topics = {
                date:response.data.data[0].content,
                length:response.data.length,
              }
                console.log(url);
//              console.log(response.data.data[0].limit);
            if (response && response.data) {
              response.data.data.forEach(function(e){
//                console.log(e.title);
              });
            }
//            console.log(response);
            })
            .catch(function(error){
//                console.log(error);
            })
      }
    },

  };
</script>
<style lang="less" scoped>
  @import '../less/config.less';
  #Loadmore{
    background:#fff;
    width:100%;
    height:100%;
    margin-top:46/@font;
    margin-bottom:55/@font;
  }
</style>
