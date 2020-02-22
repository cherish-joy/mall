<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/images/common/back.svg" alt />
    </div>
    <div slot="center" class="title">
      <div
        v-for="(item,index) in itemList"
        :key="item"
        class="title-item"
        :class="{active:currentIndex===index}"
        @click="itemClick(index)"
      >{{item}}</div>
    </div>
  </nav-bar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      itemList: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    backClick() {
      this.$router.back();
    },
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    }
  },
  components: {
    NavBar
  }
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 14px;
}
.back {
  img {
    margin-top: 11px;
  }
}
.active {
  color: var(--color-high-text);
}
</style>