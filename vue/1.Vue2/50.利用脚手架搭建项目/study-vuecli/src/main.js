import Vue from "vue"; //引入node-modules中的构造函数vue
import App from "./App.vue";

Vue.config.productionTip = false; //在生产环境下是否有提示

//1. 运行时版（少了编译器，体积小30%，不能用template选项）
//2. template里的编译性没有render中高
//完整版

new Vue({
  render: (h) => h(App), //通过h函数把引入的组件传递到vue实例中
}).$mount("#app"); //延迟挂载到#app上
//主入口文件

//在.vue文件中，template选项的优先级是比render函数高的，所以用render函数时，可以将template选项去掉
