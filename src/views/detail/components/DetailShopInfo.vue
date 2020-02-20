<template>
  <div>
    <div class="shop-logo">
      <img :src="shopInfo.logo" alt="" />
      {{ shopInfo.name }}
    </div>
    <div class="shop-info">
      <div class="left-info">
        <div>
          <div class="count">{{ shopInfo.sells }}</div>
          <div class="desc">总销量</div>
        </div>
        <div :style="{ 'border-right': '1px solid #ccc' }">
          <div class="count">{{ shopInfo.goodsCount }}</div>
          <div class="desc">全部宝贝</div>
        </div>
      </div>
      <div class="right-info">
        <div
          v-for="item in shopInfo.score"
          :key="item.name"
          class="inline-info"
        >
          <span class="name-msg">{{ item.name }}</span>
          <span
            class="score-msg"
            :style="{
              color: item.isBetter ? 'red' : 'green',
              'line-height': '20px'
            }"
            >{{ item.score }}</span
          >
          <span
            :style="{
              'background-color': item.isBetter ? 'red' : 'green',
              color: '#fff'
            }"
            >{{ item.isBetter ? "高" : "低" }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="less" scoped>
.shop-logo {
  padding: 20px 8px;
  font-size: 18px;
  img {
    width: 50px;
    vertical-align: middle;
    margin-right: 8px;
  }
}
.shop-info {
  display: flex;
  padding-right: 15px;
  .left-info,
  .right-info {
    flex: 1;
    display: flex;
    div {
      flex: 1;
      text-align: center;
    }
    .count {
      font-size: 18px;
    }
    .desc {
      font-size: 14px;
    }
  }
  .left-info {
    padding: 8px 0;
  }
  .right-info {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    .inline-info {
      display: inline-flex;
      .name-msg,
      .score-msg {
        flex: 1;
      }
    }
  }
}
</style>
