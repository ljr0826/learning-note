//商品列表组件
var template = `<ul>
<li v-for="(item, i) in products">
  名称：{{item.name}}
  <button @click="changeStock(item,item.stock-1)">-</button>
  <span v-if="item.stock>0">{{item.stock}}</span>
  <span v-else>无货</span>
  <button @click="changeStock(item,item.stock+1)">+</button>
  <button @click="remove(i)">删除</button>
</li>
</ul>`;

export default {
  template,
  data() {
    return {
      products: [
        { id: 1, name: "iphone", stock: 10 },
        { id: 2, name: "xiaomi", stock: 7 },
        { id: 3, name: "oppo", stock: 3 },
      ],
    };
  },
  methods: {
    remove(i) {
      this.products.splice(i, 1);
    },
    changeStock(product, newStock) {
      if (newStock < 0) {
        newStock = 0;
      }
      product.stock = newStock;
    },
  },
};
