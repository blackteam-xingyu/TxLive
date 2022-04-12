<template>
  <el-image
    class="content-photo"
    :src="options.srcUrl[0]"
    :style="cssVar"
    v-if="options.photoTypeID == 0"
    fit="contain"
  ></el-image>
  <el-carousel
    class="content-photo"
    v-else-if="options.photoTypeID == 1"
    indicator-position="none"
    arrow="never"
    :style="cssVar"
  >
    <el-carousel-item v-for="(item, index) in options.srcUrl" :key="index">
      <el-image fit="contain" :src="item"></el-image>
    </el-carousel-item>
  </el-carousel>
  <div
    class="content-photo"
    v-else-if="options.photoTypeID == 2"
    :style="cssVar"
  ></div>
</template>
<script>
const fs = require("fs");
export default {
  name: "photo",
  data() {
    return {
      dpiWidth: "",
      dpiHeight: "",
    };
  },
  props: {
    options: {
      type: Object,
    },
    zIndex: {
      type: Number,
    },
  },
  methods: {},
  created() {
    fs.readFile(`C:/ProgramData/TxLive/PCoptions.conf`, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
      const param = JSON.parse(data);
      this.dpiWidth = param.dpiWidth;
      this.dpiHeight = param.dpiHeight;
    });
  },
  mounted() {},
  computed: {
    cssVar() {
      return {
        "--sizeW": (this.options.sizeW / this.dpiWidth) * 100 + "%",
        "--sizeH": (this.options.sizeH / this.dpiHeight) * 100 + "%",
        "--zIndex": this.zIndex,
        "--backgroundColor":
          this.options.photoTypeID == 2 ? this.options.srcUrl[0] : "#ccc",
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.content-photo {
  cursor: grab;
  position: absolute;
  width: var(--sizeW);
  height: var(--sizeH);
  z-index: var(--zIndex);
  background-color: var(--backgroundColor);
  /deep/.el-carousel__container {
    width: 100%;
    height: 100%;
    pointer-events:none;
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
  /deep/.el-carousel__item {
    width: 100%;
    height: 100%;
  }
  &:hover {
    border: 1px solid #ff000080;
    cursor: move;
  }
  &:active {
    cursor: grabbing;
    border: 1px solid #ff0000;
  }
}
</style>
