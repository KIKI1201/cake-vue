<template>
  <div id="show">
    <div class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
          <img class="imgs" :src="item">
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <div class="cakaName">
      <span v-if="details.length>0">{{details[0].Name}}</span>
    </div>

    <!--蛋糕详情-->
    <div class="cakeDetails">
      <div class="cakeDetails-td">
        <div><span>甜度</span></div>
        <div class="a"><img :src="cakeSweetUrl" alt=""></div>
      </div>
      <div class="cakeDetails-kw">
        <div><span>口味</span></div>
        <div class="a" v-if="details.length>0">{{details[0].CategoryName}}</div>
      </div>
      <div class="cakeDetails-ycl">
        <div><span>原材料</span></div>
        <div class="a" v-if="details.length>0">{{details[0].Resource}}{{details[0].Resourse}}</div>
      </div>
      <div class="cakeDetails-shrq">
        <div><span>适合人群</span></div>
        <div class="a">{{Details}}</div>
      </div>
      <div class="cakeDetails-bxtj">
        <div><span>保鲜条件</span></div>
        <div class="a" v-if="details.length>0">{{details[0].KeepFresh}}</div>
      </div>
    </div>

    <div class="cakeSize">
      <div class="cakeSize-top">
        <div v-if="details.length>0">{{details[0].Size}}</div>
      </div>
      <div class="cakeSize-bottom">
        <div><img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-1.png" alt=""><span>13*13cm</span></div>
        <div><img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png" alt=""><span>适合4-5人分享</span></div>
        <div><img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png" alt=""><span>含五人份餐具</span></div>
        <div><img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png" alt=""><span>至少需提前一天预约</span></div>
      </div>
    </div>

    <div class="cakeNum">
      <div class="cakeNum-left">
        <div>购买数量</div>
      </div>
      <div class="cakeNum-right">
        <div class="cakeNum-jian">-</div>
        <div class="cakeNum-num">1</div>
        <div class="cakeNum-jia">+</div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-left">
        <h1 v-if="details.length">{{details[0].CurrentPrice}}</h1>
      </div>
      <div class="footer-right">
        <div class="footer-a" @click="addCar(details[0])">加入购物车</div>
        <div class="footer-b">立即购买</div>
      </div>

    </div>

    <div></div>
    <div>
      <div>

      </div>
    </div>

  </div>

</template>

<script>
  import { MessageBox } from 'mint-ui';//引入ui组件
  export default {
    name: "shou",
    data() {
      return {
        //轮播图
        bannerList: [],
        //详情的具体数据
        details:[],
        //甜度的图片
        cakeSweetUrl:"",
        Details:"所有人群"
      };
    },
    mounted() {
      this.pageInit();
    },
    methods: {
      addCar(item){//把数据添加到vuex中
        // vuex部分
        var data = {
          id: item.Pid||item.ID||item.CakeType[0].Id,  //产品ID
          Name: item.Name, //产品详情图片拼接,//贝利
          CurrentPrice: item.CurrentPrice, //产品价格
          Size: item.Size, //产品规格
          url: this.bannerList[0], //产品购物车显示图片
          SupplyNo:item.SupplyNo ,//产品货号类型
          num:1
        };
        this.$store.commit("add",data);//把数据添加到vuex中

        //先进行添加再进行弹窗
        //mint-ui弹窗部分使用
        MessageBox.confirm('',{
          title:'提示',
          message:'成功添加到购物车',
          confirmButtonText:'去结算',
          cancelButtonText:'再看看'
        }).then(action => {
          if (action == 'confirm') {
            this.$router.push({
              path:"/car"
            })
          }
        }).catch(error =>{
          if(error == 'cancel'){

          }
        });

      },
      pageInit() {// 初始化执行
        //通过路由上的传参 c 来确定不同分类 来进行不同的数据操作
        if (this.$route.query.c.indexOf("NS") != -1) {
          //女神
          this.GetNSCakeByName(res => {
            this.details.push(res.data.Tag[0]);
            this.cakeSweetUrl=`https://res.bestcake.com/m-images/ww/jz/tiandu_${res.data.Tag[0].Sweet}.png`;
            this.details[0].KeepFresh="最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。"

          });
          this.setBannerList("ns-detail");
        }else if (this.$route.query.c.indexOf("KSK") != -1) {
          this.GetCakeByName(res => {
            //经典
            console.log(res.data.Tag.infos);
            this.details.push(res.data.Tag.infos);
            this.cakeSweetUrl=`https://res.bestcake.com/m-images/ww/jz/tiandu_${res.data.Tag.infos.CakeType[0].Sweet}.png`;
            this.details[0].Size=this.details[0].CakeType[0].Size;
            this.details[0].CurrentPrice=this.details[0].CakeType[0].CurrentPrice;
            console.log(this.details[0]);
          });
          this.setBannerList("jd-detail");
        } else if (this.$route.query.c.indexOf("RP") != -1) {
          this.GetRuPCakeByName(res => {
            //乳品
            this.details.push(res.data.Tag[0]);
            this.cakeSweetUrl=`https://res.bestcake.com/m-images/ww/jz/tiandu_${res.data.Tag[0].Sweet}.png`;
            console.log(this.details[0]);
          });
          this.setBannerList("rp-detail");
        } else{
          //伴手礼
          this.GetjzCakeInfo(res => {
            console.log(res.data.Tag[0]);
            this.details.push(res.data.Tag[0]);
            this.cakeSweetUrl=`https://res.bestcake.com/m-images/ww/jz/tiandu_${res.data.Tag[0].CakeType[0].Sweet}.png`;
            console.log(this.details[0]);
          });
          this.setBannerList("jz-detail");
        }
      },
      //拼接banner图片url
      setBannerList(path) {
        //  星光游乐园/星光游乐园-1.jpg
        for (var i = 0; i < 4; i++) {

          var str = `https://res.bestcake.com/m-images/${path}/${
            this.$route.query.key
            }/${this.$route.query.key}-${i + 1}.jpg`;
          this.bannerList.push(str);
        }
      },
      // ===============数据接口部分========================================
      // 调用core>api>index.js里设置的接口
      GetNSCakeByName(callback) {
        // 焦点图详情接口
        var data = {
          Name: this.$route.query.key
        };
        this.$apis.GetNSCakeByName(data).then(res => {
          callback(res);
        });
      },
      GetCakeByName(callback){
        var data = {
          ProName: this.$route.query.key
        };
        // 商品详情接口
        this.$apis.GetCakeByName(data).then(res => {
          callback(res);
        });
      },
      GetjzCakeInfo(callback) {
        var data = {
          ProName: this.$route.query.key
        };
        // 商品详情接口
        this.$apis.GetjzCakeInfo(data).then(res => {
          callback(res);
        });
      },
      GetRuPCakeByName(callback) {
        var data = {
          Name: this.$route.query.key
        };
        this.$apis.GetRuPCakeByName(data).then(res => {
          callback(res);
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  #show {
    .swipe {
      width: 100%;
      height: r(445*2);
      .imgs {
        width: 100%;
        height: 100%;
      }
    }
    .cakaName{
      margin: 0 auto;
      padding: r(40*2) 0;
      width: 100%;
      text-align: center;
      border-bottom: r(10*2) solid #fafafa;
      span{
        line-height: r(30*2);
        font-weight: bold;
        color: #333;
        font-size: r(15*2);


      }
    }
    .cakeDetails{
      border-bottom: r(10*2) solid #fafafa;
      margin-top: r(15*2);
      .cakeDetails-td{
        display: block;
        width: 100%;
        height: r(16*2);
        margin-bottom: r(10*2);
        margin-top: r(37.5*2);
        div{
          font-size: r(14*2);
          float: left;
          width: r(60*2);
          margin-left: r(15*2);
          span{
            color: #9A9A9A;
          }
          img{
            vertical-align: top;
            width: r(84*2);
            margin-top: r(2*2);
          }
        }
      }
      .cakeDetails-kw{
        display: block;
        width: 100%;
        height: r(16*2);
        margin-bottom: r(10*2);
        margin-top: r(37.5*2);
        div {
          font-size: r(14*2);
          float: left;
          width: r(60*2);
          margin-left: r(15*2);
          span{
            color: #9A9A9A;

          }
        }
      }
      .cakeDetails-ycl{
        display: block;
        width: 100%;
        height: r(16*2);
        margin-bottom: r(10*2);
        margin-top: r(37.5*2);
        div {
          font-size: r(14*2);
          float: left;
          width: r(60*2);
          margin-left: r(15*2);
          span{
            color: #9A9A9A;
            width: r(60*2);
          }

        }
        .a{
          margin-left: r(15*2);
          width: r(270*2);
        }
      }
      .cakeDetails-shrq{
        display: block;
        width: 100%;
        height: r(16*2);
        margin-bottom: r(10*2);
        margin-top: r(37.5*2);
        div {
          font-size: r(14*2);
          float: left;
          width: r(60*2);
          margin-left: r(15*2);
          span{
            color: #9A9A9A;
          }
        }
        .a{
          margin-left: r(15*2);
          width: r(270*2);
        }
      }
      .cakeDetails-bxtj{
        display: block;
        width: 100%;
        overflow: hidden;
        margin-bottom: r(30*2);
        margin-top: r(37.5*2);
        div {
          font-size: r(14*2);
          float: left;
          width: r(60*2);
          margin-left: r(15*2);
          span{
            color: #9A9A9A;
          }
        }
        .a{
          margin-left: r(15*2);
          width: r(270*2);
        }
      }
    }
    .cakeSize{
      margin-top: r(15*2);
      width: 100%;
      border-bottom: r(10*2) solid #fafafa;
      overflow: hidden;
      .cakeSize-top{
        margin-top: r(30*2);
        overflow: hidden;
        div{
          background: #02d3d6;
          border-radius: r(2*2);
          color: #fff;
          border: 1px solid #02d3d6;
          float: left;
          font-size: r(14);
          text-align: center;
          line-height: r(30*2);
          padding: 0 r(13*2);
          height: r(30*2);
          margin-left: r(15*2);

        }
      }
      .cakeSize-bottom{
        float: left;
        margin-top: r(42*2);
        overflow: hidden;
        width: 100%;
        >div{
          width: 50%;
          margin-bottom: r(15*2);
          float: left;
          position: relative;
          display: block;
          img{
            float: left;
            width: 12%;
            margin-right: r(10*2);
            margin-left: r(15*2);
          }
        }
      }
    }
    .cakeNum{
      margin-top: r(15*2);
      padding-bottom: r(20*2);
      width: 100%;
      border-bottom: r(10*2) solid #fafafa;
      overflow: hidden;
      .cakeNum-left{
        padding-left: r(15*2);
        width: 50%;
        float: left;
        position: relative;
        div{
          font-size: r(14*2);
        }
      }
      .cakeNum-right{
        padding-right: r(15*2);
        float: right;
        div{
          float: left;
        }
        .cakeNum-jian,.cakeNum-jia{
          text-align: center;
          line-height: r(14*2);
          font-size: r(14*2);
          display: block;
          width: r(15*2);
          height: r(15*2);
          border: r(1*1) solid #666666;
        }
        .cakeNum-num{
          display: block;
          width: r(30*2);
          height: r(15*2);
          text-align: center;
        }
      }
    }
    .footer{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 99;
      height: r(55*2);
      overflow: hidden;
      background-color: #fff;
      .footer-left{
        float: left;
        margin-left: r(15*2);
        margin-top: r(4*2);
        margin-bottom: r(10*2);
        width: r(135*2);
        overflow: hidden;
        h1{
          font-size: r(4.53*3.75*2);
          color: #f2495e;
          font-weight: bolder;
          width: r(36*3.75*2);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: r(55*2);
        }
      }
      .footer-right{
        float: right;
        div{
          float: left;
          line-height: r(55*2);
          text-align: center;
          width: r(110*2);
          height: 100%;
          font-size: r(15*2);
        }
        .footer-b{
          background: #02d4d7;
          color: white;
          font-weight: bolder;
        }
      }
    }
  }
</style>
