<template>
  <div class="lay_head">

    <template>
      <mt-tabbar v-model="message" fixed>
        <mt-tab-item id="home_page">
          <img slot="icon" :src="this.atabs[0]">
        </mt-tab-item>
        <mt-tab-item id="classify">
          <img slot="icon" :src="this.atabs[1]">
        </mt-tab-item>
        <mt-tab-item id="car">
          <img slot="icon" :src="this.atabs[2]">
        </mt-tab-item>
        <mt-tab-item id="info">
          <img slot="icon" :src="this.atabs[3]">
        </mt-tab-item>
      </mt-tabbar>
    </template>


    <div class="lay_head-num" v-show="ne">{{ne}}</div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

      //选中的tabbar值message为外面页面传入的值selected
      message:this.selected,
      //这里使用的icon图标为图片，所以需要加图片改变的传入，若使用阿里图标，则不用加
      atabs:this.tabs,

      ne: this.$store.state.shopCart["N"],
      hd:false
    }
  },
  props:{
    selected: String,
    tabs:Array,
  },
  watch: {
    num(num, old) {//监听computed里的num的值->有变化  就执行下面的操作

      this.ne=num
    },
    message: function (val, oldVal) { //路由跳转
      // 这里就可以通过 val 的值变更来确定去向
      switch(val){
        case 'home_page':
          this.$router.push('/home_page');
          break;
        case 'classify':
          this.$router.push('/classify');
          break;
        case 'car':
          this.$router.push('/car');
          break;
        case 'info':
          if(this.$store.state.userInfo==""){
            this.$router.push('/info');
          }else {
            this.$router.push('/userInfo');
          }

          break;
      }
    }

  },
  computed:{
    num() {//取到N
      return this.$store.state.shopCart["N"];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .mint-tab-item-icon{
    width: r(68);
    height: auto;
  }
  .lay_head-num{
    height: r(18*2);
    width: r(18*2);
    background-color: red;
    color: white;
    position: fixed;
    bottom: r(35*2);
    right: r(126*2);
    z-index: 100;
    border-radius: 50%;
    text-align: center;
    line-height: r(18*2);
    font-size: r(12*2);
  }
</style>


