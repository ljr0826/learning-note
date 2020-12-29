import Vue from "vue"; //引入node-modules中的构造函数vue
import App from "./App.vue";

Vue.config.productionTip = false; //在生产环境下是否有提示

new Vue({
  render: (h) => h(App), //通过h函数把引入的组件传递到vue实例中
}).$mount("#app"); //延迟挂载到#app上
//主入口文件
