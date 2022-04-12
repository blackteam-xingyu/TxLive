<template>
  <el-dialog
    title="图片设置"
    :visible.sync="dialogVisible"
    center
    @close="cancel"
    width="460px"
    :modal-append-to-body="false"
    close-on-press-escape
    :close-on-click-modal="false"
    :rule="rule"
  >
    <el-form
      ref="dialogForm"
      label-position="right"
      label-width="85px"
      status-icon
      size="small"
      :model="form"
    >
      <el-form-item v-if="form.photoTypeID == 0" label="图片地址" prop="srcUrl">
        <el-input v-model="form.srcUrl[0]" type="primary">
          <el-button
            slot="append"
            icon="el-icon-folder-opened"
            @click="btnChange(0)"
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item v-if="form.photoTypeID == 1" label="图片地址" prop="srcUrl">
        <el-button
          icon="el-icon-circle-plus-outline"
          circle
          @click="addItem"
        ></el-button>
        <el-input
          v-model="form.srcUrl[index]"
          v-for="(item, index) in form.srcUrl"
          :key="photoIndex + index"
        >
          <el-button
            slot="prepend"
            icon="el-icon-remove"
            @click="deleteItem(index)"
          ></el-button>
          <el-button
            slot="append"
            icon="el-icon-folder-opened"
            @click="btnChange(index)"
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item v-if="form.photoTypeID == 2" label="颜色选择" prop="srcUrl">
        <el-input v-model="form.srcUrl[0]">
          <el-color-picker
            slot="append"
            v-model="form.srcUrl[0]"
            show-alpha
            size="mini"
          ></el-color-picker
        ></el-input>
      </el-form-item>
      <el-form-item label="图片类型" prop="photoTypeID">
        <el-radio-group v-model="form.photoTypeID">
          <el-radio-button :label="0">图片</el-radio-button>
          <el-radio-button :label="1">幻灯片</el-radio-button>
          <el-radio-button :label="2">纯色</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="窗体宽度" prop="sizeW">
        <el-slider v-model="form.sizeW" :step="1" :max="MaxWidth" show-input>
        </el-slider>
      </el-form-item>
      <el-form-item label="窗体高度" prop="sizeH">
        <el-slider v-model="form.sizeH" :step="1" :max="MaxHeight" show-input>
        </el-slider>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel" size="mini">取 消</el-button>
      <el-button type="danger" @click="yes" size="mini">确 定</el-button>
    </span>
    <input
      :key="photoIndex"
      type="file"
      id="filePhoto"
      hidden
      @change="fileChange"
    />
  </el-dialog>
</template>
<script>
const fs = require("fs");
const configs = fs.readFileSync(
  "C:/ProgramData/TxLive/PCoptions.conf",
  "utf-8"
);
const config = JSON.parse(configs);
export default {
  name: "photo-dialog",
  data() {
    return {
      form: {
        srcUrl: [],
        photoTypeID: 0,
        sizeW: 0,
        sizeH: 0,
      },
      dialog: false,
      MaxWidth: [],
      MaxHeight: [],
      fileField: null,
      rule: {
        sizeW: [{ required: true, message: "请输入窗体宽度", trigger: "blur" }],
        sizeH: [{ required: true, message: "请输入窗体高度", trigger: "blur" }],
      },
      photoIndex: 0,
    };
  },
  props: ["defaults", "dialogVisible"],

  methods: {
    yes() {
      console.log("yes", this.form);
      this.$emit("yes", this.form);
      this.form = {
        srcUrl: [],
        photoTypeID: 0,
        sizeW: 0,
        sizeH: 0,
      };
      this.$emit("update:dialogVisible", false);
    },
    cancel() {
      this.form = {
        srcUrl: [],
        photoTypeID: 0,
        sizeW: 0,
        sizeH: 0,
      };
      this.$emit("update:dialogVisible", false);
    },
    getSelection() {
      // console.log("getSelection", remote.screen.getPrimaryDisplay());
      const maxW = config.dpiWidth;
      const maxH = config.dpiHeight;
      console.log("maxW\n", maxW, "\nmaxH\n", maxH);
      this.MaxWidth = maxW;
      this.MaxHeight = maxH;
    },
    btnChange(val) {
      var file = document.getElementById("filePhoto");
      this.fileField = val;
      file.click();
    },
    fileChange(e) {
      try {
        const fu = document.getElementById("filePhoto");
        if (fu == null) return;
        console.log("fileChange", this.form.srcUrl);
        this.form.srcUrl[this.fileField] = fu.files[0].path;
        console.log(this.fileField, fu.files[0].path);
        this.photoIndex++;
      } catch (error) {
        console.error("choice file err:", error);
      }
    },
    addItem() {
      this.form.srcUrl.push("");
    },
    deleteItem(index) {
      this.form.srcUrl.splice(index, 1);
    },
  },
  created() {},
  mounted() {
    this.getSelection();
  },
  watch: {
    dialogVisible(newVal) {
      this.dialog = newVal;
    },
    defaults: {
      handler(newVal) {
        if (newVal) {
          for (const key in newVal) {
            const element = newVal[key];
            this.form[key] = element;
          }
        }
      },
      immediate: true,
      deep: true,
    },
    "form.photoTypeID": {
      handler(newVal) {
        if (newVal === 0) {
          this.form.srcUrl = [];
          this.form.srcUrl.push("");
        } else if (newVal === 1) {
          this.form.srcUrl = [];
          this.form.srcUrl.push("");
        } else if (newVal === 2) {
          this.form.srcUrl = [];
          this.form.srcUrl.push("");
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.el-input-group--append,
.el-input-group--prepend {
  display: inline-flex;
  /deep/.el-input__inner {
      width: calc(100% - 65.6px);
  }
}
/deep/.el-input-group__append,
.el-input-group__prepend {
  padding: 0;
  height: 32px;
  display: inline-block;
}
/deep/.el-color-picker--mini {
  height: 32px;
  width: 65.6px;

  .el-color-picker__trigger {
    height: 100%;
    width: 100%;
    padding: 0;
    border: none;
  }
  .el-color-picker__panel {
    padding: 0;
  }
}
</style>
