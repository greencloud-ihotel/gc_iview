<template>
  <div>
    <div class="demo-upload-list" v-for="item in uploadList" :key="item.id">
      <template v-if="item.status === 'finished'">
        <img :src="item.url" />
        <div class="demo-upload-list-cover">
          <Icon
            type="ios-eye-outline"
            @click.native="handleView(item.name)"
          ></Icon>
          <Icon
            type="ios-trash-outline"
            @click.native="handleRemove(item)"
          ></Icon>
        </div>
      </template>
      <template v-else>
        <Progress
          v-if="item.showProgress"
          :percent="item.percentage"
          hide-info
        ></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg', 'jpeg', 'png', '.ico']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :action="action"
      multiple
      name="files"
      type="drag"
      v-bind="$attrs"
      style="display: inline-block;width:58px;"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%" />
    </Modal>
  </div>
</template>
<script>
import _ from "lodash";
// import store from "store";
export default {
  name: "UploadImages",
  model: {
    prop: "list",
    event: "change"
  },
  props: {
    list: {
      type: String,
      required: true
    },
    path: {
      type: String
    },
    max: {
      type: Number
    },
    action: {
      type: String,
      default() {
        return "/file/files";
      }
    }
  },
  computed: {
    defaultList() {
      if (_.isEmpty(this.list)) {
        return [];
      } else {
        let arr = [];
        _.map(_.split(this.list, ","), val => {
          arr.push({
            name: val,
            url: val,
            status: "finished"
          });
        });
        return arr;
      }
    }
  },
  data() {
    return {
      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  methods: {
    handleView(name) {
      this.visible = true;
    },
    sync() {
      this.$emit(
        "change",
        _.join(_.map(this.$refs.upload.fileList, "url"), ",")
      );
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.sync();
      this.uploadList = this.$refs.upload.fileList;
    },
    handleSuccess(res, file) {
      if (res && res.result == 0) {
        const url = this.path ? _.get(res, this.path) : res.retVal[0];
        file.url = url;
        this.imgName = url;
        this.sync();
        this.uploadList = this.$refs.upload.fileList;
      } else {
        this.$Message.info({ content: res.msg });
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: file.name + "的文件名不正确",
        desc: "请上传jpg或者png结尾的图片"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件太大了",
        desc: file.name + "不能超过2M"
      });
    },
    clearUploadList() {
      this.uploadList = [];
    },
    handleBeforeUpload() {
      if (this.max > 0) {
        const check = this.uploadList.length < this.max;
        if (!check) {
          this.$Notice.warning({
            title: `最多上传${this.max}张图片`
          });
        }
        return check;
      }
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
