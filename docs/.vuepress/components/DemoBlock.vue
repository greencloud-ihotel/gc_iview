<template>
  <div class="content">
    <div class="contain">
      <slot class="demo" name="demo"></slot>
      <slot class="code" v-if="show" name="code"></slot>
    </div>
    <div
      class="demo-block-control"
      :class="{ active: highLight }"
      @mouseenter="textToggle(true)"
      @mouseleave="textToggle(false)"
      @click="toggle"
    >
      <Icon v-if="show" type="md-arrow-dropup" />
      <Icon v-else type="md-arrow-dropdown" />
      <span v-if="textShow"> 显示代码</span>
      <span v-else> 关闭代码</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      textShow: false,
      highLight: false
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
      this.textShow = !this.textShow;
    },
    textToggle(highLight) {
      this.textShow = !this.textShow;
      this.highLight = highLight;
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  .active {
    i,
    span {
      color: #409eff;
      background-color: #f9fafc;
    }
  }
  .contain {
    padding: 24px;
  }
  .demo-block-control {
    border-top: 1px solid #eaeefb;
    height: 44px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;

    i {
      font-size: 16px;
      line-height: 44px;
      -webkit-transition: 0.3s;
      transition: 0.3s;
      margin-right: 40px;
    }
    span {
      position: absolute;
      -webkit-transform: translateX(-30px);
      transform: translateX(-30px);
      font-size: 14px;
      line-height: 44px;
      -webkit-transition: 0.3s;
      transition: 0.3s;
      display: inline-block;
    }
  }
}
</style>
