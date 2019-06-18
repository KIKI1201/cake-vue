<template>
  <div>
    <lay_head :selected="selected" :tabs='tabs' v-if="$route.path!=='/show'"></lay_head>
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
    <priceDescription></priceDescription>
  </div>

</template>

<script>
import lay_head from "@/components/layout/lay_head";
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected:this.id,//此处有错误
      tabs:[
        require("../assets/foot-menu-a-2.png"),
        require("../assets/foot-menu-b-2.png"),
        require("../assets/foot-menu-c-2.png"),
        require("../assets/foot-menu-d-2.png")
      ]
    }
  },
  mounted(){
    this.$eventHub.$on("sub",(val)=>{
      console.log(val)
    })
  },
  components:{
    lay_head
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


