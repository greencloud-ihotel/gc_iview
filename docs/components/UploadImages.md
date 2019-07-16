# UploadImages基本用法

## 概述

Upload 上传组件例子封装,主要用于上传图片，一般用在表单中。
扩展自 [iview upload](https://www.iviewui.com/components/upload) 可直接使用 upload 的所有 props。

## 示例

1.基础用法:状态开关的基础用法。

---

```javascript
/*vue*/
<desc>
  <p>基础用法:</p>
  <p>UploadImages基本用法。</p>
</desc>
<template>
  <div>
    <div style="padding:10px 0;">数据:{{list}}</div>
    <upload-images v-model="list" :headers="headers"></upload-images>
  </div>
</template>

<script>
export default {
  data(){
    return {
     list:"https://dwz.cn/hZXJG01l,https://dwz.cn/EE8PYP6Z,https://dwz.cn/KGn7JMvg",
      headers:{
        Authorization:"test Authorization"
      }
    }
  }
}
</script>
```

---

## API

### props

| 属性   | 说明                                        | 是否必传 | 是否 iview 参数 |
| ------ | ------------------------------------------- | -------- | --------------- |
| list   | 上传图片列表，支持v-model                   | 是       | 否              |
| max    | 上传图片的最大个数                          | 否       | 否              |
| action | 上传地址，默认为 /file/files,代理请自行配置 | 否       | 否              |
