import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

import Home from "./components/Home";
import Learn from "./components/Learn";
import Student from "./components/Student";
import About from "./components/About";
import Activity from "./components/Activity";

const routers = [
  { path: "/", component: Home },
  { path: "/Learn", component: Learn },
  { path: "/Student", component: Student },
  { path: "/About", component: About },
  { path: "/Activity", component: Activity },
];

Vue.use(VueRouter);

const router = new VueRouter({
  routers,
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
