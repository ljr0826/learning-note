<template>
  <div id="app">
    <div class="nav-box">
      <div class="logo" @click="handleClick">渡一教育</div>
      <div class="nav-list">
        <router-link to="/home">首页</router-link>
        <router-link to="/learn">课程学习</router-link>
        <router-link to="/student">学员展示</router-link>
        <router-link to="/about">关于</router-link>
        <router-link to="/activity">社区</router-link>
      </div>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    handleClick() {
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
.nav-box {
  padding: 0 200px;
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  background-color: #3385ff;
}
.nav-box .logo {
  color: #fff;
}
.nav-list a {
  margin-left: 40px;
  text-decoration: none;
  color: #fff;
}
.nav-list a.router-link-active {
  font-weight: bold;
}
.container {
  padding: 0 200px;
  margin-top: 60px;
}
</style>