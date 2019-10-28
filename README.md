# 目录结构

```tree
gc_iview/
├── dist //构建目录
├── docs //文档源码
├── src //源码
└── types //为未来TS做准备
```

## **_使用方式_**

## 安装

```bash
npm install
```

## 启动项目

```bash
npm run dev  //启动示例
```

## 启动文档

```bash
npm run docs
```

## 构建

```bash
npm run build:doc //构建文档
npm run build:dev //构建库开发环境库 目录:dist/dev
npm run build:prod //构建生产环境库  目录:dist
```

## 文档发布

```bash
sh deploy_docs.sh
```
