<template>
<!--你好-->
  <mt-search
    v-model="value"
    cancel-text="取消"
    placeholder="搜索">
  </mt-search>

</template>

<script>
export default {
  name:'hello',
  data () {
    return {
      msg: 'hello' +
      'wodrd',
      value:''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
