<template>
  <div id="Message">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">未读消息</mt-tab-item>
      <mt-tab-item id="2">已读消息</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <ul>
          <Li></Li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <ul>
          <li class="message" v-for="item in messageData">
            <router-link class="messageimg" :to="{name:'User',params:{loginname:item.author.loginname}}">
              <img :src="item.author.avatar_url" alt="">
            </router-link>
            <router-link class="messagecontent" :to="{name:'Topic',params:{id:item.topic.id}}">
              <div class="content">
                <p class="title">{{item.topic.title}}</p>
                <p class="nametime">
                  <span>{{item.author.loginname}}</span>
                  <span class="name" v-text="">{{item.reply.create_at | getLastTimeStr(true)}}</span>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
    <t-abbar></t-abbar>
  </div>
</template>
<script>
  import utils from '../lib/utils.js'
  import Tabbar from '../components/Tabbar.vue'
  import Loadmore from '../components/Loadmore.vue'
  import { mapGetters } from 'vuex'
  import { Toast } from 'mint-ui';
  export default{
    name:'Message',
    data(){
      return{
        selected:'1',
        messageData:[],
        notMessageData:[]
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
        url: 'https://cnodejs.org/api/v1/messages?accesstoken=' + this.userInfo.token,
      }).then(function(res){
          if(res.data.data.has_read_messages.length > 0){
            this.messageData = res.data.data.has_read_messages;
          }
          if(res.data.data.hasnot_read_messages.length > 0){
            this.notMessageData = res.data.data.has_read_messages;
          }
      }.bind(this))
  },
    mothods:{
      getLastTimeStr(date, friendly) {
        return utils.getLastTimeStr(date, friendly);
      }
    }
  }
</script>
<style lang="less">
  #Message{
    width:100%;
    height:100%;
    background-color:#fff;

  }
  #Message .is-selected{
    color:#FDDF6D !important;
    border-color:#FDDF6D
  }
  #Message .message{
    position:relative;
    height:1.4rem;
    font-size:0.32rem;
    width:100%;
    border-bottom:1px solid #ccc;
  }
  #Message .messageimg{
    position:absolute;
    left:0.3rem;
    margin-top:-0.4rem;
    top:50%;
  }
  #Message .messageimg img{
    width:0.8rem;
    height:0.8rem;
    border-radius:50%;

  }
  #Message .message .messagecontent{
    position:absolute;
    width:78%;
    left:20%;
    height:0.8rem;
    font-size:0.24rem;
    top:50%;
    margin-top:-0.4rem;
  }
  #Message .message .title{
    font-size:0.32rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color:#1e1e1e;
  }
  #Message .message .nametime{
    display:flex;
    justify-content:space-between;
  }
</style>


