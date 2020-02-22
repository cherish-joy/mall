import Toast from "./Toast.vue";
const obj = {};

obj.install = function(Vue) {
  console.log(Vue);
  //创建组件构造器
  const toastConstructor = Vue.extend(Toast);
  //new一个组件实例
  const toast = new toastConstructor();
  //将组件实例挂载到div上
  toast.$mount(document.createElement("div"));
  //将div放到body上
  document.body.appendChild(toast.$el);
  Vue.prototype.$toast = toast;
  console.log("插件安装了");
};
export default obj;
