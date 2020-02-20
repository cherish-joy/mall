<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll">
      <detail-swiper :imgLists="itemImgs"></detail-swiper>
      <detail-goods-info :goodsInfo="goodsInfo"></detail-goods-info>
      <detail-shop-info :shopInfo="shopInfo"></detail-shop-info>
      <detail-good-info
        :detail-info="detailInfo"
        @imgLoad="imgLoad"
      ></detail-good-info>
      <detail-param-info
        ref="param"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list :list="recommends"></goods-list>
    </scroll>
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
import { imgMixin } from "common/mixin";
export default {
  name: "Detail",
  data() {
    return {
      itemImgs: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      imgListener: null
    };
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.imgRefresh();
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
    Scroll
  },
  mixins: [imgMixin],
  async created() {
    const res = await getDetailData(this.$route.params.id);
    const recommendRes = await getRecommendData();
    this.recommends = recommendRes.data.list;
    console.log(recommendRes);

    const {
      columns,
      itemInfo,
      shopInfo,
      detailInfo,
      itemParams,
      rate
    } = res.result;
    console.log(res.result);

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
  bottom: 0;
}
</style>
