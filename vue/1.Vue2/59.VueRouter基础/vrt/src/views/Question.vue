<template>
  <div class="question" v-if="question">
    <div class="main">
      {{ question.title }}
    </div>
    <div class="other">
      <div
        v-for="other in otherQuestionList"
        :key="other.id"
        :class="other.type"
        @click="handleClick(other.id)"
      >
        {{ other.title }}
      </div>
      <!-- <div class="prev">{{ question.prev }}</div>
      <div class="next">{{ question.next }}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: null
    };
  },
  methods: {
    handleClick(id) {
      const { name } = this.$route;
      this.$router.push({
        name,
        params: { id }
      }); //跳转到目标地址
    },
    getDate() {
      const { id } = this.$route.params;
      this.$axios.get(`/question/${id}`).then(res => {
        this.question = res;
      });
    }
  },
  watch: {
    $route: {
      handler() {
        this.getDate();
      },
      immediate: true
    }
  },
  computed: {
    otherQuestionList() {
      const arr = [];
      if (this.question.prev) {
        const { prev, prevId } = this.question;
        arr.push({
          type: "prev",
          title: prev,
          id: prevId
        });
      }
      if (this.question.next) {
        const { next, nextId } = this.question;
        arr.push({
          type: "next",
          title: next,
          id: nextId
        });
      }
      return arr;
    }
  }
  //   mounted() {
  // console.log("vue实例对象", this.$router);
  // console.log(this.$route);
  // const { id } = this.$route.params;
  // // console.log(id);
  // this.$axios.get(`/question/${id}`).then(res => {
  //   this.question = res;
  // });
  //   }
};
</script>

<style scoped>
.main {
  margin-bottom: 200px;
}
.prev {
  float: left;
}
.next {
  float: right;
}
.prev,
.next {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: underline;
  color: #3385ff;
  cursor: pointer;
}
</style>