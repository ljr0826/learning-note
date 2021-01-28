import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import "./assets/reset.css";
import axios from "./http.js";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios; //在main.js中引入的文件是无法放到组件里面的，所以需要加到Vue原型链上

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
