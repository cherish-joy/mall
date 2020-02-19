<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="home-scroll"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @loadMore="loadMore"
      @showTopIcon="showTopIcon"
    >
      <swiper :banners="banners" />
      <recommend :recommends="recommends" />
      <feature-item />
      <tab-control
        class="tab-control"
        :title="['流行', '新款', '精选']"
        @typeClick="typeClick"
      />
      <goods-list :list="goodsList[type].lists" />
    </scroll>
    <back-top @click.native="topClick" v-show="isShow" />
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import BackTop from "components/content/backtop/BackTop";
import GoodsList from "components/content/goodslist/GoodsList";
import TabControl from "components/content/tabcontrol/TabControl";

import Swiper from "./components/HomeSwiper";
import Recommend from "./components/HomeRecommend";
import FeatureItem from "./components/FeatureItem";

import { getHomeData, getGoodsList } from "services/home";

export default {
  name: "Home",
  components: {
    NavBar,
    Swiper,
    Recommend,
    FeatureItem,
    GoodsList,
    TabControl,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goodsList: {
        pop: {
          page: 0,
          lists: []
        },
        new: {
          page: 0,
          lists: []
        },
        sell: {
          page: 0,
          lists: []
        }
      },
      type: "pop",
      isShow: false
    };
  },
  created() {
    this.fetchHomedata();
    this.fetchGoodsList("pop");
    this.fetchGoodsList("new");
    this.fetchGoodsList("sell");
  },
  methods: {
    typeClick(index) {
      switch (index) {
        case 0:
          this.type = "pop";
          break;
        case 1:
          this.type = "new";
          break;
        case 2:
          this.type = "sell";
          break;
      }
    },
    topClick() {
      this.$refs.scroll.backTop(0, 0, 500);
    },
    showTopIcon(position) {
      //y坐标大于1000时显示icon
      this.isShow = -position.y > 1000;
    },
    loadMore() {
      this.fetchGoodsList(this.type);
      //释放掉 等待下次刷新
      this.$refs.scroll.bscroll.finishPullUp();
    },
    async fetchHomedata() {
      const res = await getHomeData();
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    },
    async fetchGoodsList(type) {
      const page = this.goodsList[type].page + 1;
      const res = await getGoodsList(type, page);
      this.goodsList[type].lists.push(...res.data.list);
      this.goodsList[type].page++;
    }
  }
};
</script>

<style scoped>
.home-nav {
  background-color: rgb(185, 18, 21);
  color: #fff;
  position: fixed;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
}
.home {
  padding-top: 44px;
  /* 整个视口的高度 */
  height: 100vh;
  position: relative;
}
.home-scroll {
  /* 使滚动内容为中间的部分 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
