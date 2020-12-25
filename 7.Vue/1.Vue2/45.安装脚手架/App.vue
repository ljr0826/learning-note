<template>
  <div>我是app组件{{message}}</div>
</template>

<script>
export default {
    data(){
        return{
            message:"不能放弃"
        }
    }

}
</script>

<style>
div{
    background-color: red;
}
</style>