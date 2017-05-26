<template>
  <div id="Reply">
    <mt-field class="replycontent" placeholder="请输入发表的内容" v-model="content" type="textarea" rows="5"></mt-field>
    <mt-button @click="Replybtn" size="normal" class="replybtn" type="default">回复</mt-button>
  </div>
</template>
<script>
    export default{
        name: 'Reply',
      data(){
            return{
              content:''
            }
      },
      methods:{

      }
    }
</script>
<style lang="less">
  #Reply{
    width:100%;
    font-size:0.32rem;
  }
  #Reply .replybtn{
    width:100%;
    height:0.8rem;
    fint-size:0.32rem;
    background-color:#FDDF6D;
  }
  #Reply .replycontent .mint-field-core{
    font-size:0.32rem;
  }
  #Reply .replybtn .mint-button-text{
    font-size:0.32rem;
  }
</style>
