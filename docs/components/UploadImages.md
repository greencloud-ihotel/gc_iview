# UploadImages

## 概述

Upload 上传组件例子封装,主要用于上传图片，一般用在表单中。
扩展自 [iview upload](https://www.iviewui.com/components/upload) 可直接使用 upload 的所有 props。

## 示例

<demo-block title='1. 基础用法' desc='上传图片组件的基本用法,默认产生一个带逗号分隔的字符串，请和后端约定好此格式'>
  <div slot='demo'><UploadImages-1></UploadImages-1></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/UploadImages/1.vue

  </div>
</demo-block>

## API

### props

| 属性   | 说明                                        | 是否必传 | 是否 iview 参数 |
| ------ | ------------------------------------------- | -------- | --------------- |
| list   | 上传图片列表，支持 v-model                  | 是       | 否              |
| max    | 上传图片的最大个数                          | 否       | 否              |
| action | 上传地址，默认为 /file/files,代理请自行配置 | 否       | 否              |

```

```
