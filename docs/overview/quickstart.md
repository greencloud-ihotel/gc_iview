## 使用之前

- 高效的开发，离不开基础工程的搭建。在开始使用 gc_view 之前，有必要先了解以下基础知识，我们也假设您已经写过 Vue，并掌握了下面的内容。

1. [vue](https://cn.vuejs.org/)

2. [Vue 组件](https://cn.vuejs.org/v2/guide/components-registration.html)

3. [单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)

4. [ivew](https://www.iviewui.com/docs/guide/start)

- 以下概念贯穿 vue/iView 前后，建议开发者花点时间来了解。

1. [props](https://cn.vuejs.org/v2/guide/components-props.html) --- 数据传递

2. [slot](https://cn.vuejs.org/v2/api/#slot) --- 内容分发

3. [render](https://cn.vuejs.org/v2/api/#render)

4. [jxs](https://cn.vuejs.org/v2/guide/render-function.html#ad)

5. 事件及事件机制

## 组件编写规范

1. 1.必须使用大写字母开头
2. 2.单一职责,必须具有完整的输入输出流程
3. 3.简单明了的使用方式
4. 4.组件首先抽离到自身项目的 components,稳定下来后,把全局通用的组件整合到 gc_iviewyy
