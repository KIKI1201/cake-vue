<template>
  <div class="location">
    <div class="city" @click="bln=!bln" ref="city">{{citys}}</div>
    <mt-popup v-model="bln">
      <p>选择城市</p>
      <ul>
        <li v-for="(item,index) in cityArr1" :key="index" @click="select">
          <a href="">{{item}}</a>
        </li>
      </ul>
      <ul>
        <li v-for="(item,index) in cityArr2" :key="index" @click="select">
          <a href="">{{item}}</a>
        </li>
      </ul>
    </mt-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bln: false,
      cityArr1: ["上海", "北京", "天津", "重庆"],
      cityArr2: [
        "苏州",
        "无锡",
        "南京",
        "杭州",
        "宁波",
        "绍兴",
        "成都",
        "常州",
        "台州",
        "嘉兴"
      ],
      citys:""
    };
  },
  methods: {
    select(e) {
    sessionStorage.setItem("city",encodeURIComponent(e.target.innerText))
    }
  },
  mounted () {
    var c=decodeURIComponent(sessionStorage.getItem("city") || "")==""?"北京": decodeURIComponent(sessionStorage.getItem("city"))
     this.$store.state["city"] =c
     this.citys=c
  }
};
</script>
<style lang="scss" scoped>
.location {
  .city {
    position: absolute;
    left: 0;
    top: r(30);
    background-color: rgba(255, 255, 255, 0.5);
    background-image: url(https://res.bestcake.com/m-images-2/location.png);
    background-repeat: no-repeat;
    width: r(150);
    height: r(60);
    border-radius: 0vw 1.2vw 1.2vw 0vw;
    line-height: r(60);
    background-size: r(48) r(48);
    background-position: r(6) r(6);
    padding-left: r(39);
    text-align: center;
    z-index: 1;
    font-size: r(32);
  }
  .mint-popup {
    width: r(580);
    p {
      width: r(150);
      margin: auto;
      line-height: r(85);
      text-align: center;
      border-bottom: r(1) solid rgb(51, 51, 51);
      font-size: r(32);
      font-weight: bold;
      margin-bottom: r(70);
    }
    ul {
      overflow: hidden;
      margin-bottom: r(30);
      li {
        float: left;
        width: r(192);
        height: r(66);
        text-align: center;
        font-size: r(32);
        line-height: r(66);
        margin-bottom: r(30);
        a {
          text-decoration: none;
          color: #333;
        }
      }
      &:nth-child(3) {
        li {
          margin-bottom: r(60);
        }
      }
    }
  }
}
</style>
