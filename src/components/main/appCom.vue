<template>
  <div >
    <h1>我是一个按钮</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  },
  mounted(){
    console.log(this.$route)
  }
}
</script>

<style scoped>

</style>


