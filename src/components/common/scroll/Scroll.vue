<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      bscroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    backTop(x, y, time = 300) {
      //回到某个坐标值 第三个参数是动画时间
      this.bscroll.scrollTo(x, y, time);
    },
    imgRefresh() {
      this.bscroll.refresh();
    }
  },
  mounted() {
    const bscroll = new BScroll(this.$refs.wrapper, {
      //设置这个 里面的元素才能出发点击事件
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    this.bscroll = bscroll;
    //监听滚动事件 并触发父组件的事件 将position的值传递过去
    this.bscroll.on("scroll", position => {
      this.$emit("showTopIcon", position);
    });
    this.bscroll.on("pullingUp", () => {
      this.$emit("loadMore");
    });
  }
};
</script>
