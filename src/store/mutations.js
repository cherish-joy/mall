import { ADD_COUNT, ADD_TO_CART } from "./mutations-type";

export default {
  [ADD_TO_CART](state, payload) {
    payload.count = 1;
    payload.checked = false;
    state.cartList.push(payload);
  },
  [ADD_COUNT](stata, payload) {
    payload.count++;
  }
};
