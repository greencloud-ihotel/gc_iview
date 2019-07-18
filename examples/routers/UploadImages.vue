<template>
  <div>
    <div style="padding:10px 0;">数据:{{ list }}</div>
    <UploadImages v-model="list" :headers="headers"></UploadImages>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:
        "https://dwz.cn/hZXJG01l,https://dwz.cn/EE8PYP6Z,https://dwz.cn/KGn7JMvg",
      headers: {
        Authorization: "test Authorization"
      }
    };
  }
};
</script>
