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
      :rules="rule"
    >
      <el-form-item label="文字内容" prop="text">
        <el-input v-model="form.text" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="文字颜色" prop="color">
        <el-input v-model="form.color">
          <el-color-picker
            slot="append"
            v-model="form.color"
            show-alpha
            size="mini"
          ></el-color-picker
        ></el-input>
      </el-form-item>
      <el-form-item label="文字背景" prop="background">
        <el-input v-model="form.background">
          <el-color-picker
            slot="append"
            v-model="form.background"
            show-alpha
            size="mini"
          ></el-color-picker
        ></el-input>
      </el-form-item>
      <el-form-item label="文字字体" prop="fontFamily">
        <el-select v-model="form.fontFamily">
          <el-option
            v-for="item in fontFamily"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文字大小" prop="fontSize">
        <el-input v-model="form.fontSize"></el-input>
      </el-form-item>
      <el-form-item label="文字字重" prop="fontWeight">
        <el-slider
          v-model="form.fontWeight"
          :step="100"
          :min="100"
          :max="1000"
          show-stops
          :marks="marks"
        >
        </el-slider>
      </el-form-item>
      <el-form-item label="文字阴影" prop="textShadow">
        <el-input v-model="form.textShadow" disabled>
          <el-color-picker
            slot="append"
            v-model="textShadow"
            show-alpha
            size="mini"
          ></el-color-picker>
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel" size="mini">取 消</el-button>
      <el-button type="danger" @click="yes" size="mini">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
const fontList = require("font-list");
export default {
  name: "text-dialog",
  data() {
    return {
      form: {
        text: "",
        color: "",
        background: "",
        fontFamily: "",
        fontSize: 0,
        fontWeight: 0,
        textShadow: "",
      },
      marks: {
        300: "纤细",
        400: "默认",
        700: "加粗",
        900: "最粗",
      },
      rule: {
        text: [{ required: true, message: "请输入文字内容", trigger: "blur" }],
        color: [{ required: true, message: "请输入文字颜色", trigger: "blur" }],
        fontFamily: [
          { required: true, message: "选择文字字体", trigger: "blur" },
        ],
        fontSize: [
          { required: true, message: "请输入文字大小", trigger: "blur" },
          {
            min: 2,
            max: 3,
            message: "请输入10-999之间的数字",
            trigger: "blur",
          },
        ],
        fontWeight: [
          { required: true, message: "请输入文字大小", trigger: "blur" },
        ],
        textShadow: [
          {
            required: true,
            message: "请选择文字阴影颜色",
            trigger: "blur",
          },
        ],
      },
      fontFamily: [],
      textShadow: "",
    };
  },
  props: ["defaults", "dialogVisible"],

  methods: {
    yes() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.$emit("yes", this.form);
          this.form = {
            text: "",
            color: "",
            background: "",
            fontFamily: "",
            fontSize: 0,
            textShadow: "",
          };
          this.$emit("update:dialogVisible", false);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.form = {
        text: "",
        color: "",
        background: "",
        fontFamily: "",
        fontSize: 0,
        textShadow: "",
      };
      this.$emit("update:dialogVisible", false);
    },
    async getFontFamily() {
      this.fontFamily = await fontList.getFonts({ disableQuoting: true });
      console.log(this.fontFamily);
    },
  },
  created() {
    this.getFontFamily();
  },
  mounted() {},
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
    textShadow(newVal) {
      this.form.textShadow = `0 0 3px ${newVal}`;
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
