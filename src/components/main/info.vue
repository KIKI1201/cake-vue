<template>
  <div class="info">

    <div class="info-header">
      <span v-for="(item,ind) in header" :key="ind" @click="tabQH(ind)">{{item}}</span>
    </div>
    <!--登录页面-->
    <div class="info-login" v-if="active==0">
      <h1>登录页面</h1>
      <form @submit.prevent="onSubmit">
        <p>
          用户名:<input type="text" v-model="LoginName">
        </p>
        <p>
          密码:<input type="text" v-model="LoginPwd">
        </p>
        <p>
          <button @click="login">登录</button>
        </p>
      </form>
    </div>
    <!--客户信息页面-->
    <div class="info-register" v-if="active==1">
      <h1>注册页面</h1>
      <form @submit.prevent="onSubmit">
        <p>
          用户名:<input type="text" v-model="RegName">
        </p>
        <p>
          密码:<input type="text" v-model="RegPwd">
        </p>
        <p>
          确认密码:<input type="text" v-model="RegPwd2">
        </p>
        <p>
          <button @click="register">注册</button>
        </p>
      </form>
    </div>

  </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';//引入ui组件
    export default {
      name: "info",
      data(){
        return{
          header:["登录","注册"],
          active:0,
          //登录
          LoginName:"",
          LoginPwd:"",
          //注册
          RegName:"",
          RegPwd:"",
          RegPwd2:""
        }
      },
      mounted() {

      },
      methods:{
        tabQH(ind){
          this.active=ind
        },
        onSubmit(){
          return false;
        },
        login(){
          var data = {
            uname: this.LoginName,
            upwd: this.LoginPwd
          };

          // console.log(data);
          this.$apis.login(data).then(res => {
            console.log(res);

            //0 账号不存在
            // 1 success
            // 2 密码错误
            if (res.data.code == 0) {
              console.log(res.data.msg);
            } else if (res.data.code == 1) {
              this.$store.commit("saveUserInfo", res.data.data);//commit调用vuex同步方法里的方法
              // mint-ui的alert
              MessageBox.alert(res.data.msg).then(action => {
                this.$router.push({
                  path: "/userInfo"
                });
              });

            } else {
              console.log(res.data.msg);
            }
          });
        },
        register(){
          var objdata = {
            id: new Date(),
            username: this.RegName,
            password: this.RegPwd,
          };

          this.$apis.edit(objdata).then(res => {
            console.log(res);
            // mint-ui的alert
            MessageBox.alert(res.data.msg).then(action => {
              this.active=0
            });

          });
        }
      }

    }
</script>

<style scoped lang="scss">
  .info{
    .info-login{
      width: 100%;
      h1{
        text-align: center;
        line-height: r(30*2);
        font-size: r(20*2);
      }
      form{
        width: r(230*2);
        margin: 0 auto;
        p{
          margin-top: r(10*2);
          input{
            margin-left: r(10*2);
            float: right;
          }
          button{
            display: block;
            width: r(100*2);
            margin: 0 auto;
          }
        }
      }
    }
    .info-register{
      width: 100%;
      h1{
        text-align: center;
        line-height: r(30*2);
        font-size: r(20*2);
      }
      form{
        width: r(240*2);
        margin: 0 auto;
        p{
          width: 100%;
          margin-top: r(10*2);
          input{
            margin-left: r(10*2);
            float: right;
          }
        }
        button{
          display: block;
          width: r(100*2);
          margin: 0 auto;
        }
      }
    }
  }
</style>
