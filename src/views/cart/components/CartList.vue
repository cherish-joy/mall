<template>
  <div>
    <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem.vue";
export default {
  name: "CartList",
  components: {
    CartListItem
  },
  computed: {
    //将vuex store中的getters映射到当前组件的computed中
    ...mapGetters(["cartList"])
  }
};
</script>