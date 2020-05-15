import {request} from "network/request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend',
  })
}

//整合数据
export class GoodsInfo {
  //传入参数
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.dicount = itemInfo.discountDesc
    this.realPrice = itemInfo.lowNowPrice

    this.columns = columns
    this.services = services
  }

}
