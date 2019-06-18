<template>
  <div class="info">
    <!--登录页面-->
    <div class="info-login" v-if="active==1">
      <h1>登录页面</h1>
      <form>
        <p>
          用户名:<input type="text" name="uname">
        </p>
        <p>
          密码:<input type="text" name="upwd">
        </p>
        <p>
          <button>登录</button>
        </p>
      </form>
    </div>
    <!--客户信息页面-->
    <div class="info-msg" v-if="active==2">
      <h1>我是客户信息页</h1>
      <h2></h2>
    </div>

  </div>
</template>

<script>
    export default {
      name: "info",
      active:1
    }
</script>

<style scoped>

</style>
