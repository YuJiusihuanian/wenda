<template>
  <div id="Topic">
    <div class="header"></div>
    <div class="content" v-if="topic.title">
      <h4 v-text="topic.title"></h4>
      <div class="authorInfo">
        <img :src="topic.author.avatar_url" alt="">
        <div>
          <span>{{topic.author.loginname}}</span>
          <time>
            发布于{{topic.create_at | getLastTimeStr(true)}}
          </time>
          <span v-text="getTabInfo(topic.tab, topic.good, topic.top, false)"></span>
          <span>{{topic.reply_count}}/{{topic.visit_count}}</span>
        </div>
      </div>
      <div class="article" v-html="topic.content">

      </div>
      <h4><strong>{{topic.reply_count}}</strong>回复</h4>
      <div>
        <ul>
          <li v-for="item in topic.replies">
            <div class="info">
            <router-link to="/home">
              <img :src="item.author.avatar_url" alt="">
            </router-link>
              <span v-text="item.author.loginname"></span>
              <span>{{item.create_at | getLastTimeStr(true)}}</span>
            </div>
            <div class="content" v-html="item.content">

            </div>
            <span>{{item.ups.length}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
    import utils from '../lib/utils.js'
    export default{
      name: 'Topic',
      data(){
          return{
            msg:111,
            topic:{},
            topicId:'',
            noData:false
          }
      },
      mounted(){
          this.topicId = this.$route.params.id;
          let _this =this;
          this.$ajax({
            method: 'get',
            url:'https://cnodejs.org/api/v1/topic/' + this.topicId
          })
            .then(function(response){
                if(response.data.data){
                  _this.topic = response.data.data;
                  console.log(_this.topic);
                }else{
                  _this.noData = true;
                }
            })
      },
      methods:{
        getTabInfo(tab, good = false, top, isClass) {
          return utils.getTabInfo(tab, good, top, isClass);
        },
        getLastTimeStr(time, ago) {
          return utils.getLastTimeStr(time, ago);
        },

      }

    }
</script>
<style lang="less" scoped>
  #Topic{
    background:#fff;
    width:100%;
    font-size:28px;
  }
</style>
