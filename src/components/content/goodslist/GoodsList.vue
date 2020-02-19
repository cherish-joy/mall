<template>
  <div class="goods-list">
    <goods-list-item
      v-for="item in list"
      :key="item.title"
      :list="item"
      class="goods-list-item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    list: {
      type: Array
    }
  }
};
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
