<template>
  <div>
    {{ datePickersObj }}
    <DatePickers v-model="datePickersObj"></DatePickers>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      datePickersObj: {
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment()
          .add(1, "d")
          .format("YYYY-MM-DD")
      }
    };
  }
};
</script>
