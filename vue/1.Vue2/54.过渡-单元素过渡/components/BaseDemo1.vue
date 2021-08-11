<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition>
      <div class="box" v-show="show">hello world</div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true
    };
  }
};
</script>
<style scoped>
button {
  margin-bottom: 10px;
}
.box {
  width: 100px;
  height: 100px;
  border: 1px solid red;
  line-height: 100px;
  text-align: center;
  color: red;
}
.v-enter {
  opacity: 0;
  transform: translateX(200px);
}
.v-enter-active {
  transition: all 1s;
}
.v-enter-to {
  opacity: 1;
  transform: translateX(0px);
}
.v-leave {
  opacity: 1;
  transform: translateY(0px);
}
.v-leave-active {
  transition: all 1s;
}
.v-leave-to {
  opacity: 0;
  transform: translateY(200px);
}
</style>