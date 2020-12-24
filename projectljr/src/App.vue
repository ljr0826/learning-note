<template>
  <div id="app">
    <my-cmp></my-cmp>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import MyCmp from "./components/MyCmp"
export default {
  name: 'App',
  components:{
    MyCmp
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
