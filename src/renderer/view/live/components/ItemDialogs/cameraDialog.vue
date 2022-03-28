<template>
  <el-dialog
    title="摄像头设置"
    :visible.sync="dialog"
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
      <el-form-item label="相机选择" prop="cameraID">
        <el-select v-model="form.cameraID">
          <el-option
            v-for="(item, index) in cameras"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="当前缩放比">
        <el-radio-group v-model="bili">
          <el-radio-button :label="100">100%</el-radio-button>
          <el-radio-button :label="125">125%</el-radio-button>
          <el-radio-button :label="150">150%</el-radio-button>
          <el-radio-button :label="175">175%</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分辨率宽" prop="dpiWidth">
        <el-select v-model="form.dpiWidth">
          <el-option
            v-for="(item, index) in DpiWidth"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分辨率高" prop="dpiHeight">
        <el-select v-model="form.dpiHeight">
          <el-option
            v-for="(item, index) in DpiHeight"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="左右镜像" prop="isCameraY">
        <el-radio v-model="form.isCameraY" :label="true">是</el-radio>
        <el-radio v-model="form.isCameraY" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="上下镜像" prop="isCameraX">
        <el-radio v-model="form.isCameraX" :label="true">是</el-radio>
        <el-radio v-model="form.isCameraX" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="旋转角度" prop="angle">
        <el-radio-group v-model="form.angle">
          <el-radio-button :label="0">0</el-radio-button>
          <el-radio-button :label="90">90</el-radio-button>
          <el-radio-button :label="180">180</el-radio-button>
          <el-radio-button :label="270">270</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="窗体宽度" prop="sizeW">
        <el-input v-model="form.sizeW"></el-input>
        <!-- <el-input v-model="form.sizeH"></el-input> -->
      </el-form-item>
      <el-form-item label="窗体高度" prop="sizeH">
        <el-input v-model="form.sizeH"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel" size="mini">取 消</el-button>
      <el-button type="danger" @click="yes" size="mini">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { dpiWidth, dpiHeight } from "@/common/js/dpi";
const remote = require("@electron/remote");
export default {
  name: "camera-dialog",
  data() {
    return {
      form: {
        cameraID: "",
        dpiWidth: 0,
        dpiHeight: 0,
        isCameraX: false,
        isCameraY: true,
        angle: 0,
        sizeW: 0,
        sizeH: 0,
      },
      cameras: [],
      dialog: false,
      DpiWidth: [],
      DpiHeight: [],
      bili: 100,
      rule: {
        cameraID: [{ required: true, message: "请选择相机", trigger: "blur" }],
        dpiWidth: [
          { required: true, message: "请选择分辨率宽", trigger: "blur" },
        ],
        dpiHeight: [
          { required: true, message: "请选择分辨率高", trigger: "blur" },
        ],
        sizeW: [{ required: true, message: "请输入窗体宽度", trigger: "blur" }],
        sizeH: [{ required: true, message: "请输入窗体高度", trigger: "blur" }],
      },
    };
  },
  props: ["defaults", "dialogVisible"],

  methods: {
    yes() {
      console.log("yes", this.form);
      this.$emit("yes", this.form);
    },
    cancel() {
      this.dialog = false;
      this.$emit("cancel");
    },
    async getCameraId() {
      let mydeviecs = await navigator.mediaDevices.enumerateDevices();
      console.log("mydeviecs\n", mydeviecs);
      let devices = mydeviecs.filter((item) => {
        return item.kind === "videoinput";
      });
      this.cameras = [];
      this.cameras = devices.map((item) => {
        return {
          label: item.label,
          value: item.deviceId,
        };
      });
      this.cameras.unshift({
        label: "默认摄像头",
        value: "",
      });
    },
    getSelection() {
      // console.log("getSelection", remote.screen.getPrimaryDisplay());
      let maxW = remote.screen.getPrimaryDisplay().workAreaSize.width;
      let maxH = remote.screen.getPrimaryDisplay().workAreaSize.height;
      console.log("maxW\n", maxW, "\nmaxH\n", maxH);
      let dpiW = dpiWidth.filter((item) => {
        return item.value <= (maxW * this.bili) / 100;
      });
      let dpiH = dpiHeight.filter((item) => {
        return item.value <= (maxH * this.bili) / 100 + 50;
      });
      this.DpiWidth = dpiW;
      this.DpiHeight = dpiH;
    },
  },
  created() {},
  mounted() {
    this.getCameraId();
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
    bili(newVal) {
      console.log("bili", newVal);
      this.getSelection();
    },
  },
};
</script>
<style lang="scss" scoped></style>
