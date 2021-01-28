import Products from "./components/Products.js";
//根组件
const template = `<div>
                      <h1>库存管理系统</h1>
                      <Products />
                  </div>`;
export default {
  components: {
    Products,
  },
  template,
};
