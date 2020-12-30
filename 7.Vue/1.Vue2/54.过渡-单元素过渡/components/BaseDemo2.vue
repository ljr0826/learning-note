<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition name="box1">
      <div class="box" v-show="show">hello world</div>
    </transition>
    <transition name="box2">
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
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
  border: 1px solid red;
  line-height: 100px;
  text-align: center;
  color: red;
}
.box1-enter,
.box1-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
.box1-enter-active,
.box1-leave-active {
  transition: all 2s;
}
.box1-enter-to,
.box1-leave {
  opacity: 1;
  transform: translateX(0px);
}
.box2-leave,
.box2-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.box2-leave-active,
.box2-enter-active {
  transition: all 2s;
}
.box2-leave-to,
.box2-enter {
  opacity: 0;
  transform: translateY(200px);
}
</style>