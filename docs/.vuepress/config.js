module.exports = {
  title: "gc_iview",
  description: "gc_iview说明文档",
  base: "/gc_iview",
  themeConfig: {
    displayAllHeaders: true,
    sidebarDepth: 0,
    sidebar: [
      {
        title: "概览",
        collapsable: true,
        children: [
          "overview/quickstart",
          "overview/install",
          "overview/use",
          "overview/log"
        ]
      },
      {
        title: "组件",
        children: [
          "components/AutoTable",
          "components/EditTable",
          "components/CurdLine",
          "components/FilterSearch",
          "components/DatePickers",
          "components/TFSwitch",
          "components/SuperSearch",
          "components/UploadImages",
          "components/AutoForm"
        ]
      },
      {
        title: "工具",
        children: ["libs/regExp"]
      }
    ],
    nav: [
      { text: "入门", link: "/" },
      { text: "更新日志", link: "https://google.com" }
    ]
  }
};
