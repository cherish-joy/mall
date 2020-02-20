<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :title="['流行', '新款', '精选']"
      @typeClick="typeClick"
      class="tab-control-two"
      v-show="tabControlShow"
      ref="tabControlTwo"
    />
    <scroll
      class="home-scroll"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @loadMore="loadMore"
      @showTopIcon="showTopIcon"
    >
      <swiper :banners="banners" @swiperLoad="swiperLoad" />
      <recommend :recommends="recommends" />
      <feature-item />
      <tab-control
        class="tab-control-one"
        :title="['流行', '新款', '精选']"
        @typeClick="typeClick"
        ref="tabControlOne"
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

import { debounce } from "common/utils";
import { imgMixin } from "common/mixin";
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
      isShow: false,
      tabControlOffset: 0,
      tabControlShow: false,
      scrollY: 0,
      imgListener: null
    };
  },
  created() {
    this.fetchHomedata();
    this.fetchGoodsList("pop");
    this.fetchGoodsList("new");
    this.fetchGoodsList("sell");
    //每张图片加载完成 都会触发这个这个事件,第二个参数就是一个回调函数
  },

  mixins: [imgMixin],
  activated() {
    /**
     * 这个功能其实加了keep-alive就可以了 但是好像有时候会出现一点问题
     */
    //进入页面时 自动滚到离开时的坐标

    this.$refs.scroll.backTop(0, this.scrollY, 0);

    //最好 刷新一下
    this.$refs.scroll.imgRefresh();
  },
  deactivated() {
    //离开页面时记录y的坐标

    this.scrollY = this.$refs.scroll.bscroll.y;
    this.$bus.$off("imgLoad", this.imgListener);
  },
  methods: {
    swiperLoad() {
      this.tabControlOffset = this.$refs.tabControlOne.$el.offsetTop;
    },

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
      this.$refs.tabControlTwo.currentIndex = index;
      this.$refs.tabControlOne.currentIndex = index;
    },
    topClick() {
      this.$refs.scroll.backTop(0, 0, 500);
    },
    showTopIcon(position) {
      //y坐标大于1000时显示icon
      this.isShow = -position.y > 1000;
      //显示或者隐藏tabbar
      this.tabControlShow = -position.y >= this.tabControlOffset;
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
  /* position: fixed;
  top: 0;
  z-index: 9; */
}
.tab-control-two {
  position: relative;
  z-index: 9;
}
.home {
  /* padding-top: 44px; */
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
  overflow: hidden;
}
</style>
