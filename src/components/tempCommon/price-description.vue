<template>
    <div class="price-description">
      <div class="price-description-content1">
        <div class="price-text-class">划线价格</div>
        <div class="price-text-content">商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</div>
      </div>
      <div class="price-description-content2">
        <div class="price-text-class">未划线价格</div>
        <div
          class="price-text-content"
        >商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</div>
      </div>
  </div>
</template>
<script>
export default {
    
};
</script>
<style lang="scss" scoped>
.price-description {
  padding: r(15) 0;
  .price-description-content1,
  .price-description-content2 {
    margin: 0 r(30);
    font-size: r(28);
    margin-bottom: r(30);
    overflow: hidden;
    .price-text-class {
      float: left;
      width: r(200);
      color: #181818;
    }
    .price-text-content {
      float: left;
      width: r(488);
      color: #a2a2a2;
    }
  }
  padding-bottom: r(150);
}
</style>
