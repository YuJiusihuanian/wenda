<template>
  <div id="User">
    <div v-if="userInfo">
      <div class="header">
        <h3>个人中心</h3>
        <!--<button @click="abc">退出登录</button>-->
        <img :src="user.avatar_url" alt="" class="userimg">
        <p class="username" v-text="user.loginname"></p>
        <!--<div class="headertext">-->
          <!--<span v-text="">2017.05-.13</span>-->
          <!--<span>积分:{{user.score}}</span>-->
        <!--</div>-->
        <mt-navbar class="listitem" v-model="selected">
          <mt-tab-item id="1">最近回复</mt-tab-item>
          <mt-tab-item id="2">最新发布</mt-tab-item>
        </mt-navbar>
      </div>
      <mt-tab-container class="list" v-model="selected">
        <mt-tab-container-item id="1">
          <ul>
          <li :key="item.id" v-for="item in recent_replies">
            <router-link class="listimg" :to="{name:'User',params:{loginname:item.author.loginname}}">
              <img :src="item.author.avatar_url" alt="">
            </router-link>
            <router-link :to="{name:'Topic',params:{id:item.id}}" class="listcontent">
              <h4 class="title">{{item.title}}</h4>
              <p class="nametime">
                <span>{{item.author.loginname}}</span>
                <span v-text="">{{item.last_reply_at | getLastTimeStr(true)}}</span>
              </p>
            </router-link>
          </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul>
            <li :key="item.id" v-for="item in recent_topics">
              <router-link class="listimg" :to="{name:'User',params:{loginname:item.author.loginname}}">
                <img :src="item.author.avatar_url" alt="">
              </router-link>
              <router-link :to="{name:'Topic',params:{id:item.id}}" class="listcontent">
                <h4 class="title">{{item.title}}</h4>
                <p class="nametime">
                  <span>{{item.author.loginname}}</span>
                  <span>{{item.last_reply_at | getLastTimeStr(true)}}</span>
                </p>
              </router-link>
            </li>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <l-ogin v-if="!userInfo"></l-ogin>
    <t-abbar></t-abbar>
  </div>
</template>
<script>
  import utils from '../lib/utils.js';
  import { Toast } from 'mint-ui';
  import Tabbar from '../components/Tabbar.vue';
  import Login from '../components/Login.vue';
  import { mapGetters , mapMutations } from 'vuex'
    export default{
        name: 'User',
      data(){
        return{
          user:{},
          recent_replies:[],
          recent_topics:[],
          selected:'1'

        }
      },
      components:{
          't-abbar':Tabbar,
          'l-ogin':Login
      },
      computed:{
        ...mapGetters({
          userInfo:'getUserInfo'
        })
      },
      mounted(){
        this.getUser();
//        if(this.userInfo.loginname){
//          this.$router.push({
//            name:'User',
//            params:{
//              loginname:this.userInfo.loginname
//            }
//          })
//        }else{
//          this.$router.push({
//            name:'More',
////            params:{
////              loginname:this.userInfo.loginname
////            }
//          })
//        }
        if(!this.$route.params.loginname){
            this.getUser();
          }
      },
      methods:{
          getUser(){
              let loginname = this.$route.params.loginname;
              if(!loginname){
                Toast({
                  message:'登录失败，请重新登录！',
                  className:'toast'
                })
                this.$router.push({
                  name:'More'
                });
                return false;
              }
            this.$ajax({
              method: 'get',
              responseType: 'json',
              url: 'https://cnodejs.org/api/v1/user/' + loginname ,
              data: {},
            }).then(function(res){
                if(res.data.data && res.data){
                  let data = res.data.data;
                  this.user = data;
                  if(data.recent_replies.length > 0){
                      this.recent_replies = data.recent_replies;
                  }
                  if(data.recent_topics.length > 0){
                      this.recent_topics = data.recent_topics;
                  }

                }
            }.bind(this))
          },
        getLastTimeStr(data,friendly){
          return utils.getLastTimeStr(data,friendly);
        },
        abc(){

        },
        ...mapMutations({
        clearUserInfo:'clearUserInfo'
      }),
      },
      watch:{
          '$route' (to,from){
              this.getUser();
          }
      }

    }
</script>
<style lang="less">
  @import '../less/common.less';
  #User{
    width:100%;
    height:100%;
    background:#fff;
    font-size:0.32rem;
  }
  #User .header{
    width:100%;
    background-color:#FDDF6D;
  }
  #User h3{
    text-align:center;
    padding:0.1rem 0;
  }
  #User .userimg{
    border-radius:50%;
    margin:0 auto;
    width:2rem;
    height:2rem;
    display:block;
  }
  #User .username{
    text-align:center;
    padding:0.1rem 0;
  }
  #User .headertext{
    width:100%;
    display:inline-flex;
    justify-content:space-around;
  }
  #User .listitem{
    background-color:#FDDF6D;
    color:#ccc;
  }
  #User .list{
    margin-top:0.05rem;
  }
  #User .list .mint-cell{
    height:1rem;
    border:5px;
  }
  #User .list span{
    font-size:0.62rem;
  }
  #User .list img{
    border-radius:50%;
    width:0.8rem;
    height:0.8rem;
  }
  #User li{
    height:1.4rem;
    display:flex;
    position:relative;
  }
  #User .listimg{
    position:absolute;
    top:50%;
    margin-top:-0.4rem;
    left:5%;
  }
  #User .listcontent{
    width:70%;
    font-size:0.30rem;
    position:absolute;
    left:25%;
    height:0.9rem;
    top:50%;
    margin-top:-0.45rem;
  }
  #User .listcontent .title{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color:#1e1e1e;
  }
  #User .listcontent .nametime{
    display:flex;
    justify-content:space-between;
    padding-top:0.1rem;
  }
  #User .listcontent span{
    font-size:0.24rem;
  }














  #User .toast span{
    font-size:0.32rem;
  }
</style>
