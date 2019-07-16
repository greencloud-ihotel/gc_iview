<template>
  <div>
    <div>数据:{{list}}</div>
    <UploadImages v-model="list" :headers="headers"></UploadImages>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:"http://a.jpg,http://b.jpg,http://c.jpg",
      headers:{
        Authorization:"test Authorization"
      }
    }
  }
}
</script>
