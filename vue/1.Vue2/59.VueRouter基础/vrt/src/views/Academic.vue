<template>
  <div>
    <ul>
      <router-link
        tag="li"
        :to="{ name: 'question', params: { id: question.id } }"
        v-for="question in questionList"
        :key="question.id"
      >
        {{ question.title }}
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionList: []
    };
  },
  mounted() {
    // console.log(this.$route);
    this.$axios.get("/question").then(res => {
      //模拟请求后端数据，/代表主路径
      this.questionList = res;
      // console.log(res);
    });
  }
};
</script>

<style scoped>
li {
  margin-bottom: 15px;
  cursor: pointer;
}
li:hover {
  text-decoration: underline;
  color: #3385ff;
}
</style>