<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.title">
        <a :href="item.link">
          <img :src="item.image" alt @load="swiperLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isLoad: false
    };
  },
  methods: {
    swiperLoad() {
      //只触发一次
      if (!this.isLoad) {
        this.$emit("swiperLoad");
        this.isLoad = true;
      }
    }
  },
  props: {
    banners: {
      type: Array
    }
  }
};
</script>
