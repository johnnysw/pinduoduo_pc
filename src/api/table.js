import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
/*商品列表*/
export function getProduct(params) {
  return request({
    url: '/table/product',
    method: 'get',
    params
  })
}
/*商品仓库列表*/
export function getStorage(params) {
  return request({
    url: '/table/storage',
    method: 'get',
    params
  })
}
