<template>
  <div>
    <UploadImages :list="list"></UploadImages>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[
        "http://a.jpg","http://b.jpg"
      ]
    }
  }
}
</script>

<style>

</style>
