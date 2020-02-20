import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("../views/home/Home.vue");
const Category = () => import("../views/category/Category.vue");
const Cart = () => import("../views/cart/Cart.vue");
const Profile = () => import("../views/profile/Profile.vue");
const Detail = () => import("../views/detail/Detail.vue");
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  },
  {
    path: "/category",
    name: "Category",
    component: Category
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: Detail
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
