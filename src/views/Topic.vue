<template>
  <div id="Topic">
    <div class="header"></div>
    <div class="content" v-if="topic.title">
      <div :class="{scrolltop : scroll}" class="head">
        <h4 v-text="topic.title"></h4>
        <div class="authorInfo">
          <img :src="topic.author.avatar_url" alt="">
          <div class="info">
          <div class="infoname"><span>{{topic.author.loginname}}</span></div>
            <div class="infotime"><time>
                {{topic.create_at | getLastTimeStr(true)}}
            </time>
            </div>
            <div class="infopeople">
              <span :class="getTabInfo(topic.tab, topic.good, topic.top, true)" v-text="getTabInfo(topic.tab, topic.good, topic.top, false)"></span>
              <span>{{topic.reply_count}}/{{topic.visit_count}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="markdown-body article" v-html="topic.content"></div>
      <div class="markdown-body reply">
        <h3>评论 <strong>{{topic.reply_count}}</strong></h3>
          <ul>
            <li v-for="(item,key) in topic.replies">
              <div class="infoimg">
                <p>{{key+1}}楼</p>
                <router-link :to="{name:'User',params:{loginname:item.author.loginname}}">
                  <img :src="item.author.avatar_url" alt="">
                </router-link>
              </div>
                <div class="infoall">
                  <div class="infoname">
                    <span v-text="item.author.loginname"></span>
                    <span>{{item.create_at | getLastTimeStr(true)}}</span>
                  </div>
                  <div class="infocontent">
                    <div class="content" v-html="item.content"></div>
                  </div>
                  <div class="infouse">
                    <span>
                      <img v-if="!inArray(userInfo.userId,item.ups,true)" @click="upGood(item)" src="../assets/svg/good.svg" alt="">
                      <img v-if="inArray(userInfo.userId,item.ups,true)" @click="upGood(item)" src="../assets/svg/good-hover.svg" alt=""> {{item.ups.length}}
                    </span>
                    <span>
                      <img @click="addReply(key)" src="../assets/svg/reply.svg" alt="">
                    </span>
                  </div>
                </div>
              <div class="reply" v-show="show === key">
                <mt-field v-model="replycontent" class="content" placeholder="请输入发表的内容" type="textarea" rows="10"></mt-field>
                <mt-button @click="Replybtn(topic.replies[key],topic.replies)" size="normal" class="loginbtn" type="default">回复</mt-button>
              </div>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import utils from '../lib/utils.js'
    import { mapGetters } from 'vuex'
    var qs = require('qs');
    export default{
      name: 'Topic',
      data(){
          return{
            msg:111,
            topic:{},
            topicId:'',
            noData:false,
            scroll:false,
            curReplyId: '',
            replycontent:'',
            show:'',
            replyId:'',
            addtext:'<a>来自vue-wenda</a>'
          }
      },
      computed: {
        ...mapGetters({
          userInfo: 'getUserInfo'
        })
      },
      created(){
          //监听滚动条
          this.$nextTick(function () {
            window.addEventListener('scroll', this.onScroll)
          })
      },
      mounted(){
        this.topicId = this.$route.params.id;
        this.$ajax({
            method: 'get',
            url:'https://cnodejs.org/api/v1/topic/' + this.topicId
          })
            .then(function(response){
//                console.log(response.data.data);
                if(response.data.data){
                  this.topic = response.data.data;
//                  console.log(this.topic);
                }else{
                  this.noData = true;
                }
            }.bind(this))
      },
      methods:{
        inArray(needle,array,bool){
          if(typeof needle=="string"||typeof needle=="number"){
            for(var i in array){
              if(needle===array[i]){
                if(bool){
                  return i;
                }
                return true;
              }
            }
            return false;
          }
        },
        getTabInfo(tab, good = false, top, isClass) {
          return utils.getTabInfo(tab, good, top, isClass);
        },
        getLastTimeStr(time, ago) {
          return utils.getLastTimeStr(time, ago);
        },
        onScroll(){
            let scrolltop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
              if( scrolltop > 200 ){
                  this.scroll = true
              }else{
                this.scroll = false
              }
        },
        upGood(item){
            if(!this.userInfo.userId){
                this.$router.push({
                  name:'More'
                })
              Toast('请先登录!')
            }else{
                let accessdata = qs.stringify({
                  accesstoken:this.userInfo.token
                });
                this.$ajax({
                  method:'post',
                  url:'https://cnodejs.org/api/v1/reply/' + item.id +'/ups',
                  data:accessdata
                }).then(function(res){
                    console.log(res);
                    if(res.data.success){
                        if(res.data.action === 'down'){
                            let index = this.inArray(this.userInfo.userId,item.ups,true);
                            item.ups.splice(index, 1);
                        }else if(res.data.action === 'up'){
                            item.ups.push(this.userInfo.userId);
                        }
                    }
                }.bind(this)).catch(function(error){
                  if(error.response){
                    Toast(error.response.data.error_msg);
                  }
                })
            }
        },
        Replybtn(key,replies){
//          console.log(replies);
//          console.log(replies.id);
            let id = key.id;
            let time = new Date();
            let data = {
              accesstoken:this.userInfo.token,
              content:this.replycontent + this.addtext,
              reply_id:id
            }
            let postData = qs.stringify(data);
            this.$ajax({
              method:'post',
              url:'https://cnodejs.org/api/v1/topic/' + this.topicId + '/replies',
              data:postData
            }).then(function(res){
//                console.log(res);
                if(res.data.success){
                  console.log(res);
                  console.log(replies);
                  replies.push({
                    id:res.data.reply_id,
                    author:{
                        loginname:this.userInfo.loginname,
                        avatar_url:this.userInfo.avatar_url
                    },
                    content:this.replycontent,
                    ups:[],
                    create_at:time
                  });
                }
                //清空
                this.replycontent = '';
                this.show = -1;
            }.bind(this)).catch(function(error){
              if(error.response){
                Toast(error.response.data.error_msg);
              }
            })
        },
        addReply(key){
          if(!this.userInfo.userId){
            this.$router.push({
              name:'More'
            })
            return Toast('请先登录!')
          }else{
              if(key === this.show){
                  this.show = -1;
              }else{
                this.show = key;
                this.replycontent = '';
                this.replyId = this.topic.replies[key].id;
                console.log(this.replyId);
              }
          }
        }
      },
      watch:{

      }

    }
</script>
<style lang="less" scoped>
  @import '../less/github-markdown.css';
  #Topic{
    background:#fff;
    width:100%;
    font-size:0.28rem;
    height:100%;
  }
  #Topic .head{
    position:fixed;
    width:100%;
    opacity:1;
    transition:1s;
    z-index:9999999;
  }
  #Topic .scrolltop{
    opacity:0.8;
    transition:1s;
  }
  #Topic .scrolltop .authorInfo{
    height:0.6rem;
    justify-content: center;
    transition:1s;
  }
  #Topic .scrolltop .authorInfo img{
    width:0.5rem;
    height:0.5rem;
    transition:1s;
  }
  #Topic .scrolltop .authorInfo .info{
    flex-direction:row;
    height:0.5rem;
    justify-content:space-between;
    display:none;
    transition:5s;
  }
  #Topic h4{
    font-size:0.32rem;
    text-align:center;
    background-color:#FDDF6D;
    padding:0;
    color:#1e1e1e;
    padding:0 0.3rem;
  }
  #Topic .authorInfo{
    display:flex;
    justify-content:space-around;
    background-color:#FDDF6D;
    height:1.1rem;
    margin-bottom:1rem;
    transition:1s;
  }
  #Topic .authorInfo img{
    width:1rem;
    height:1rem;
    border-radius:50%;
    transition:1s;
  }
  #Topic .authorInfo .info{
    display:flex;
    flex-direction:column;
    height:1rem;
    align-items: center;
    justify-content: center;
    color:#8a8a8a;
    transition:1s;
    text-align:center;
  }
  #Topic .authorInfo .infoname{
    font-size:0.2rem;
  }
  #Topic .authorInfo .infotime{
    font-size:0.2rem;
  }
  #Topic .authorInfo .infopeople{
    font-size:0.2rem;
  }
  #Topic .article{
    width:90%;
    margin:0 auto;
    padding-bottom:1rem;
    color:#1e1e1e;
    font-size:0.24rem;
    padding-top:2.5rem;
  }
  #Topic .reply{
    font-size:0.24rem;
    margin:0 auto;
    width:100%;
    height:100%;
  }
  #Topic .reply h3{
    width:100%;
    margin:0 auto;
    padding:0.4rem 0;
    text-align:center;
    border-bottom:1px solid #ccc;
  }
  #Topic .reply h3 strong{
    font-weight: 800;
    color:#000;
  }

  #Topic .reply ul{
    padding-left:0;
    width:100%;
    height:100%;
  }
  #Topic .reply li{
    width:100%;
    border-bottom:1px solid #ccc;
    margin:0 auto;
    height:100%;
    padding:0.2rem 0;
  }
  #Topic .reply .info{
    position:relative;
    height:2rem;
    height:100%;
  }
  #Topic .reply .infoimg{
    padding:0rem 5% 0 5%;
    display:inline-block;
  }
  #Topic .reply .infoimg p{
    text-align:center;
    font-size:0.18rem;
    color:#ccc;
  }
  #Topic .reply .infoimg img{
    border-radius:50%;
    width:0.8rem;
    height:0.8rem;
  }
  #Topic .reply .infoall{
    width:74%;

    display:inline-block;
  }
  #Topic .reply .infoname{
    font-size:0.24rem;
    display:flex;

    justify-content:space-between;

  }
  #Topic .reply .infouse{
    display:flex;
    justify-content:space-between;
  }
  #Topic .reply .infouse img{
    width:0.3rem;
    height:0.3rem;
  }
</style>
