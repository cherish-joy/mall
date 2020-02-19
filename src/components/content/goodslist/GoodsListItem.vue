<template>
  <div class="goods-list-item">
    <a :href="list.link">
      <img :src="list.show.img" alt="" />
    </a>
    <div class="info">
      <p class="title">{{ list.title }}</p>
      <span class="price">{{ list.price }}</span>
      <span>☆{{ list.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: ["list"]
};
</script>

<style lang="less" scoped>
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-list-item {
  width: 48%;
  font-size: 14px;
  img {
    width: 100%;
    border-radius: 4px;
  }
}
.info {
  text-align: center;
  text-overflow: ellipsis;
}
.price {
  color: red;
  margin-right: 5px;
}
</style>
