import App from "./App.js";
new Vue({
  components: {
    App,
  },
  render(h) {
    App;
  },
  template: `<App />`,
}).$mount("#app");
