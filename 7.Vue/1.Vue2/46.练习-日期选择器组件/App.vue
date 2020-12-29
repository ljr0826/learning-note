<template>
  <div class="app">
    <date-picker :date="date" />
  </div>
</template>

<script>
import DatePicker from "./DatePicker";
export default {
  components: {
    DatePicker
  },
  data() {
    return {
      date: new Date()
    };
  }
};
</script>

<style>
</style>