import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast from "./components/common/toast";
import fastClick from "fastclick";
import VueLazyload from "vue-lazyload";
Vue.config.productionTip = false;
Vue.use(Toast);
Vue.use(VueLazyload, {
  loading: require("assets/images/common/placeholder.png")
});
//解决移动端延迟300ms的问题
fastClick.attach(document.body);
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
