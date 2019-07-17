<template>
  <div>
    <ul>
      <li
        v-for="(li, index) in list"
        :key="index"
        @click="chooseItem(li, index)"
        :class="['li', { active: activeIndex === index }]"
      >
        {{ label ? li[label] : li["label"] }}({{
          code ? li[code] : li["code"]
        }})
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    code: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      activeIndex: 0
    };
  },

  methods: {
    chooseItem(li, index) {
      this.activeIndex = index;
      this.$emit("chooseItem", [li, index]);
    }
  }
};
</script>
<style lang="less" scoped>
.li {
  cursor: pointer;
}
.active {
  background: #1e90ff;
  color: #fff;
}
</style>
