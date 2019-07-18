<template>
  <AutoForm v-model="autoForm.submitForm" :fields="autoForm.fields"></AutoForm>
</template>

<script>
export default {
  data() {
    return {
      autoForm: {
        submitForm: {},
        fields: []
      }
    };
  }
};
</script>

<style></style>
