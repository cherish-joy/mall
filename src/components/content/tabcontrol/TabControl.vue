<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item, index) in title" :key="item">
      <span :class="{ active: currentIndex === index }" @click="itemClick(index)">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    title: {
      type: Array
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.$emit("typeClick", index);
    }
  }
};
</script>

<style lang="less" scoped>
.tab-control {
  display: flex;
  text-align: center;
  background-color: #fff;
  height: 40px;
  line-height: 40px;
  .tab-control-item {
    flex: 1;
    span {
      padding: 4px 0;
    }
  }
}
.active {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-high-text);
}
</style>
