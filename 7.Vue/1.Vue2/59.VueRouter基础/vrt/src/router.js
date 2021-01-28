import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./views/Home";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  { path: "/home", component: Home },
  {
    path: "/learn",
    component: () => import("./views/Learn"),
  },
  {
    path: "/student",
    component: () => import("./views/Student"),
  },
  {
    path: "/about:id",
    component: () => import("./views/About"),
  },
  {
      path:"/question/:id",
      name:"question", 
      component:()=>import("./views/Question")
  },
  {
    path: "/activity",
    component: () => import(/*webpackChunkName:'academic'*/ "./views/Activity"),
    redirect: { name: "academic" },
    children: [
      {
        path: "academic",
        name: "academic",
        component: () =>
          import(/*webpackChunkName:'academic'*/ "./views/Academic"),
      },
      {
        path: "personal",
        name: "personal",
        component: () => import("./views/Personal"),
      },
      {
        path: "download",
        name: "download",
        component: () => import("./views/Download"),
      },
    ],
  },
];

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes,
});
