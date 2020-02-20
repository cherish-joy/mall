import { debounce } from "common/utils";
export const imgMixin = {
  mounted() {
    const refresh = debounce(this.$refs.scroll.imgRefresh, 100);
    this.imgListener = () => {
      refresh();
    };
    this.$bus.$on("imgLoad", this.imgListener);
  }
};
