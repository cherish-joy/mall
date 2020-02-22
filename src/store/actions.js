import { ADD_COUNT, ADD_TO_CART } from "./mutations-type";
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      const item = context.state.cartList.find(
        item => item.iid === payload.iid
      );
      if (item) {
        context.commit(ADD_COUNT, item);
        resolve("商品数量+1");
      } else {
        context.commit(ADD_TO_CART, payload);
        resolve("添加购物车成功!");
      }
    });
  }
};
