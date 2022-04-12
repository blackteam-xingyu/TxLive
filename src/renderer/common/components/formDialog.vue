<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    center
    @open="open"
    @close="cancel"
    width="460px"
    :modal-append-to-body="false"
    close-on-press-escape
    :close-on-click-modal="false"
  >
    <el-form
      ref="dialogForm"
      label-position="right"
      label-width="30%"
      status-icon
      size="small"
      :model="form"
    >
      <el-form-item
        v-for="(item, index) in items"
        :key="index"
        :required="item.require"
        :rules="item.rule"
        :label="item.label"
      >
        <el-select v-if="item.formtype == 'select'" v-model="form[item.field]">
          <el-option
            v-for="(jtem, jndex) in item.options"
            :label="jtem.label"
            :value="jtem.value"
            :key="jndex"
          ></el-option>
        </el-select>
        <el-select
          v-else-if="item.formtype == 'selectWindow'"
          v-model="form[item.field]"
        >
          <el-option
            v-for="(jtem, jndex) in windowSelectOptions"
            :label="jtem.label"
            :value="jtem.value"
            :key="jndex"
          ></el-option>
        </el-select>
        <el-date-picker
          v-else-if="item.formtype == 'date-picker'"
          :type="item.dateOptions.type"
          :format="item.dateOptions.format"
          :value-format="item.dateOptions.valueFormat"
          :placeholder="item.dateOptions.placeholder"
          v-model="form[item.field]"
          style="width: 100%"
        ></el-date-picker>
        <el-time-picker
          v-else-if="item.formtype == 'time-picker'"
          :placeholder="item.timeOptions.placeholder"
          :picker-options="item.timeOptions.pickerOptions"
          v-model="form[item.field]"
          style="width: 100%"
        ></el-time-picker>
        <el-checkbox-group
          v-model="form[item.field]"
          v-else-if="item.formtype == 'checkbox'"
        >
          <el-checkbox
            v-for="(jtem, jndex) in item.checkboxOptions"
            :label="jtem.label"
            :key="jndex"
          ></el-checkbox>
        </el-checkbox-group>
        <el-radio-group
          v-else-if="item.formtype == 'radio-group'"
          v-model="form[item.field]"
        >
          <el-radio
            v-for="(jtem, jndex) in item.radioGroupOptions"
            :label="jtem.label"
            :key="jndex"
          ></el-radio>
        </el-radio-group>
        <el-input
          v-else-if="item.formtype == 'textarea'"
          type="textarea"
          v-model="form[item.field]"
        ></el-input>

        <el-input
          v-else-if="item.formtype == 'file'"
          v-model="form[item.field]"
        >
          <el-button
            slot="append"
            icon="el-icon-folder-opened"
            @click="btnChange(item.field)"
          ></el-button>
        </el-input>
        <el-slider
          v-else-if="item.formtype == 'slider'"
          v-model="form[item.field]"
          :min="item.sliderOptions.min"
          :max="item.sliderOptions.max"
          :show-input="item.sliderOptions.showInput"
          :step="item.sliderOptions.step ? item.sliderOptions.step : 0.01"
        >
        </el-slider>
        <el-input
          v-else-if="item.formtype == 'colorPicker'"
          v-model="form[item.field]"
        >
          <el-color-picker
            slot="append"
            v-model="form[item.field]"
            show-alpha
            size="mini"
          ></el-color-picker
        ></el-input>
        <el-input v-else v-model="form[item.field]"></el-input>
        <input
          v-if="item.formtype == 'file'"
          type="file"
          id="file"
          hidden
          @change="fileChange"
          :webkitdirectory="item.fileOptions.webkitdirectory"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel" size="mini">取 消</el-button>
      <el-button type="danger" @click="yes" size="mini">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
const { desktopCapturer } = require("electron");
export default {
  name: "form-dialog",
  data() {
    return {
      form: {},
      fileField: "",
      // dialog: false,
      windowSelectOptions: [],
    };
  },
  props: ["defaults", "items", "dialogVisible", "title"],
  /*
   *defaults           默认值
   *items              组件对象
   *dialogVisible      dialog开关
   *title              dialog标题
   *yes                确认按钮事件
   *cancel             取消按钮事件
   */
  methods: {
    yes() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.$emit("yes", this.form);
          this.$emit("update:dialogVisible", false);
        } else {
          console.log("error submit!!");
          this.$message.error("校验失败，请检查填写错误！");
          return false;
        }
      });
    },
    cancel() {
      this.$emit("update:dialogVisible", false);
    },
    open() {
      this.getWindows();
      console.log("this.items\n", this.items);
      this.items.forEach((element) => {
        this.$set(this.form, element.field, null);
      });
      for (const key in this.defaults) {
        console.log(`this.defaults[${key}]`, this.defaults[key]);
        this.form[key] = this.defaults[key];
      }
      console.log("this.form\n", this.form);
    },
    fileChange(e) {
      try {
        const fu = document.getElementById("file");
        if (fu == null) return;
        this.form[this.fileField] = fu.files[0].path;
        console.log(fu.files[0].path);
      } catch (error) {
        console.debug("choice file err:", error);
      }
    },
    btnChange(val) {
      var file = document.getElementById("file");
      this.fileField = val;
      file.click();
    },
    async getWindows() {
      const windows = await desktopCapturer.getSources({
        types: ["window", "screen"],
      });
      this.windowSelectOptions = [];
      windows.forEach((item) => {
        this.windowSelectOptions.push({
          label: item.name,
          value: item.id,
        });
      });
    },
  },
  created() {},
  mounted() {},
  watch: {},
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
