<template>
  <div>
    <t-f-switch :updateUrl="updateUrl" :row="rowData"></t-f-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updateUrl: "/product-room/bks/channelInfo/updateChannel",
      rowData: {
        isHalt: "T"
      }
    };
  }
};
</script>

<style></style>
