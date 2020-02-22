<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar"></detail-nav-bar>
    <scroll
      class="detail-scroll"
      ref="scroll"
      :probeType="3"
      :pullUpload="true"
      @showTopIcon="showTopIcon"
    >
      <detail-swiper :imgLists="itemImgs"></detail-swiper>
      <detail-goods-info :goodsInfo="goodsInfo"></detail-goods-info>
      <detail-shop-info :shopInfo="shopInfo"></detail-shop-info>
      <detail-good-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-good-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list :list="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="topClick" v-show="isShow" />
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import {
  getDetailData,
  getRecommendData,
  Goods,
  Shop,
  GoodsParam
} from "services/detail";
import DetailSwiper from "./components/DetailSwiper.vue";
import DetailNavBar from "./components/DetailNavBar.vue";
import DetailGoodsInfo from "./components/DetailGoodsInfo.vue";
import DetailShopInfo from "./components/DetailShopInfo.vue";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodInfo from "./components/DetailGoodInfo";
import DetailParamInfo from "./components/DetailParamInfo.vue";
import DetailCommentInfo from "./components/DetailCommentInfo";
import GoodsList from "components/content/goodslist/GoodsList";
import DetailBottomBar from "./components/DetailBottomBar.vue";
import { imgMixin, backTopMixin } from "common/mixin";
import { debounce } from "common/utils";

export default {
  name: "Detail",
  data() {
    return {
      iid: "",
      itemImgs: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themesY: [],
      getThemesY: null,
      currentIndex: 0
    };
  },
  methods: {
    imgLoad() {
      this.refresh();
      //this.$refs.scroll.imgRefresh();
      this.getThemesY();
    },
    async addToCart() {
      // 1.创建对象
      const product = {};
      // 2.对象信息
      product.iid = this.iid;
      product.imgURL = this.itemImgs[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.newPrice = this.goodsInfo.nowPrice;
      const res = await this.$store.dispatch("addCart", product);
      this.$toast.show(res);
    },
    titleClick(index) {
      this.$refs.scroll.bscroll.scrollTo(0, -this.themesY[index], 500);
    },
    showTopIcon(position) {
      // const positionY = -position.y;
      this.themesY.push(Number.MAX_VALUE);

      for (let index = 0; index < this.themesY.length; index++) {
        if (
          -position.y >= this.themesY[index] &&
          -position.y < this.themesY[index + 1]
        ) {
          this.currentIndex = index;
        }
      }
      this.$refs.navbar.currentIndex = this.currentIndex;
      //y坐标大于1000时显示icon
      this.isShow = -position.y > 1000;
    }
  },
  components: {
    DetailSwiper,
    DetailNavBar,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailGoodInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll
  },
  mixins: [imgMixin, backTopMixin],
  async created() {
    this.iid = this.$route.params.id;
    const res = await getDetailData(this.iid);
    console.log(res);

    const recommendRes = await getRecommendData();
    this.recommends = recommendRes.data.list;

    const {
      columns,
      itemInfo,
      shopInfo,
      detailInfo,
      itemParams,
      rate
    } = res.result;

    const goods = new Goods(itemInfo, columns, shopInfo.services);
    const shopinfo = new Shop(shopInfo);
    this.itemImgs = res.result.itemInfo.topImages;
    this.goodsInfo = goods;
    this.shopInfo = shopinfo;
    this.detailInfo = detailInfo;
    this.paramInfo = new GoodsParam(itemParams.info, itemParams.rule);
    if (rate.list) {
      this.commentInfo = rate.list[0];
    }
    //对获取Y值进行防抖操作
    this.getThemesY = debounce(() => {
      this.themesY = [];
      this.themesY.push(0);
      this.themesY.push(this.$refs.param.$el.offsetTop);
      this.themesY.push(this.$refs.comment.$el.offsetTop);
      this.themesY.push(this.$refs.recommend.$el.offsetTop);
    }, 500);
  },
  destroyed() {
    this.$bus.$off("imgLoad", this.imgListener);
  }
};
</script>

<style lang="less" scoped>
.detail {
  height: 100vh;
  z-index: 9;
  position: relative;
  background-color: #fff;
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
}
.detail-scroll {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 58px;
}
</style>
