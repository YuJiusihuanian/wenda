<template>
  <!--<ul-->
    <!--v-infinite-scroll=""-->
    <!--infinite-scroll-disabled="loading"-->
    <!--infinite-scroll-distance="10">-->
    <!--<li v-for="item in list">{{ item }}</li>-->
    <!--<div @click="ccc">div点击</div>-->
    <!--<button @click="ccc">点击</button>-->
    <!--<a @click="ccc">a点击</a>-->
  <!--</ul>-->


</template>
<script>
  export default {
    data() {
      return {
        topStatus: '',
        selected:'',
        list:[],
        loading:false
        // ...
      };
    },
    methods: {
        ccc(){
            console.log(111);
            this.$router.push('/message');
        },
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.loading = false;
        }, 2500);
      }
      }
  };
</script>
<style scoped>
  ul{
    margin-bottom:200px;
  }
</style>
