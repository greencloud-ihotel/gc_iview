<template>
  <div class="super-search-transfer-list">
    <div class="flex-side super-search-transfer-header">
      <h1 class="super-search-transfer-title">
        {{ title }}
        <span>({{ selections.length }}/{{ list.length }})</span>
      </h1>
      <div class>
        <slot name="leftAction"></slot>
        <Button
          type="default"
          class="super-search-transfer-btn"
          :disabled="disabled"
          @click="onCheckAll(true)"
          >{{ btnText[0] }}</Button
        >
        <Button
          type="default"
          class="super-search-transfer-btn"
          :disabled="disabled"
          @click="onCheckAll(false)"
          >{{ btnText[1] }}</Button
        >
      </div>
    </div>
    <div class="super-search-transfer-searcher">
      <Input
        v-model.trim="keyword"
        search
        clearable
        :placeholder="placeholder"
        size="small"
      />
    </div>
    <p class="super-search-transfer-empty-text" v-show="!filterList.length">
      {{ emptyText }}
    </p>
    <ul class="super-search-transfer-list-content">
      <li
        class="super-search-transfer-list-item"
        v-for="(item, index) in filterList"
        :key="index"
        @click="check(item)"
      >
        <Checkbox v-model="item.checked"></Checkbox>
        <span :title="item.content">{{ item.content }}</span>
        <span class="no-event">{{ item.extra }}</span>
      </li>
      <Spin size="large" fix v-if="loading"></Spin>
    </ul>
  </div>
</template>
<script>
export default {
  name: "list",
  components: {},
  props: {
    title: String,
    disabled: Boolean,
    emptyText: String,
    placeholder: String,
    loading: Boolean,
    selection: Array,
    list: Array,
    btnText: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    selections: {
      get() {
        return this.selection;
      },
      set(val) {
        this.$emit("update:selection", val);
      }
    },
    selectionsToMap() {
      return this.filterList.reduce((map, item) => {
        map[item.key] = true;
        return map;
      }, {});
    },
    filterList() {
      return this.list.filter(item => {
        return item.content
          ? item.content.toUpperCase().includes(this.keyword.toUpperCase())
          : item;
      });
    },
    filterListKeyToMap() {
      return this.filterList.reduce((map, item) => {
        map[item.key] = true;
        return map;
      }, {});
    },
    listDescriptToMap() {
      return this.selected.list.reduce((map, item) => {
        map[item.key] = true;
        return map;
      }, {});
    }
  },
  methods: {
    check(item) {
      item.checked = !item.checked;
      this.changeList();
    },
    onCheckAll(flag) {
      this.filterList.forEach(e => {
        e.checked = flag || !e.checked;
      });
      this.changeList();
    },
    changeList() {
      this.selections = this.list.filter(e => e.checked);
    }
  }
};
</script>
