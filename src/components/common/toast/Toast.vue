<template>
  <div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      message: ""
    };
  },
  methods: {
    show(message, duration = 2000) {
      this.isShow = true;
      console.log(message);

      this.message = message;
      setTimeout(() => {
        this.isShow = false;
      }, duration);
    }
  }
};
</script>

<style lang="less" scoped>
.toast {
  width: 200px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 999;
  border-radius: 10px;
  transform: translate(-50%, -50%);
}
</style>