<template>
  <div class="classify">
    <div class="tab">
      <span @click="ziyin" >自营</span>
      <span @click="bs">贝式严选</span>
    </div>
    <div class="zy" v-show="active==1">
      <div class="zy-top">
        <span v-for="(item, ind) in one" :key="ind" @click="optionData(item.mark)">{{item.name}}</span>
      </div>
      <div class="zy-bottom">
        <div class="zy-bottom-box" v-for="(item,ind) in activeList" :key="ind">
          <img class="zy-bottom-img" :src="item.ImgUrl" alt="" @click="toShow(item)">

          <div class="zy-bottom-content">
            <h1>{{item.Name}}</h1>
            <p>{{item.Means}}</p>
            <div class="zy-bottom-price">
              <span class="zy-price">￥{{item.CurrentPrice}}</span>
              <span class="zy-size">/{{item.Size}}</span>
            </div>
          </div>

          <div class="zy-bottom-icon">
            <img src="https://res.bestcake.com\m-images-2\list-cart.png?v=1" @click="add(item)" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="yx" v-show="active==2">
      <div class="yx-top"><span>乳品</span></div>
      <div class="yx-bottom">
        <div class="yx-bottom-box" v-for="(item,ind) in activeList" :key="ind">
          <img class="yx-bottom-img" :src="item.ImgUrl" alt="" @click="toShow(item)">

          <div class="yx-bottom-content">
            <h1>{{item.Name}}</h1>
            <p>{{item.Means}}</p>
            <div class="yx-bottom-price">
              <span class="yx-price">{{item.CurrentPrice}}</span>
              <span class="yx-size">/{{item.Size}}</span>
            </div>
          </div>

          <div class="yx-bottom-icon" >
            <img src="https://res.bestcake.com\m-images-2\list-cart.png?v=1" @click="add(item)" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        active: 1,
        goodsList: [],
        activeList:[],
        one: [
          { name: "经典", mark: "KSK" },
          { name: "女神", mark: "NS" },
          { name: "伴手礼", mark: "JZ" }
        ]
      }
    },
    mounted() {
      this.pageInit();
    },
    methods: {
      // tab切换
      bs(){
        this.active=2;
        this.optionData("RP");
      },
      ziyin(){
        this.active=1;
        this.optionData("KSK");
      },
      //添加商品到购物车
      add(item){
        var data = {
          id: item.Pid||item.ID,  //产品ID
          Name: item.Name, //产品详情图片拼接,//贝利
          CurrentPrice: item.CurrentPrice, //产品价格
          Size: item.Size, //产品规格
          url: item.ImgUrl, //产品购物车显示图片
          SupplyNo:item.SupplyNo ,//产品货号类型
          num:1
        };
        this.$store.commit("add",data);
      },
      //在数组中加入图片url
      pageInit() {
        this.GetJdListNew(res => {
          var goodsList=res.data.Tag.cakelist;
          var url=`https://res.bestcake.com/m-images/ww/`;
          goodsList.forEach((item)=>{
            if(item.SupplyNo.indexOf("KSK")!=-1){
              item.ImgUrl=`${url}jd/${item.Name}.png`;
            }else if(item.SupplyNo.indexOf("NS")!=-1){
              item.ImgUrl=`${url}ns/${item.Name}.jpg`;
            }else if(item.SupplyNo.indexOf("JZ")!=-1){
              item.ImgUrl=`${url}jz/${item.Name}.png`;
            }else{
              item.ImgUrl=`${url}rp/${item.Name}.jpg`;
            }
          });
          // https://res.bestcake.com/m-images/ww/jd/极地牛乳.png?v=14
          // https://res.bestcake.com/m-images/ww/ns/一见倾心.jpg?v=14
          // https://res.bestcake.com/m-images/ww/jz/草莓先生.png?v=14
          //  res.data.Tag.cakelist
          this.goodsList =goodsList;
          this.optionData(this.one[0].mark);
        });
      },
      // 把总数组中选中分类的数据放到activeList数组中
      optionData(mark) {
        var activeList=[];
        this.goodsList.forEach((item)=>{
          if(item.SupplyNo.indexOf(mark)!=-1){
            activeList.push(item);
          }
        });
        this.activeList=activeList;
      },
      //图片焦点图跳转详情页
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
      // 调用接口返回数据
      GetJdListNew(callback) {
        this.$apis.GetJdListNew().then(res => {
          callback(res);
        });
      }


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tab{
    display: flex;
    justify-content:space-around;
    span{
      width: 50%;
      height: r(13*3.75*2);
      line-height: r(13*3.75*2);
      text-align: center;
      font-size: r(4.266*3.75*2);
    }
    .aa{
      color: #1db0b8;
      border-bottom: r(2*2) solid #1db0b8;
    }

  }
  .zy{
    width: 100%;
    overflow: hidden;
    .zy-top{
      width: 100%;
      overflow: hidden;
      display: flex;
      justify-content:space-around;
      span{
        display: block;
        padding: r(10*2) r(30*2);
      }
    }
    .zy-bottom{
      display: flex;
      flex-wrap:wrap;
      width: 100vw;
      padding: 0 r(1.6*3.75*2);
      .zy-bottom-box{
        width: 50%;
        float: left;
        position: relative;
        padding: 0 r(2*2);
        margin-bottom: r(5.334*3.75*2);
        height: r(230*2);
        .zy-bottom-img{
          display: block;
          max-width: 100%;
          height: auto;
        }
        .zy-bottom-content{
          position: absolute;
          bottom: 0;
          h1{
            font-size: r(3.734*3.75*2);
            color: #333;
            padding-left: r(2*3.75*2);
            display: block;
            width: r(40*3.75*2);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p{
            display: block;
            width: r(40*3.75*2);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: r(5*3.75*2);
            font-size: r(3.2*3.75*2);
            color: #999;
            padding-left: r(2*3.75*2);

          }
          .zy-bottom-price{
            .zy-price{
              color: rgb(255, 51, 0);
              font-size:r(4.267*3.75*2);
            }
            .zy-size{
              color: rgb(188, 188, 188);
              font-size: r(3.2*3.75*2);
              margin-left: r(1.067*3.75*2);
            }
          }

        }
        .zy-bottom-icon{
          width: r(5.334*3.75*2);
          height: r(5.334*3.75*2);
          position: absolute;
          right: r(2*3.75*2);
          bottom: r(1*3.75*2);
          img{
            display: block;
            max-width: 100%;
            height: auto;
            z-index: 100;
          }
        }

      }


    }
  }
  .yx{
    width: 100%;
    overflow: hidden;
    .yx-top{
      width: 100%;
      overflow: hidden;
      text-align: center;
      span{
        display: block;
        padding: r(10*2) r(30*2);
      }
    }
    .yx-bottom{
      display: flex;
      flex-wrap:wrap;
      width: 100vw;
      padding: 0 r(1.6*3.75*2);
      .yx-bottom-box{
        width: 50%;
        float: left;
        position: relative;
        padding: 0 r(2*2);
        margin-bottom: r(5.334*3.75*2);
        height: r(230*2);
        .yx-bottom-img{
          display: block;
          max-width: 100%;
          height: auto;
        }
        .yx-bottom-content{
          position: absolute;
          bottom: 0;
          h1{
            font-size: r(3.734*3.75*2);
            color: #333;
            padding-left: r(2*3.75*2);
            display: block;
            width: r(40*3.75*2);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p{
            display: block;
            width: r(40*3.75*2);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: r(5*3.75*2);
            font-size: r(3.2*3.75*2);
            color: #999;
            padding-left: r(2*3.75*2);

          }
          .yx-bottom-price{
            .yx-price{
              color: rgb(255, 51, 0);
              font-size:r(4.267*3.75*2);
            }
            .yx-size{
              color: rgb(188, 188, 188);
              font-size: r(3.2*3.75*2);
              margin-left: r(1.067*3.75*2);
            }
          }

        }
        .yx-bottom-icon{
          width: r(5.334*3.75*2);
          height: r(5.334*3.75*2);
          position: absolute;
          right: r(2*3.75*2);
          bottom: r(1*3.75*2);
          img{
            display: block;
            max-width: 100%;
            height: auto;
          }
        }

      }


    }
  }
</style>


