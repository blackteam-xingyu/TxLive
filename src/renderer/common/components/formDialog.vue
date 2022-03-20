<template>
  <el-dialog
    :title="title"
    :visible.sync="dialog"
    center
    @open="open"
    width="30%"
    :modal-append-to-body="false"
    close-on-press-escape
  >
    <el-form
      ref="dialogForm"
      label-position="right"
      label-width="85px"
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
            label="jtem.label"
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
export default {
  name: "form-dialog",
  data() {
    return {
      form: {},
      fileField: "",
      dialog: false,
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      // this.$refs.dialogForm.resetFields();
      this.$emit("cancel");
    },
    open() {
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
  },
  created() {},
  mounted() {},
  watch: {
    dialogVisible(newVal) {
      this.dialog = newVal;
    },
  },
};
</script>
<style lang="scss" scoped></style>
