<template>
  <div class="super-search-transfer-list">
    <div class="flex-side super-search-transfer-header">
      <h1 class="super-search-transfer-title">
        {{title}}
        <span>({{selections.length}}/{{selfWholeList.length}})</span>
      </h1>
      <div class>
        <Button type="default" class="super-search-transfer-btn" :disabled="disabled" @click="onCheckAll(true)">全选</Button>
        <Button type="default" class="super-search-transfer-btn" :disabled="disabled" @click="onCheckAll(false)">反选</Button>
      </div>
    </div>
    <div class="super-search-transfer-searcher">
      <Input v-model.trim="keyword" search clearable placeholder="请输入搜索内容" size="small" @on-change="changeKeyword" />
    </div>
    <p class="super-search-transfer-empty-text" v-show="!filterList.length">{{emptyText}}</p>
    <ul class="super-search-transfer-list-content">
      <li class="super-search-transfer-list-item" v-for="(item, index) in filterList" :key="index" @click="check(item)">
        <Checkbox v-model="item.checked"></Checkbox>
        <span :title="item.content">{{item.content}}</span>
        <span class="no-event">{{item.extra}}</span>
      </li>
    </ul>
    <Spin size="large" fix v-if="loading"></Spin>
  </div>
</template>
<script>
export default {
  name: 'list',
  components: {
  },
  props: {
    title: String,
    disabled: Boolean,
    emptyText: {
      type: String,
      default: () => '暂无数据'
    },
    loading: Boolean,
    selection: Array,
    wholeList: Array,
    list: Array
  },
  data () {
    return {
      keyword: '',
      selections: [],
      selfWholeList: [],
      filterList: []
    }
  },
  methods: {
    check(item) {
      console.log(item);
      item.checked = !item.checked;
      this.changeList()
    },
    onCheckAll(flag) {
      flag ? this.filterList.forEach(e => {
          e.checked = true;
        }) : this.filterList.forEach(e => {
          e.checked = !e.checked;
        })
      this.changeList();
    },
    changeList() {
      this.selections = this.selfWholeList.filter(e => e.checked);
      this.$emit('update:selection', this.selections)
    },
    changeKeyword(e) {
      // console.log(e);
      let value = e.target.value.trim().toUpperCase();
      if (!value) {
        this.filterList = this.selfWholeList;
        return;
      }
      this.filterList = this.selfWholeList.filter(e => e.content.toUpperCase().indexOf(value) !== -1);
    }
  },
  watch: {
    wholeList (val) {
      this.selfWholeList = val
    },
    selection (val) {
      this.selections = val
    },
    list (val) {
      this.filterList = val
    }
  }
}

</script>
