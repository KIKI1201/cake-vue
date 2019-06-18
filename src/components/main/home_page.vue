<template>
  <div class="honmePage">
    <!--城市选择-->
    <location></location>
    <!--首页banner-->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, ind) in bannerList" :key="ind"><img :src="item.ImgUrl">
      </mt-swipe-item>
    </mt-swipe>
    <!--图标-->
    <div class="icons">
      <div class="icons-box" v-for="(item,ind) in cityIconsList" :key="ind">
        <div class="icons-s">
          <img :src="item.ImgUrl" alt="">
        </div>
        <p>{{item.ActName}}</p>
      </div>
    </div>
    <!--三张广告图片-->
    <div class="guangGao">
      <div class="guangGao-left" @click="toShow('宠爱少女','NS')"><img src="https://res.bestcake.com/m-images-2/guanggao1.png?v=0419" alt=""></div>
      <div class="guangGao-right">
        <div @click="toShow('贝丽','NS')"><img src="https://res.bestcake.com/m-images-2/guangao22.png?v=0419" alt=""></div>
        <div @click="toShow('星光游乐园','NS')"><img src="https://res.bestcake.com/m-images-2/guanggao3.png" alt=""></div>
      </div>
    </div>
    <!--魔法猜心-->
    <div class="magic">
      <img src="https://res.bestcake.com/m-images-2/mofa.png" alt="">
      <p>任选一款，走进你的心</p>
      <div class="magic-tab" >
        <div v-for="(item,ind) in tabClass" :key="ind" @click="setTab(ind)" :class="{selected:tabActive==ind}">{{item}}</div>
      </div>
      <div class="magic-List">
        <div  v-for="(item,ind) in magicTabList" @click="toShow(item.Name,item.SupplyNo)">
          <div class="magic-tabList">
            <img :src="item.ImgUrl" >
            <div>{{item.Name}}</div>
          </div>
          <div class="magic-tabList">
            <span class="magic-a">￥</span>
            <span class="magic-b">{{item.CurrentPrice}}</span>
            <span class="magic-c">/{{item.Size}}</span>
          </div>
        </div>
      </div>
    </div>
    <!--品质甄选-->
    <div class="choiceness">
      <img src="https://res.bestcake.com/m-images-2/pinzhi.png" alt="">
      <p>没尝过这些美味的人生，是不完美的</p>
      <div class="choiceness-listBox">
        <div class="choiceness-Box" v-for="(item, ind) in choicenessList" :key="ind">
          <div class="choiceness-img" @click="toShow(item.Name,item.SupplyNo)">
            <img :src="item.ImgUrl" alt="">
          </div>
          <div class="choiceness-detail">
            <h1>{{item.ActiveName}}</h1>
            <p>{{item.MoreUrl}}</p>
            <img src="https://res.bestcake.com/m-images-2/icon_zy.png" alt="">
            <div class="choiceness-price">
              <span class="choiceness-a">￥</span>
              <span class="choiceness-b">{{item.CurrentPrice}}</span>
              <span class="choiceness-c">/{{item.Size}}</span>
            </div>
          </div>
          <div class="choiceness-icon">
            <img src="https://res.bestcake.com/m-images-2/pinzhi-cart.png"  @click="add(item)" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="aaaa"></div>
  </div>

</template>

<script>
  import location from "@/components/child/location"//引入城市选择组件

  export default {
    name: 'HelloWorld',
    data() {
      return {
        //当前选中的城市
        DQcity: decodeURIComponent(sessionStorage.getItem("city")),
        //首页banner链接数据
        bannerList: [],
        //当前城市图标数据
        cityIconsList: [],
        //tab魔法猜心数据
        tabClass: ["送恋人", "送挚友", "送长者", "送亲子"],
        //魔法猜心所有数据
        magicList: [],
        //魔法猜心teb分类数据
        magicTabList:[],
        //初始tab显示第一个
        tabActive:0,
        //品质甄选所有数据
        choicenessList:[]


      }
    },
    mounted() {
      //首页banner
      this.GetBannerList((res) => {
        res.forEach((item, ind) => {
          item.ImgUrl = `https://res.bestcake.com${item.ImgUrl}`
        });
        this.bannerList = res
      });
      // 图标
      this.GetIndexiconList((res) => {
        res.forEach((item, ind) => {
          if (item.City.indexOf(this.DQcity) != -1) {
            this.cityIconsList.push(item)
          }
        });
      });
      //魔法猜心
      this.GetIndexCommodityList((res) => {
        res.forEach((item, ind) => {
          if (item.TabType == 4) {
            this.magicList.push(item)

          }
        });
        this.setTab(0);
      });
      //品质甄选
      this.GetIndexCommodityList((res) => {
        res.forEach((item, ind) => {
          if (item.TabType == 5) {
            this.choicenessList.push(item)

          }
        });
      });
    },
    methods: {
      //tab栏切换选择相应的数据
      setTab(index){
        var activeList=[];
        this.magicList.forEach((item)=>{
          if( this.tabClass[index]==item.ActiveName){
            activeList.push(item);
          }
        });
        this.magicTabList=activeList.slice(0,3);
        this.tabActive=index;
      },
      //跳转到详情页
      toShow(key,c) {
        //图片焦点图跳转详情页
        this.$router.push({
          path: "/show",
          query:{key,c}
        });

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

      // -------------------以下是返回的数据-------------------------------
      // 调用core>api>index.js里设置的接口
      // 首页banner
      GetBannerList(callback) {
        var data = {
          v: Number(new Date()),
          c: 'Index',
          m: 'GetBannerList',
          Type: '2',
          City: this.DQcity
        };
        this.$apis.GetList(data).then((res) => {
          callback(res.data.Tag.List);
        })
      },
      //图标
      GetIndexiconList(callback) {
        this.$apis.GetIndexCakeList().then((res) => {
          callback(res.data.Tag.iconList);

        })
      },
      //魔法猜心与品质甄选
      GetIndexCommodityList(callback) {
        this.$apis.GetIndexCakeList().then((res) => {
          callback(res.data.Tag.list);
        })
      }
    },
    components: {
      location//注册城市选择组件
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .mint-swipe {
    width: 100%;
    height: r(380);

    img {

      width: 100%;
      height: auto;
    }
  }

  .honmePage {
    /*图标*/
    .icons {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: r(15*2);
      padding-left: r(11.5*2);
      padding-right: r(11.5*2);

      .icons-box {
        margin-top: r(12*2);
        width: r(88*2);
        height: r(76*2);

        .icons-s {
          position: relative;

          img {
            width: r(56*2);
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: r(-56);
          }
        }

        p {
          text-align: center;
          margin-top: r(56*2);
        }
      }

    }

    .guangGao {
      width: 100%;
      height: r(191.25*2);
      padding: r(15*2);
      border-bottom: r(10*2) solid #fafafa;
      > div {
        float: left;
      }

      .guangGao-left {
        margin-right: r(15);

        img {
          height: r(150*2);
          width: auto;
        }
      }

      .guangGao-right {
        div {
          height: r(148);
          margin-bottom: r(3.75*2);

          img {
            height: r(148);
            width: auto;
          }
        }
      }
    }

    .magic {
      border-bottom: r(10*2) solid #fafafa;
      > img {
        width: 100%;
        margin-top: r(25*2);
        margin-bottom: r(10*2);
      }
      > p {
        text-align: center;
        color: #999;
        font-size: r(12*2);
        line-height: r(18);
        margin-bottom: r(16*2);
      }

      .magic-tab{
        display: flex;
        justify-content:space-around;
        padding-left: r(15*2);
        padding-right: r(15*2);
        margin-bottom: r(10*2);
        div{
          width: r(60*2);
          height: r(33*2);
          background: url(https://res.bestcake.com/m-images-2/mofa-1.png) no-repeat center center;
          background-size:r(60*2) r(33*2);
          line-height: r(28*2);
          text-align: center;
        }
        .selected{
          background-image: url(https://res.bestcake.com/m-images-2/mofa-2.png);
          color: #fff;
          background-size:r(60*2) r(33*2);
        }
      }
      .magic-List{
        width: r(375*2);
        padding-left: r(15*2);
        padding-right: r(18*2);
        display: flex;
        justify-content:space-around;
        >div{
          width: r(90*2);
          position: relative;
          text-align: center;
          .magic-tabList{
            margin-bottom: r(6*2);
            img{
              height: r(90*2);
              width: auto;

            }
            div{
              color: #333;
              font-size: r(14*2);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .magic-a,.magic-b{
              color: rgb(255, 51, 0);
              font-size: r(16*2);
            }
            .magic-c{
              color: rgb(212, 212, 212);
              font-size: r(12*2);
            }

          }
        }
      }
    }

    .choiceness{
      border-bottom: r(10*2) solid #fafafa;
      > img {
        width: 100%;
        margin-top: r(25*2);
        margin-bottom: r(10*2);
      }
      > p {
        text-align: center;
        color: #999;
        font-size: r(12*2);
        line-height: r(18);
        margin-bottom: r(16*2);
      }
      .choiceness-Box{
        width: r(375*2);
        height: r(110*2);
        margin-bottom: r(12*2);
        position: relative;
        padding: 0 r(15*2);
        .choiceness-img{
          width: r(110*2);
          height: r(110*2);
          float: left;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .choiceness-detail{
          /*float: left;*/
          margin-left: r(15*2);
          h1{
            max-width: r(187*2);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: r(16*2);
            color: #333333;
            margin: 1r(4*2) 0 0;
          }
          p{
            max-width: r(187*2);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: r(12*2);
            color: #999;
            margin-bottom: r(4*2);
          }
          img{
            height: r(15*2);
          }
          .choiceness-price{
            .choiceness-a,.choiceness-b{
              color: rgb(255, 51, 0);
              font-size: r(16*2);
            }
            .choiceness-c{
              color: rgb(212, 212, 212);
              font-size: r(12*2);
            }
          }
        }
        .choiceness-icon{
          width: r(42*2);
          height: r(42*2);
          position: absolute;
          right: r(15*2);
          bottom: 0;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }

    }



    .aaaa{
      height: r(100*2);
    }
  }

</style>


