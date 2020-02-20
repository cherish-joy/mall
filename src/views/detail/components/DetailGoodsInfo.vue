<template>
  <div class="goods-info">
    <div class="title">
      <p>{{ goodsInfo.title }}</p>
      <div class="price-info">
        <span class="newPrice">{{ goodsInfo.newPrice }}</span
        ><span class="oldPrice">{{ goodsInfo.oldPrice }}</span
        ><span class="icon">{{ goodsInfo.discount }}</span>
      </div>
    </div>
    <div class="center-info">
      <div>{{ goodsInfo.columns && goodsInfo.columns[0] }}</div>
      <div>{{ goodsInfo.columns && goodsInfo.columns[1] }}</div>
      <div>{{ goodsInfo.services && goodsInfo.services[2].name }}</div>
    </div>
    <div class="bottom-info">
      <div>
        <img :src="goodsInfo.services && goodsInfo.services[0].icon" alt="" />{{
          goodsInfo.services && goodsInfo.services[0].name
        }}
      </div>
      <div>
        <img :src="goodsInfo.services && goodsInfo.services[0].icon" alt="" />
        {{ goodsInfo.services && goodsInfo.services[1].name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="less" scoped>
.goods-info {
  padding: 5px;
  border-bottom: 4px solid rgb(230, 227, 227);
}
.title {
  .price-info {
    margin-top: 6px;
    display: inline-flex;
    align-items: baseline;
  }
  p {
    font-size: 18px;
  }
  .newPrice {
    font-size: 20px;
    color: red;
  }
  .oldPrice {
    font-size: 14px;
    color: #ccc;
    text-decoration: line-through;
    margin-left: 8px;
  }
  .icon {
    background-color: red;
    color: #fff;
    font-size: 12px;
    border-radius: 5px;
    padding: 2px;
    margin-left: 5px;
    align-self: flex-start;
  }
}
.center-info {
  margin: 6px 0px;
  display: flex;
  justify-content: space-between;
  color: #a5a2a2;
  font-size: 14px;
  padding: 8px 0;
  border-bottom: 1px solid rgb(230, 227, 227);
}
.bottom-info {
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  img {
    width: 14px;
    vertical-align: middle;
  }
}
</style>
