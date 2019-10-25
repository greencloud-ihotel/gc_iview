<template>
  <div>
    <div class="data">{{ dates }}</div>
    <date-pickers v-model="dates"></date-pickers>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dates: {},
      options: {
        startLabel: "开始时间:",
        endLabel: "开始时间:"
      }
    };
  }
};
</script>

<style></style>
