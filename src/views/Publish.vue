<template>
  <div id="Publish">
    <div @click="addTopic" class="addtitle" >点击发表</div>
    <mt-field calss="title" placeholder="请输入标题" v-model="topic.title"></mt-field>
    <mt-picker :itemHeight=50 class="picker" :slots="slots" @change="onValuesChange"></mt-picker>
    <mt-field class="content" placeholder="请输入发表的内容" type="textarea" rows="35" v-model="topic.content"></mt-field>
    <t-abbar></t-abbar>
  </div>
</template>
<script>
  var qs = require('qs');
  import { Toast } from 'mint-ui';
  import { mapGetters } from 'vuex'
  import Tabbar from '../components/Tabbar.vue'
  export default{
    name:'Publish',
    components:{
      't-abbar':Tabbar,
    },
    data(){
      return{
        topic: {
          tab: 'ask',
          title: '',
          content: '',
          vs:'<p>from vue-wenda</p>'
        },
        err:'',
        slots: [
          {
            flex: 1,
            values: ['分享', '问答', '招聘'],
            className: 'slot1',
          }
//          , {
//            divider: true,
//            content: '-',
//            className: 'slot2'
//          }, {
//            flex: 1,
//            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
//            className: 'slot3',
//            textAlign: 'left'
//          }
        ]
      }
    },
    computed:{
      ...mapGetters({
        userInfo:'getUserInfo'
      })
    },
    methods:{
        addTopic(){
          if(!this.userInfo.loginname){
            Toast({
              message:'请先登陆！',
              className:'toast'
            })
            this.$router.push({
              name:'More'
            })
            return false;
          }

          let title = this.topic.title;
          let contents = this.topic.content;

          if(!title){
            Toast({
              message:'标题不能为空！',
              className:'toast'
            })
              return false;
          }else if(!contents){
            Toast({
              message:'内容不能为空！',
              className:'toast'
            })
              return false;
          }
          let data = {
              title:this.topic.title,
              tab:this.topic.tab,
              content:this.topic.content + this.vs,
              accesstoken:this.userInfo.token
          }
          let addData = qs.stringify(data);
          this.$ajax({
            method: 'POST',
            responseType: 'json',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            url:'https://cnodejs.org/api/v1/topics',
            //            QS.stringify(data)
            data:addData

          }).then(function(res){
              if(res.data.success){
                  this.$router.push({
                    name:'Home'
                  })
              }
          }.bind(this)).catch(function(error){
            if(error.data.response){
              Toast({
                message:error.data.response.data.error_msg,
                className:'toast'
              })
            }
            return false;
          })
        },
        onValuesChange(picker, values) {
          if (values[0] > values[1]) {
            picker.setSlotValue(1, values[0]);
          }
          if(values[0]){
              var tab = '';
              switch(values[0]){
                case '分享': tab ='share';
                break;
                case '问答': tab ='ask';
                  break;
                case '招聘': tab ='job';
                  break;
              }
          }
          this.topic.tab = tab;
        },

  }
  }
</script>
<style lang="less">
  #Publish{
    width:100%;
    height:100%;
    background-color:#fff;
    padding-bottom:1.5rem;
  }
  #Publish .head{
    height:0.8rem;
    background:#FDDF6D;
  }
  #Publish .head .mint-header-title{
    font-size:0.36rem;
  }
  #Publish .mint-cell-value .mint-field-core{
    font-size:0.32rem !important;
    border:1px solid #FDDF6D;
    border-radius:5px;
    margin-top:0.3rem;
    font-size:0.32rem;
    padding:0.2rem 0;
  }

  #Publish .selecttitle{
    font-size:0.32rem;
    text-align:center;
  }
  #Publish .picker{
    /*background-color:#FDDF6D;*/
    text-align:center;
    margin:0 auto;
  }
  #Publish .picker .picker-item{
    font-size:0.32rem;
  }
  #Publish .picker .picker-selected{
    color:#FDDF6D;
  }
  #Publish .content{
    border:1px #FDDF6D;
  }
  #Publish .content{
    margin-bottom:1rem;
  }
  #Publish .addbtn{
    width:100%;
    background:#FDDF6D;
    border:0;
    font-size:0.32rem;
    height:0.8rem;
    margin-top:0 !important;
    padding-top:0 !important;
  }
  #Publish .addtitle{
    width:100%;
    text-align:center;
    font-size:0.38rem;
    background:#FDDF6D;
    padding:0.26rem 0;
    color:#8a8a8a;
  }
  #Publish .toast span{
     font-size:0.32rem !important;
   }
</style>


