<template>
  <div class="recommend">
    <div class="recommend-list" v-for="item in recommends" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array
    }
  }
};
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  text-align: center;
  border-bottom: 8px solid #ccc;
}
.recommend-list {
  flex: 1;
  img {
    width: 70;
    height: 70px;
  }
}
</style>
