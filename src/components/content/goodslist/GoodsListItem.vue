<template>
  <div class="goods-list-item" @click="itemClick">
    <img v-lazy="getImg" alt @load="imgLoad" />

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
  props: ["list"],
  methods: {
    imgLoad() {
      this.$bus.$emit("imgLoad");
    },
    itemClick() {
      this.$router.push("/detail/" + this.list.iid);
    }
  },
  computed: {
    getImg() {
      return this.list.image || this.list.show.img;
    }
  }
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
