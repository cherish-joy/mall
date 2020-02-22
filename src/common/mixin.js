import { debounce } from "common/utils";
import BackTop from "components/content/backtop/BackTop";
export const imgMixin = {
  data() {
    return {
      imgListener: null,
      refresh: null
    };
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.imgRefresh, 100);
    this.imgListener = () => {
      this.refresh();
    };
    this.$bus.$on("imgLoad", this.imgListener);
  }
};

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    topClick() {
      this.$refs.scroll.backTop(0, 0, 500);
    }
  }
};
