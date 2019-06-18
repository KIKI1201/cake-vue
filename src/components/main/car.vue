<template>
  <div class="car">
    <div class="car-bigBox">
      <div class="car-box" v-for="(item,ind) in cartList.list" :key="ind" >
        <div class="car-input">
          <input   type="checkbox" :value="item" v-model="checkedNames"/>
        </div>
        <div class="car-img">
          <img :src="item.url" alt="" @click="toShow(item)">
        </div>
        <div class="car-content">
          <h1>{{item.Name}}</h1>
          <div>
            <span>{{item.Size}}</span>
            <div class="car-num">
              <div class="car-jian" @click="minus(item)">-</div>
              <div class="car-num">{{item.num}}</div>
              <div class="car-jia" @click="push(item)">+</div>
            </div>
          </div>
          <h2>{{item.CurrentPrice}}</h2>
        </div>
        <div class="car-yh">
          <span class="a">优惠方式</span><span class="b">不参与活动 </span>
        </div>
      </div>
    </div>


    <div class="footer">
      <div class="footer-left">
        <div>
          <input type="checkbox" v-model="qx" @click="checkAll">全选
        </div>
        <div>
          <h1>清空</h1>
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-a">合计: <span>{{allPrich|priceFilter("¥")}}</span> </div>
        <div class="footer-b">结算</div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {//var cartList=sessionStorage.getItem("cartList");
      cartList:[],
      checkedNames: [],
      qx:false
    }
  },
  mounted() {
    this.cartList=JSON.parse(sessionStorage.getItem("cartList"))|| { "N": 0, "list": [] };
    console.log(this.cartList);
    this.$store.state.shopCart=JSON.parse(sessionStorage.getItem("cartList"))|| { "N": 0, "list": [] };
  }
  ,
  computed:{
    allPrich(){
      //计算总价
      var result = 0;
      this.checkedNames.map((item)=>{
        result+=item.CurrentPrice*item.num

      });

      //设置商品选中与全选的关系
      if(this.$store.state.shopCart.list.length==0){
        this.qx=false
      }else {
        if(this.checkedNames.length==this.$store.state.shopCart.list.length){
          this.qx=true
        }else {
          this.qx=false
        }
      }

      return result;//抛出总价

    }
  },
  methods:{
    //商品图片跳转详情页
    toShow(item) {
      var data={
        key:item.Name,
        c:item.SupplyNo
      };
      this.$router.push({
        path: "/show",
        query:{key:data.key,c:data.c}
      });
    },
    //减商品数量
    minus(item){
      var data=item.id;
      this.$store.commit("minus",data);//调用vuex中的同步方法
      this.cartList=JSON.parse(sessionStorage.getItem("cartList"))
    },
    //加商品数量
    push(item){
      var data=item.id;
      this.$store.commit("push",data);
      this.cartList=JSON.parse(sessionStorage.getItem("cartList"))
    },
    //全选,全不选方法
    checkAll(){
      setTimeout(()=>{
        if(this.qx==true){
          if(this.checkedNames.length==this.$store.state.shopCart.list.length){

          }else {
            this.checkedNames=this.$store.state.shopCart.list
          }
        }else {
          this.checkedNames=[]
        }
      },80);



    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.car{
 margin-bottom: 100px;
  .car-bigBox{
    overflow: hidden;
    .car-box{
      margin-bottom: r(4*3.75*2);
      width: 100%;
      overflow: hidden;
      >div{
        float: left;
      }

      .car-input{
        margin-left: r(4*3.75*2);
        margin-right: r(3*3.75*2);
        width: r(5.33*3.75*2);
        margin-top: r(17*3.75*2);
      }
      .car-img{
        margin-right: r(4*3.75*2);
        padding-top: r(4.26*3.75*2);
        width: r(30.4*3.75*2);
        height: r(30.4*3.75*2);
        overflow: hidden;
        img{
          width: r(30.4*3.75*2);
        }
      }
      .car-content{
        width: r(52*3.75*2);
        padding-top: r(5.06*3.75*2);
        overflow: hidden;
        h1{
          font-size: r(4.26*3.75*2);
          color: #000;
          line-height: r(5.06*3.75*2);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: r(49*3.75*2);
        }
        >div{
          margin: r(1.2*3.75*2) 0;
          overflow: hidden;
          span{
            font-size: r(2.93*3.75*2);
            color: #ccc;
            line-height: r(3.46*3.75*2);
            margin-top: r(1.69*3.75*2);
          }
          .car-num{
            float: right;
            >div{
              float: left;
            }
            .car-jian,.car-jia{
              text-align: center;
              line-height: r(14*2);
              font-size: r(16*2);
              display: block;
              width: r(15*2);
              height: r(15*2);
            }
            .car-num{
               display: block;
               width: r(30*2);
               height: r(15*2);
               text-align: center;
            }

          }
        }
        h2{
          font-size: r(3.46*3.75*2);
          color: #030303;
          font-weight: bold;
          line-height: r(4*3.75*2);
          margin-top: r(2.66*3.75*2);
        }
      }
      .car-yh{
        padding-top: r(3*3.75*2);
        padding-left: r(12.33*3.75*2);
        width: 100%;
        .a{
          display: inline-block;
          color: #f2495e;
          margin-right: r(1.333*3.75*2);
          font-weight: bold;
          line-height: r(5.33*3.75*2);
          margin-top: r(3.86*3.75*2);
          margin-bottom: r(3.86*3.75*2);
          font-size: r(3.73*3.75*2);
        }
        .b{
          color: #333;
          line-height: r(5.33*3.75*2);
          margin-top: r(3.86*3.75*2);
          margin-bottom: r(3.86*3.75*2);
          font-size: r(3.73*3.75*2);
        }
      }
    }
  }

  .footer{
    position: fixed;
    bottom: r(58*2);
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
      div{
        float: left;
        line-height: r(55*2);
        font-size: r(4.53*3.75*2);
      }

      h1{
        font-size: r(4.53*3.75*2);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: r(55*2);
        margin-left: r(10*2);
      }
    }
    .footer-right{
      float: right;
      div{
        float: left;
        line-height: r(55*2);
        text-align: center;
        height: 100%;
        font-size: r(15*2);
      }
      .footer-a{
        width: r(110*2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span{
          font-size: r(4.8*3.75*2);
          color: #f2495e;
          font-weight: bold;

        }

      }
      .footer-b{
        background: #02d4d7;
        color: white;
        font-weight: bolder;
        width: r(110*2);
      }
    }
  }
}
</style>


