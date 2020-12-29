<template>
  <div>我是app组件，{{message}}，还有4天
      <p>我是App组件上的p元素</p>
      <base-son></base-son>
  </div>
</template>

<script>
//一个vue文件就是一个组件
//结构、样式、行为
//打开方式：在当前目录下打开cmd，输入vue serve
import baseSon from "./Son.vue";
export default {
    data(){
        return{
            message:"不能放弃"
        }
    },
    components:{
        baseSon
    } 

}
</script>

<style scoped>
div{
    background-color: red;
}
</style>