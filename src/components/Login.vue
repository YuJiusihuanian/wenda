<template>
  <div id="Login">
    <div class="login">
      <mt-field class="loginname" placeholder="Access Token" v-model="token" maxlength="36"></mt-field>
      <mt-button @click="login" size="normal" class="loginbtn" type="default">登录</mt-button>
    </div>

    <a-bout class="about"></a-bout>
  </div>
</template>
<script>
  var qs = require('qs');
  import { Toast } from 'mint-ui';
  import About from './About.vue';
    import { mapGetters , mapMutations} from 'vuex'
  export default{
    name:'Login',
    data(){
      return{
        username:'',
        token:'34d3ae05-0484-4efd-8591-f7c6512e3610'
      }
    },
    components:{
        'a-bout':About
    },
    computed:{
      ...mapGetters({
        userInfo:'getUserInfo'
      })
    },
    mounted(){
      if(this.userInfo.loginname){
        this.$router.push({
          name:'User',
          params:{
            loginname:this.userInfo.loginname
          }
        })
      }
    },

    methods:{
      //
      login(){
        if(this.token === ''){
          Toast({
            message:'请输入正确的36位Access Token',
            className:'toast',
            position:'top'
          })
          return false;
        }
        let data ={
          accesstoken:this.token
        }
        let tokendata = qs.stringify(data);
        this.$ajax({
          method:'post',
          data:tokendata,
          url:'https://cnodejs.org/api/v1/accesstoken',
        }).then(function(response){
          let user = {
            loginname:response.data.loginname,
            avatar_url:response.data.avatar_url,
            token:this.token,
            userId:response.data.id
          };
          //存储用户信息
          window.window.sessionStorage.user = JSON.stringify(user);
          //vuex载荷方式分发
          this.$store.dispatch('setUserInfo',user);
          this.$router.push({
            name:'User',
            params:{
                loginname:user.loginname
            }
          })


        }.bind(this)).catch(function(error){
          if(error.data.response){
            Toast(error.data.response.data.error_msg);
          }
        }.bind(this))
      },
    },

  }
</script>
<style lang="less">
  #Login{
    width:100%;
    background-color:#fff;
    margin:0 auto;
  }
  #Login .login{
    margin:0 auto;
    width:90%;
    padding-top:1.5rem;
    padding-bottom:1.5rem;
  }
  #Login .loginbtn{
    width:100%;
    background-color:#FDDF6D;
    font-size:0.32rem;
    height:1rem;
    margin:0 auto;
  }
  #Login .loginname{
    margin:0 auto;
    border:1px solid #FDDF6D;
    font-size:0.62rem !important;
    width:100%;
    height:1rem;
    color:#FDDF6D;
  }
  #Login .loginname .mint-field-core{
    font-size:0.32rem !important;
  }
  .mint-toast-text{
    font-size:0.32rem;
  }
  #Login .loginname .mintui-field-error{
    font-size:0.32rem;
    color:#888;
  }
</style>


