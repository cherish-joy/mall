<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center" class="title">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class="cart-scroll" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import CartBottomBar from "./components/CartBottomBar.vue";
import CartList from "./components/CartList.vue";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar
  },
  computed: {
    //将vuex store中的getters映射到当前组件的computed中
    ...mapGetters(["cartLength"])
  },
  activated() {
    this.$refs.scroll.imgRefresh();
  }
};
</script>

<style lang="less" scoped>
.cart {
  height: 100vh;
  //  z-index: 9;
  position: relative;
  background-color: #fff;
  .cart-nav {
    background-color: red;
    color: #fff;
    font-size: 18px;
  }
}
.cart-scroll {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
</style>
