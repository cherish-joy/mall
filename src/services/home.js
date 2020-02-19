import { request } from "./request";

export function getHomeData() {
  return request({
    url: "/home/multidata"
  });
}

export function getGoodsList(type, page) {
  return request({
    url: "/home/data",
    params: {
      type,
      page
    }
  });
}
