# TFSwitch

TFSwitch

```javascript
/*vue*/
<desc>
**基础用法**

- 最简单的使用方法

</desc>

<style>
.wrapper {
  font-size: 20px;
}
</style>

<template>
    <div>
        <div class='wrapper'>
            <div>
                <p>author: {{globalVariable}}</p>
                <button :style="style" @click="onClick">test</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      globalVariable,
      style: {
        color: "blue"
      }
    };
  },
  methods: {
    onClick() {
      alert("author: " + this.globalVariable);
      this.style.color = "red";
    }
  }
};
</script>
```
