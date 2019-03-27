<template>
  <div class="flex-side super-search-container ivu-transfer super-search-transfer super-search-container">
    <List ref="left" title="待选" :whole-list="unselected.wholeList" :list="unselected.list" :selection.sync="unselected.selection" :loading="loading"></List>
    <div class="super-search-transfer-indicator-list">
      <Button :type="moveToRightClass.allType" class="super-search-transfer-indicator" :disabled="moveToRightClass.allDisabled" @click="moveToRightAll">
        <Icon type="ios-arrow-forward" />
        <Icon type="ios-arrow-forward" style="margin-left: -6px;" />
      </Button>
      <Button :type="moveToRightClass.singleType" class="super-search-transfer-indicator" :disabled="moveToRightClass.singleDisabled" @click="moveToRight">
        <Icon type="ios-arrow-forward" />
      </Button>
      <Button :type="moveToLeftClass.singleType" class="super-search-transfer-indicator" :disabled="moveToLeftClass.singleDisabled" @click="moveToLeft">
        <Icon type="ios-arrow-back" />
      </Button>
      <Button :type="moveToLeftClass.allType" class="super-search-transfer-indicator" :disabled="moveToLeftClass.allDisabled" @click="moveToLeftAll">
        <Icon type="ios-arrow-back" style="margin-right: -6px;" />
        <Icon type="ios-arrow-back" />
      </Button> 
    </div>
    <List ref="right" title="已选" :whole-list="selected.wholeList" :list="selected.list" :selection.sync="selected.selection"></List>
  </div>
</template>
<script>
  import List from './list.vue'
  export default {
    name: 'transfer',
    components: {
      List
    },
    props: {
      loading: Boolean,
      untransferred: {
        type: Object,
        default: () => {
          return {
            list: [],
            wholeList: []
          }
        }
      },
      transferred: {
        type: Object,
        default: () => {
          return {
            list: [],
            wholeList: []
          }
        }
      }     
    },
    data () {
      return {
        //  未选列表
        unselected: {
          selection: [],
          list: [],
          wholeList: []
        },
        // 已选列表
        selected: {
          selection: [],
          list: [],
          wholeList: []
        }
      }      
    },
    computed: {
      moveToRightClass() {
        let hasItem = !!this.unselected.list.length,
          hasSelection = !!this.unselected.selection.length,
          primary = "primary",
          defaults = "default";

        return {
          allType: hasItem ? primary : defaults,
          allDisabled: !this.unselected.loading ? (hasItem ? false : true) : true,
          singleType: hasSelection ? primary : defaults,
          singleDisabled: hasSelection ? false : true
        };
      },
      moveToLeftClass() {
        let hasItem = !!this.selected.list.length,
          hasSelection = !!this.selected.selection.length,
          primary = "primary",
          defaults = "default";

        return {
          allType: hasItem ? primary : defaults,
          allDisabled: !this.unselected.loading ? (hasItem ? false : true) : true,
          singleType: hasSelection ? primary : defaults,
          singleDisabled: hasSelection ? false : true
        };
      }
    },
    methods: {
      // 从某数组移除同时存在于另一数组的数据
      remove(outter, inner, callback) {
        let i, which, index;
        for (i = 0; i < inner.length; i++) {
          which = inner[i];
          index = outter.indexOf(which);
          index !== -1 && outter.splice(index, 1) && i--;
          typeof callback === "function" && callback(which);
        }
      },
      updateList() {
        this.$emit('update:transferred', this.selected)
        this.$emit('update:untransferred', this.unselected)
      },
      moveToRight() {
        let i,
          arr = [],
          which,
          index;
        for (i = 0; i < this.unselected.selection.length; i++) {
          which = this.unselected.selection.splice(i, 1)[0];
          which.checked = false;
          index = this.unselected.list.indexOf(which);
          index !== -1 && this.unselected.list.splice(index, 1);
          index = this.unselected.wholeList.indexOf(which);
          index !== -1 && this.unselected.wholeList.splice(index, 1);
          this.selected.wholeList.every(e => e.code !== which.code) &&
            arr.push(which);
          i--;
        }
        this.$nextTick(() => {
          this.selected.list = arr.concat(this.selected.list);
          this.selected.wholeList = arr.concat(this.selected.wholeList);
          
          this.updateList()
        });
      },
      // 移动左侧所选及当前展示列表至右侧
      moveToRightAll() {
        this.remove(this.unselected.list, this.unselected.selection, which => {
          which.checked = false;
        });
        this.remove(this.unselected.wholeList, this.unselected.selection);

        this.$nextTick(() => {
          let concats = this.unselected.list.concat(this.unselected.selection);
          // concats.concat(this.selected.list).filter(e => this.selected.list.every(se => se.code !== e.code))
          concats.concat(this.selected.list).forEach(e => {
            this.selected.list.every(se => se.code !== e.code) &&
              this.selected.list.unshift(e);
          });
          concats.concat(this.selected.wholeList).forEach(e => {
            this.selected.wholeList.every(se => se.code !== e.code) &&
              this.selected.wholeList.unshift(e);
          });

          this.unselected.selection = [];
          if (this.unselected.list.length === this.unselected.wholeList.length) {
            this.unselected.list = [];
            this.unselected.wholeList = [];
            this.updateList()
            return;
          }
          this.remove(this.unselected.wholeList, this.unselected.list);
          this.unselected.list = [];
          this.updateList()
        });
      },
      // 移至左侧
      moveToLeft() {
        // console.log(this.selected.selection)
        let i,
          arr = [],
          which,
          index;
        for (i = 0; i < this.selected.selection.length; i++) {
          which = this.selected.selection.splice(i, 1)[0];
          which.checked = false;
          index = this.selected.list.indexOf(which);
          index !== -1 && this.selected.list.splice(index, 1);
          index = this.selected.wholeList.indexOf(which);
          index !== -1 && this.selected.wholeList.splice(index, 1);
          this.unselected.wholeList.every(e => e.code !== which.code) &&
            arr.push(which);
          i--;
        }
        this.$nextTick(() => {
          this.unselected.list = arr.concat(this.unselected.list);
          this.unselected.wholeList = arr.concat(this.unselected.wholeList);
          
          this.updateList()
        });
      },
      // 移动右侧所选及当前展示列表至左侧
      moveToLeftAll(callback) {
        this.remove(this.selected.list, this.selected.selection, which => {
          which.checked = false;
        });
        this.remove(this.selected.wholeList, this.selected.selection);

        this.$nextTick(() => {
          let concats = this.selected.list.concat(this.selected.selection);

          concats.concat(this.unselected.list).forEach(e => {
            this.unselected.list.every(se => se.code !== e.code) &&
              this.unselected.list.unshift(e);
          });
          concats.concat(this.unselected.wholeList).forEach(e => {
            this.unselected.wholeList.every(se => se.code !== e.code) &&
              this.unselected.wholeList.unshift(e);
          });

          this.selected.selection = [];
          if (this.selected.list.length === this.selected.wholeList.length) {
            this.selected.list = [];
            this.selected.wholeList = [];
            typeof callback === "function" && callback();
            
            this.updateList()
            return;
          }
          this.remove(this.selected.wholeList, this.selected.list);
          this.updateList()
          this.selected.list = [];
        });
      },
      clear() {
        this.$refs.left.keyword = "";
        this.$refs.right.keyword = "";
        this.unselected.wholeList.forEach(e => {
          e.checked = false;
        });
        this.selected.wholeList.forEach(e => {
          e.checked = false;
        });
        this.unselected.selection = [];
        this.selected.selection = [];
      }
    },
    watch: {
      loading (val) {
        if(!val) return
        this.$refs.left.keyword = this.$refs.right.keyword = ''
      },
      'untransferred.wholeList' (val) {
        this.unselected.wholeList = val
      },
      'untransferred.list' (val) {
        this.unselected.list = val
      },
      'transferred.wholeList' (val) {
        this.selected.wholeList = val
      },
      'transferred.wholeList' (val) {
        this.selected.list = val
      }
    }
  }
</script>
