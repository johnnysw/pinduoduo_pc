import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
});

/* 商品列表数据 */
const product = Mock.mock({
  'items|30':[{
    id: '@id',
    name:'@cname',
    'category|1': ['华为', '小米', '苹果'],
    date:'@datetime',
    img:'@image("200*200")',
    price:'@integer(1000,9999)',
    storage:'@integer(10000,99990)',
    totalSale:'@integer(100000,999999)'
  }]
});
/* 商品仓库列表数据 */
const storage = Mock.mock({
  'items|30':[{
    id: '@id',
    name:'@first',
    'category|1': ['华为', '小米', '苹果'],
    date:'@datetime',
    img:'@image("200*200")',
    price:'@integer(1000,9999)',
    storage:'@integer(10000,99990)',
    totalSale:'@integer(100000,999999)'
  }]
});


export default [
  {
    url: '/table/list',
    type: 'get',
    response: config => {
      const items = data.items;
      return {
        code: 20000,
        data: {
          options:['华为', '小米', '苹果'],
          total: items.length,
          items: items
        }
      }
    }
  },
/* 商品列表 */
  {
    url: '/table/product',
    type: 'get',
    response: config => {
      const items = product.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
/* 仓库列表 */
  {
    url: '/table/storage',
    type: 'get',
    response: config => {
      const items = storage.items;
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }

]
