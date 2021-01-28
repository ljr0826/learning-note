//每个模块做一件事，
//这个模块只负责创建vue实例，该实例只是去加载另一个组件（根组件）而已
import App from "./App.js";
new Vue({
  components: { App },
  // template: `<app />`,
  render: (h) => h(App), //利用render函数传入的组件生成一个虚拟节点
}).$mount("#app");
